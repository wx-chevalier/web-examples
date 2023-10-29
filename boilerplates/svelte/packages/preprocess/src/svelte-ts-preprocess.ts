import fs from 'fs'
import path from 'path'
import ts from 'typescript'

const LANGS = ['ts', 'typescript']

function importTransformer<T extends ts.Node>(): ts.TransformerFactory<T> {
  return context => {
    const visit: ts.Visitor = node => {
      if (ts.isImportDeclaration(node)) {
        return ts.createImportDeclaration(
          node.decorators,
          node.modifiers,
          node.importClause,
          node.moduleSpecifier
        )
      }
      return ts.visitEachChild(node, child => visit(child), context)
    }

    return node => ts.visitNode(node, visit)
  }
}

function isSvelteImport(d: ts.Diagnostic) {
  return (
    d.code === 2307 && typeof d.messageText === 'string' && /\.svelte['"]\.$/.test(d.messageText)
  )
}

function clearDiagnostics(diagnostics: ReadonlyArray<ts.Diagnostic>) {
  return diagnostics.filter(d => !isSvelteImport(d))
}

function createFormatDiagnosticsHost(cwd: string): ts.FormatDiagnosticsHost {
  return {
    getCanonicalFileName: fileName => fileName,
    getCurrentDirectory: () => cwd,
    getNewLine: () => ts.sys.newLine
  }
}

interface File {
  name: string
  content: string
}

function createProxyHost(host: ts.CompilerHost, file: File) {
  const proxy: ts.CompilerHost = {
    getSourceFile(
      filename: string,
      languageVersion: ts.ScriptTarget,
      _onError?: (message: string) => void
    ) {
      filename = ts.sys.resolvePath(filename)
      return filename === file.name
        ? ts.createSourceFile(file.name, file.content, languageVersion)
        : host.getSourceFile(filename, languageVersion, _onError)
    },

    writeFile: (_filename, _content) => {
      throw new Error('unsupported')
    },

    getCanonicalFileName(filename) {
      filename = ts.sys.resolvePath(filename)
      return filename === file.name
        ? ts.sys.useCaseSensitiveFileNames
          ? filename
          : filename.toLowerCase()
        : host.getCanonicalFileName(filename)
    },

    fileExists(filename) {
      filename = ts.sys.resolvePath(filename)
      return filename === file.name ? true : host.fileExists(filename)
    },

    readFile(filename) {
      filename = ts.sys.resolvePath(filename)
      return filename === file.name ? file.content : host.readFile(filename)
    },

    getDefaultLibFileName: host.getDefaultLibFileName.bind(host),
    getCurrentDirectory: host.getCurrentDirectory.bind(host),
    getNewLine: host.getNewLine.bind(host),
    useCaseSensitiveFileNames: host.useCaseSensitiveFileNames.bind(host),
    resolveModuleNames: host.resolveModuleNames && host.resolveModuleNames.bind(host),
    getDirectories: host.getDirectories && host.getDirectories.bind(host)
  }
  return proxy
}

interface Script {
  filename: string
  content: string
  attributes: {
    lang?: string,
    src?: string
  }
}

export const defaultCompilerOptions: ts.CompilerOptions = {
  target: ts.ScriptTarget.ESNext,
  module: ts.ModuleKind.ESNext,
  moduleResolution: ts.ModuleResolutionKind.NodeJs,
  allowNonTsExtensions: true,
  alwaysStrict: false
}

export interface Env {
  basePath: string
  formatDiagnosticHost: ts.FormatDiagnosticsHost
}

export function createEnv(basePath?: string): Env {
  basePath = basePath ? basePath : process.cwd()
  const formatDiagnosticHost = createFormatDiagnosticsHost(basePath)
  return { basePath, formatDiagnosticHost }
}

export function readConfigFile(env: Env, path?: string) {
  const configPath = path ? path : ts.findConfigFile(env.basePath, ts.sys.fileExists)
  if (!configPath) {
    throw new Error("Could not find a valid 'tsconfig.json'.")
  }

  // read config
  const result = ts.readConfigFile(configPath, ts.sys.readFile)
  if (result.error) {
    const msg = ts.formatDiagnostics([result.error], env.formatDiagnosticHost)
    throw new Error(msg)
  }

  const { config } = result
  const settings = ts.convertCompilerOptionsFromJson(config.compilerOptions, env.basePath)
  if (!settings.options) {
    const msg = ts.formatDiagnostics(settings.errors, env.formatDiagnosticHost)
    throw new Error(msg)
  }

  return settings.options
}

export interface PreprocessOptions {
  compilerOptions: ts.CompilerOptions
  env: Env
  hideErrors: boolean
}

export function createPreprocessOptions(opts?: Partial<PreprocessOptions>): PreprocessOptions {
  opts = opts ? opts : {}

  return {
    compilerOptions: opts.compilerOptions ? opts.compilerOptions : defaultCompilerOptions,
    env: opts.env ? opts.env : createEnv(),
    hideErrors: !!opts.hideErrors
  }
}

export function preprocess(opts?: Partial<PreprocessOptions>) {
  function script({ content, attributes, filename }: Script) {
    if (!attributes.lang) {
      return
    }

    const lang = attributes.lang.toLowerCase()
    if (!LANGS.includes(lang)) {
      return
    }

    if (attributes.src) {
      const dir = path.parse(filename).dir
      filename = path.join(dir, attributes.src)
      content = fs.readFileSync(filename).toString()
    }

    filename = ts.sys.resolvePath(filename)
    const options = createPreprocessOptions(opts)

    const rootFiles = [filename]
    const proxyHost = createProxyHost(ts.createCompilerHost(options.compilerOptions), {
      name: filename,
      content
    })

    let code = ''
    const writeFile: ts.WriteFileCallback = (fileName, data) => {
      // console.log(fileName)
      // console.log(data)
      if (fileName.endsWith('.js')) {
        code = data
      }
    }

    const customTransformers: ts.CustomTransformers = {
      before: [importTransformer()]
    }

    const program = ts.createProgram(rootFiles, options.compilerOptions, proxyHost)
    program.emit(undefined, writeFile, undefined, undefined, customTransformers)

    if (!options.hideErrors) {
      const diagnostics = clearDiagnostics(ts.getPreEmitDiagnostics(program))
      if (diagnostics.length) {
        const s = ts.formatDiagnosticsWithColorAndContext(
          diagnostics,
          options.env.formatDiagnosticHost
        )
        console.log(s)
      }
    }

    return { code }
  }
  return { script }
}

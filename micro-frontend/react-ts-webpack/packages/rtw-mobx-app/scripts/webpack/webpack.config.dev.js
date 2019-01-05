const devConfig = require('');

const rootPath = process.cwd();

const { library = 'wx', libraryEntry = 'index.js' } = require(path.resolve(
  rootPath,
  './package.json'
));

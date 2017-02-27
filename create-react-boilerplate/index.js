#!/usr/bin/env node
'use strict';


/**
 * Copyright (c) 2015-present, 王下邀月熊, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

var chalk = require('chalk');

var currentNodeVersion = process.versions.node;

// 判断当前 Node 版本是否过低
if (currentNodeVersion.split('.')[0] < 4) {
  console.error(
    chalk.red(
      '当前 Node 版本为 ' + currentNodeVersion + '.\n' +
      '本工具依赖于 Node 4.0 及以上版本。\n' +
      '请更新你的 Node 版本。'
    )
  );
  process.exit(1);
}


var commander = require('commander');
var fs = require('fs-extra');
var path = require('path');
var spawn = require('cross-spawn');
var semver = require('semver');
var ejs = require('ejs');

var install = require('./script/install');
var check = require('./script/check');

var projectName;

var program = commander
  .version(require('./package.json').version)
  .arguments('<project-directory>')
  .usage(chalk.green('<project-directory>') + ' [options]')
  .action(function (name) {
    projectName = name;
  })
  .option('-t, --type [type]', '选择模板类型 [pwa/redux/mobx/full]', 'pwa')
  .allowUnknownOption()
  .on('--help', function () {
    console.log('    Only ' + chalk.green('<project-directory>') + ' is required.');
    console.log();
  })
  .parse(process.argv);


// 判断是否有输入参数，否则报错
if (!process.argv.slice(2).length) {
  program.outputHelp(function (txt) {
    return chalk.red(txt)
  });
}

// 如果用户尚未输入项目名，直接报错
if (typeof projectName === 'undefined') {
  console.error('请选择项目目录名:');
  console.log('  ' + chalk.cyan(program.name()) + chalk.green(' <project-directory>'));
  console.log();
  console.log('譬如:');
  console.log('  ' + chalk.cyan(program.name()) + chalk.green(' my-react-app'));
  console.log();
  console.log('允许 ' + chalk.cyan(program.name() + ' --help') + ' 查看所有选项。');
  process.exit(1);
}

createApp(projectName, program.type);

/**
 * @function 创建应用
 * @param name
 * @param type
 */
function createApp(name, type) {

  var root = path.resolve(name);
  var appName = path.basename(root);

  //检测文件名是否可用
  check.checkAppName(appName);

  //判断文件夹是否可以覆盖
  fs.ensureDirSync(name);

  if (!check.isSafeToCreateProjectIn(root)) {
    console.log('目录 ' + chalk.green(name) + ' 包含冲突文件。');
    console.log('请使用新的目录名。');
    process.exit(1);
  }

  console.log(
    '开始创建新的 React 应用： ' + chalk.green(root) + '。'
  );
  console.log();

  // //当前目录
  var originalDirectory = process.cwd();
  process.chdir(root);


  console.log('初始化 ' + chalk.green(appName) + ' 基于 ' + chalk.cyan(type + '-boilerplate') + '...');
  console.log();

  //安装相关依赖
  install('create-react-boilerplate', originalDirectory, function () {

    var crbInNMPath = root + '/node_modules/create-react-boilerplate/';

    //复制 package.json
    var packageJson = fs.readFileSync(crbInNMPath + 'template/package.json', 'utf8');

    fs.writeFileSync(
      path.join(root, 'package.json'),
      ejs.render(packageJson, {
        appName: appName
      })
    );

    //复制 gitignore
    fs.copySync(crbInNMPath + 'template/gitignore', './.gitignore');

    //复制其他文件
    fs.copySync(crbInNMPath + 'util', './');

    //复制 dev-config
    fs.copySync(crbInNMPath + 'dev-config', 'dev-config');

    //复制 storybook
    fs.copySync(crbInNMPath + 'storybook', '.storybook');

    //复制源代码
    if (type === 'pwa') {
      fs.copySync(crbInNMPath + 'template/pwa', 'src');
    }

    //执行依赖安装

    var command = 'npm/yarn';

    var cdpath;
    if (originalDirectory &&
      path.join(originalDirectory, appName) === root) {
      cdpath = appName;
    } else {
      cdpath = root;
    }

    console.log();
    console.log('创建成功！ ' + appName + ' 位于 ' + root);
    console.log('进入该目录内，支持以下几个命令:');
    console.log();
    console.log(chalk.cyan('  ' + command + ' start'));
    console.log('    进入开发模式，启动热加载开发服务器。');
    console.log();
    console.log(chalk.cyan('  ' + command + ' run build'));
    console.log('    进入单页离线打包模式，构建生产环境发布包。');
    console.log();
    console.log(chalk.cyan('  ' + command + ' run build:ssr'));
    console.log('    进入服务端渲染打包模式，构建支持服务端渲染的客户端生产环境发布包。');
    console.log();
    console.log(chalk.cyan('  ' + command + ' run build:server'));
    console.log('    进入服务端渲染打包模式，构建支持服务端渲染的渲染服务器。');
    console.log();
    console.log(chalk.cyan('  ' + command + ' test'));
    console.log('    进入测试模式。');
    console.log();
    console.log('对于新手，建议执行以下命令（建议首先安装 yarn）：');
    console.log();
    console.log(chalk.cyan('  cd'), cdpath);
    console.log(chalk.cyan('  sh ./install.sh (Linux 环境中) / ./install.bat (Windows 环境中) (此命令用于安装全局依赖，若非首次创建，请手动执行 yarn install 即可)'));
    console.log('  ' + chalk.cyan(command + ' start'));
    console.log();
    console.log('王下邀月熊！更多信息请往 wxyyxc1992@github');
  });
}

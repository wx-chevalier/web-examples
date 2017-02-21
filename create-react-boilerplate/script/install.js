var spawn = require('cross-spawn');
var chalk = require('chalk');
const fs = require('fs-extra');

var check = require('./check');

/**
 * @function 利用命令安装
 * @param packageToInstall
 * @param verbose
 * @param callback
 */
function installPackage(packageToInstall, verbose, callback) {
  var command;
  var args;
  if (check.shouldUseYarn()) {
    command = 'yarnpkg';
    args = ['add', '--dev', '--exact', packageToInstall];
  } else {
    command = 'npm';
    args = ['install', '--save-dev', '--save-exact', packageToInstall];
  }

  if (verbose) {
    args.push('--verbose');
  }

  var child = spawn(command, args, {stdio: 'inherit'});
  child.on('close', function (code) {

    callback(code, command, args);
  });
}

/**
 * @function 执行安装并且容错
 * @param packageToInstall
 * @param originalDirectory
 * @param callback
 */
function install(packageToInstall, originalDirectory, callback) {

  installPackage(packageToInstall, false, function (code, command, args) {

    if (code !== 0) {
      console.error(chalk.cyan(command + ' ' + args.join(' ')) + ' failed');
      process.exit(1);
    }

    //如果父目录下存在 node_modules 且子目录没有，则直接移动过去
    if (
      !fs.existsSync(process.cwd() + '/node_modules') &&
      fs.existsSync(originalDirectory + '/node_modules')
    ) {

      fs.copy(originalDirectory + '/node_modules', process.cwd() + '/node_modules', function (err) {
        if (err) {
          console.error(err);
          process.exit(1);
        }

        callback();


      });

    } else {
      callback();
    }
  });

}

module.exports = install;
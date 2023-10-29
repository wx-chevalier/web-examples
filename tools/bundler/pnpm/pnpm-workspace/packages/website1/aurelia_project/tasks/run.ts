import { NPM } from 'aurelia-cli';
import * as kill from 'tree-kill';

const npm =  new NPM();

function run() {
  console.log('`au run` is an alias of the `npm start`, you may use either of those; see README for more details.');
  const args = process.argv.slice(3);
  return npm.run('start', ['--', ... cleanArgs(args)]);
}

// Cleanup --env prod to --env.production
// for backwards compatibility
function cleanArgs(args) {
  const cleaned = [];
  for (let i = 0, ii = args.length; i < ii; i++) {
    if (args[i] === '--env' && i < ii - 1) {
      const env = args[++i].toLowerCase();
      if (env.startsWith('prod')) {
        cleaned.push('--env.production');
      } else if (env.startsWith('test')) {
        cleaned.push('--tests');
      }
    } else {
      cleaned.push(args[i]);
    }
  }
  return cleaned;
}

const shutdownAppServer = () => {
  if (npm && npm.proc) {
    kill(npm.proc.pid);
  }
};

export { run as default, shutdownAppServer };

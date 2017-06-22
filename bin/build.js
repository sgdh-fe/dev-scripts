const { resolve } = require('path')

const { fork } = require('child_process')

const gulpcli = resolve(
  __dirname,
  '..',
  'node_modules',
  'gulp-cli',
  'bin',
  'gulp'
)
const gulpfile = resolve(__dirname, '..', 'config', 'gulpfile.js')

module.exports = function() {
  fork(gulpcli, ['--gulpfile', gulpfile, '--cwd', process.cwd(), '--color'], {
    env: {
      NODE_ENV: 'development'
    }
  })
}

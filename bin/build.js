const { join } = require('path')

const { fork } = require('child_process')

const gulpcli = join(require.resolve('gulp'), '../..', 'gulp', 'bin', 'gulp')

const gulpfile = join(__dirname, '..', 'config', 'gulpfile.js')

module.exports = function() {
  fork(gulpcli, ['--gulpfile', gulpfile, '--cwd', process.cwd(), '--color'], {
    env: {
      NODE_ENV: 'development'
    }
  })
}

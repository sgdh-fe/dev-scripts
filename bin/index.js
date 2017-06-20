#!/usr/bin/env node

let argv = process.argv.slice(2)
let cmd = argv[0]

if (cmd === 'server') {
  require('./server')(Number(argv[1]) || 1337)
} else if (cmd === 'build') {
  require('./build')()
} else {
  console.log('help:')
  console.log('   dev-scripts server')
  console.log('   dev-scripts build')
}

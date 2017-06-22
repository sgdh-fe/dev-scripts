#!/usr/bin/env node

let argv = process.argv.slice(2)
let cmd = argv[0]

if (cmd === 'server') {
  require('./server')(Number(argv[1]) || 1337)
} else if (cmd === 'build') {
  require('./build')()
} else {
  console.log('\nhelp:\n')
  console.log('   dev-scripts server\n')
  console.log('   dev-scripts build\n')
}

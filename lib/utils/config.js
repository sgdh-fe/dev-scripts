let config = require('../../config/app.config')
let localConfig = {}
try {
  localConfig = require(`${process.cwd()}/app.config`)
} catch (error) {}

module.exports = Object.assign(config, localConfig)

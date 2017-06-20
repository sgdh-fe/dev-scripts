const middleware = require('koa-static')
const { static } = require('../utils/config')

module.exports = function(app) {
  app.use(middleware(static))
}

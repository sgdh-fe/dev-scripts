const Router = require('koa-router')

module.exports = function(app) {
  const router = new Router()
  require('../../config/router')(router)
  require('../../config/proxy')(router)
  try {
    require(`${process.cwd()}/router`)(router)
  } catch (error) {}
  app.use(router.routes()).use(router.allowedMethods())
}

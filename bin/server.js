const Koa = require('koa')
const app = new Koa()

module.exports = function(port) {
  require('../lib/middleware/webpack')(app)
  require('../lib/middleware/sass')(app)
  require('../lib/middleware/views')(app)
  require('../lib/middleware/router')(app)
  require('../lib/middleware/static')(app)

  app.listen(port, () => {
    console.log(`http://127.0.0.1:${port}`)
  })
}

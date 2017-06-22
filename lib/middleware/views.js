const Twig = require('twig')
const { join } = require('path')
const { views } = require('../utils/config')
Twig.cache(false)
try {
  require(`${process.cwd()}/config/twig`)(Twig)
} catch (error) {}

module.exports = function(app) {
  app.context.render = function(file, data = {}) {
    let tmpl = Twig.twig({
      cache: false,
      base: views.path,
      path: join(views.path, `${file}.html`),
      async: false
    })
    return new Promise((resolve, reject) => resolve(tmpl.render(data)))
  }
}

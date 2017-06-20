const Twig = require('twig')
const { join } = require('path')
const { views } = require('../utils/config')

module.exports = function(app) {
  Twig.cache(false)
  Twig.extendFilter('cdn', value => {
    return value
  })
  Twig.extendFilter('ver', value => {
    return value
  })
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

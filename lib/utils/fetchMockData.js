const { join, resolve } = require('path')

const views = require('./config').views

module.exports = function(name, query) {
  let data = {}
  try {
    data = require(resolve(join(views.data, name)))(query)
  } catch (error) {}
  return new Promise((resolve, reject) => resolve(data))
}

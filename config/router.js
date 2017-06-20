const { join } = require('path')

const { promisify } = require('util')

const fs = require('fs')

const ejs = require('ejs')

const views = require('../lib/utils/config').views

const fetch = require('../lib/utils/fetchMockData')

module.exports = function(router) {
  // home page
  router.get('/', async (ctx, next) => {
    let data = await promisify(fs.readdir)(views.path)
    ctx.body = await promisify(ejs.renderFile)(
      join(__dirname, '../web/index.ejs'),
      {
        files: data
      }
    )
  })

  router.get('/:file.html', async (ctx, next) => {
    let name = ctx.params.file
    let data = await fetch(name, ctx.query)
    let content = await ctx.render(name, data)
    ctx.body = content
  })
}

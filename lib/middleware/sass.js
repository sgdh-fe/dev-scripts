const sass = require('node-sass')
const fse = require('fs-extra')

const { promisify } = require('util')

const { parse, join } = require('path')

let { src, dest, includePaths, sourceMap } = require('../utils/config').sass

let sassRender = promisify(sass.render)

module.exports = function(app) {
  app.use(async (ctx, next) => {
    let path = ctx.path
    if (!/\.css$/.test(path)) {
      return await next()
    }
    let name = parse(path).name
    let file = join(src, `${name}.scss`)
    let outFile = join(dest, `${name}.css`)
    let result = await sassRender({
      file,
      outFile,
      sourceMap,
      includePaths
    })

    let all = [fse.outputFile(outFile, result.css)]
    if (sourceMap) {
      all.push(fse.outputFile(`${outFile}.map`, result.map))
    }
    await Promise.all(all)
    await next()
  })
}

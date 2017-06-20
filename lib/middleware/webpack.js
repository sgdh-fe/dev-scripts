const webpack = require('webpack')
const webpackConfig = require('../../config/webpack.config')
const compiler = webpack(webpackConfig)
const dev = require('webpack-dev-middleware')

module.exports = function(app) {
  const middleware = dev(compiler, {
    publicPath: webpackConfig.output.publicPath,
    // noInfo: true,
    // quiet: true,
    stats: {
      colors: true
    }
  })

  app.use(async (ctx, next) => {
    await middleware(
      ctx.req,
      {
        end(content) {
          ctx.body = content
        },
        setHeader() {
          // ctx.set.apply(ctx, arguments)
        }
      },
      next
    )
  })
}

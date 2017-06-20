const fetch = require('node-fetch')
const proxysList = require('../lib/utils/config').proxy
const https = require('https')
const { stringify } = require('querystring')

module.exports = function(router) {
  Object.keys(proxysList).forEach(key => {
    router.get(key, async (ctx, next) => {
      let query = stringify(ctx.query)
      let url = proxysList[key] + (query && '?') + query
      let params = ctx.params
      let options = {}
      if (url.indexOf('https://') > -1) {
        options = {
          agent: new https.Agent({
            rejectUnauthorized: false
          })
        }
      }
      for (let key in params) {
        let reg = new RegExp('{' + key + '}')
        url = url.replace(reg, params[key])
      }
      console.log(`[proxy] ${ctx.url} => ${url}`)
      let data = await fetch(url, options).then(res => res.text())
      ctx.body = data
    })
  })
}

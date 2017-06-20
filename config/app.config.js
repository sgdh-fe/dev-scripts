module.exports = {
  static: './static/', // 静态文件目录
  sass: {
    // node-sass 配置
    src: './static/sass',
    dest: './static/css',
    includePaths: [],
    sourceMap: true
  },
  views: {
    // twig 模版引擎配置
    data: './data',
    path: './views/'
  },
  gulp: {
    // gulp 配置
    dest: './build',
    sprite: {
      // css sprite 配置
      filename: 'sprite.png',
      source: './static/img',
      output: './build/img',
      revision: true,
      replaceUrl: url => '../img/sprite.png',
      spritesmithOptions: {
        padding: 3
      },
      filter: url => !!~url.indexOf('/src/')
    }
  },
  proxy: {}
}

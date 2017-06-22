# dev-scripts

## 环境准备

> nodejs >= 8.0.0

## 功能

- 支持 twig 模版引擎 ( 与 php twig [兼容情况](https://github.com/twigjs/twig.js/wiki/Implementation-Notes) )
  - config/twig.js 里可配置相应 filter ( php 端也要对应实现 )
- 支持 sass
  - 开发环境生成 sourceMap
- 支持 webpack
  - 集成 babel 支持 es6 语法
  - 集成 jQuery 1.12.4 与 js-cookie 为 common.js 并且全局 ( window ) 可访问
- 支持 css sprites
  - 开发环境需要单独引用图片
  - 在构建的时候可以自动合并图片
  - 支持移动端 rem 单位转换 ( dpr 转换 )
  - 自动给图片添加版本号 ( 通过图片的 md5 值计算 )

- 服务器端代理请求
  - config/app.config.js 里 porxy 选项配置
  - 可直接配置线上请求地址来联调

- 自定义 router
  - config/router.js 里配置 一般用在模拟 ajax 请求接口

- 基于 gulp 构建
  - 构建出的 css js img 默认在  build 目录下

## 安装
```sh
$ npm install -g dev-scripts
# or
$ npm install dev-scripts -D
```

## 使用

```sh
$ dev-scripts server # http://127.0.0.1:1337
$ dev-scripts build
```

## 支持的目录结构

```html
.
├── README.md
├── config <!-- 配置文件 -->
│   ├── app.config.js
│   ├── router.js
│   ├── twig.js
│   └── webpack.config.js
├── data  <!-- 模版数据文件 -->
│   └── index.js
├── package.json
├── static <!-- 静态文件 -->
│   ├── img
│   │   └── src
│   ├── js
│   │   └── index.js
│   └── sass
│       ├── index.scss
│       └── lib
│           ├── public.scss
│           └── reset.scss
├── views <!-- 模版文件 -->
│   ├── common
│   │   └── layout.html
│   └── index.html
└── yarn.lock
```

## 快速创建项目
  - [creates](https://github.com/cjg125/creates)


## 更新记录

- v1.1.2 (2017-06-22)
  - 修复局部安装 build 的问题

- v1.1.1 (2017-06-22)
  - 修复 build 在 windows 下的问题

- v1.1.0 (2017-06-22)
  - 添加对 twig 的配置文件支持
  - 修改 [creates](https://github.com/cjg125/creates) 的配置文件位置
  - 升级依赖包

- v1.0.2 (2017-06-20)
  - 修复局部安装找不到 babel-preset-env 的问题
const { join } = require('path')
const gulp = require('gulp')
const del = require('del')
const webpack = require('webpack-stream')
const webpackConfig = require('./webpack.config')
const postcss = require('gulp-postcss')
const sass = require('gulp-sass')
const sprite = require('postcss-sprite')
const config = require('../lib/utils/config')
const { gulp: gulpConfig } = config

gulp.task('clean', () => {
  return del([gulpConfig.dest])
})

gulp.task('js', ['clean'], () => {
  return gulp
    .src(webpackConfig.entry.index)
    .pipe(webpack(webpackConfig, require('webpack') /* 2.x */))
    .pipe(gulp.dest(join(gulpConfig.dest, 'js')))
})

gulp.task('sass', ['clean'], () => {
  return gulp
    .src(join(config.sass.src, '*.scss'))
    .pipe(
      sass({
        outputStyle: 'compressed'
      }).on('error', sass.logError)
    )
    .pipe(postcss([sprite(gulpConfig.sprite)]))
    .pipe(gulp.dest(join(gulpConfig.dest, 'css')))
})

gulp.task('img', ['clean'], () => {
  let src = gulpConfig.sprite.source
  return gulp
    .src([`${src}/*.*`, `${src}/*/*`, `!${src}/src/*`])
    .pipe(gulp.dest(join(gulpConfig.dest, 'img')))
})

gulp.task('default', ['img', 'js', 'sass'])

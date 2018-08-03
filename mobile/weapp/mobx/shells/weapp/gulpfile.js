var gulp = require('gulp'),
  less = require('gulp-less'),
  debug = require('gulp-debug'),
  sourcemaps = require('gulp-sourcemaps')

var path = require('path')
var alias = require('../alias')
var cssPath = path.resolve(alias.src, 'css')
var distPath = path.resolve(__dirname, 'src/lib/css')
var souremapsPath = './src/lib/css/souremaps'

gulp.task('watch', ['build'], function () {
  gulp.watch(cssPath + '/*.css', function (file) {
    gulp.src(file.path)
        .pipe(sourcemaps.init())
        .pipe(debug({ title: '编译:' }))
        .pipe(less())
        .pipe(sourcemaps.write(souremapsPath))
        .pipe(gulp.dest(distPath))
  })
})

gulp.task('build', function () {
  gulp.src(cssPath + '/*.css')
        .pipe(sourcemaps.init())
        .pipe(debug({ title: '编译:' }))
        .pipe(less())
        .pipe(sourcemaps.write(souremapsPath))
        .pipe(gulp.dest(distPath))
})

gulp.task('default', ['watch'])

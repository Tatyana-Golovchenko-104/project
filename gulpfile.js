const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const del = require('del');
const webpackStream = require('webpack-stream');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');

const browserSync = require('browser-sync').create();

const paths = {
  root: './build',
  templates: {
    pages: './src/*.html',
    src: './src/*.html',
    dest: './build'
  },
  webpack: {
    stylesSrc: './src/scss/**/*.scss',
    jsSrc: './src/js/*.js',
    dest: './build'
  },
  fonts: {
    src: './src/fonts/*',
    dest: './build/fonts'
  },
  images: {
    src: './src/images/*',
    dest: './build/images'
  }
};

const watch = () => {
  gulp.watch(paths.images.src, imagesMin);
  gulp.watch(paths.templates.src, templates);
  gulp.watch(paths.webpack.stylesSrc, webpackTasks);
  gulp.watch(paths.webpack.jsSrc, webpackTasks);
};

const server = () => {
  browserSync.init({
    server: paths.root
  });
  browserSync.watch(paths.root + '/**/*.*', browserSync.reload);
};

const cloneFonts = () => gulp.src(paths.fonts.src).pipe(gulp.dest(paths.fonts.dest));

const clean = () => del(paths.root);

const templates = () => gulp.src(paths.templates.pages).pipe(gulp.dest(paths.root));

const imagesMin = () => (
  gulp.src(paths.images.src)
    .pipe(imagemin())
    .pipe(gulp.dest(paths.images.dest))
);

// webpack
const webpackTasks = () => (
  gulp.src('./src')
    .pipe(webpackStream(webpackConfig), webpack)
    .pipe(gulp.dest(paths.webpack.dest))
);

const build = gulp.series(clean, gulp.parallel( webpackTasks, templates, imagesMin, cloneFonts));
exports.dev = gulp.series(clean, build, gulp.parallel(watch, server));
exports.build = build;

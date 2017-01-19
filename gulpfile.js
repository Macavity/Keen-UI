'use strict';

const gulp = require('gulp');
const tasks = require('./build/tasks');
const browserify = require('browserify');
const vinylSourceStream = require('vinyl-source-stream');
const watchify          = require('watchify');
const babelify = require("babelify");
const vueify = require('vueify');
const plugins           = require('gulp-load-plugins')();

// Register the tasks with gulp
tasks.registerAll(gulp);

gulp.task('dist', function () {
    let entry = 'src/index.js';
    let fileName = 'collage-designer.js';


    var bundler = browserify({
        entries: './src/index.js',
        debug: true,
        extensions: ['.js', '.vue'],
    });

    bundler.transform(babelify);
    bundler.transform(vueify);

    return bundler.bundle()
        .on('error', plugins.util.log.bind(plugins.util, 'Browserify Error'))
        .pipe(vinylSourceStream(fileName))
        .pipe(gulp.dest('dist'));
});

// The default task
gulp.task('default', ['dev']);

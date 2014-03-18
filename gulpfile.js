var gulp = require('gulp');
var clean = require('gulp-clean');
var coveralls = require('gulp-coveralls');
var exec = require('gulp-exec');
var jshint = require('gulp-jshint');
var minifyCSS = require('gulp-minify-css');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

var sources = ['messi.js', 'test/*.js'];

gulp.task('clean', function() {
    gulp.src([ './messi.min.js', './messi.min.js.map', './messi.min.css' ])
        .pipe(clean());
});

gulp.task('lint', function() {
    gulp
        .src(sources)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('oldertest', function() {
  gulp
    .src('test/all.js')
    .pipe(exec('node_modules/.bin/mocha-phantomjs --view 640x480 /test/index.html'));
});

gulp.task('oldtest', function() {
    // Be sure to return the stream
    return gulp
        .src([ 'messi.js', 'test/all.js' ])
        .pipe(karma({ configFile: 'karma.conf.js' }))
        .on('error', function(err) {
            // Make sure failed tests cause gulp to exit non-zero
            throw err;
        });
});

gulp.task('test', function() {
    karma.start(
        {
            browsers: ['PhantomWithConfig'],
            customLaunchers: {
                PhantomWithConfig: {
                    base: 'PhantomJS',
                    options: {
                        page: {
                            viewportSize: { width: 640, height: 480 }
                        }
                    }
                }
            },
            files: [
                'http://cdnjs.cloudflare.com/ajax/lib/mocha/1.13.0/mocha.min.js',
                'http://chaijs.com/chai.js',
                'http://code.jquery.com/jquery.min.js',
                'messi.js',
                'test/**/*.js'
            ],
            frameworks: ['mocha'],
            preprocessors: {'messi.js': ['coverage']},
            reporters: ['progress', 'coverage'],
            coverageReporter: {
              type : 'lcov',
              dir : 'coverage/'
            },
            singleRun: true
        },
        function(exitCode) {
            gutil.log('Karma has exited with ' + exitCode);
            process.exit(exitCode);
        });
});

gulp.task('coveralls', function() {
    gulp.src('coverage/**/lcov.info')
    .pipe(coveralls());
});

gulp.task('compress', ['clean'], function() {
    gulp
        .src('messi.js')
        .pipe(rename('messi.min.js'))
        .pipe(uglify({outSourceMap: true}))
        .pipe(gulp.dest('./'));

    gulp
        .src('messi.css')
        .pipe(rename('messi.min.css'))
        .pipe(minifyCSS())
        .pipe(gulp.dest('./'));
});

gulp.task('codecoverage', function() {
    gulp.src('test/coverage/**/lcov.info')
        .pipe(coveralls());
});

gulp.task('watch', function() {
    gulp
        .src(sources)
        .pipe(watch(function(files) {
            return files.pipe(jshint())
                .pipe(gulp.dest('.'));
        }));
});

gulp.task('default', ['lint', 'compress', 'test', 'codecoverage']);

gulp.task('travis-test', ['lint', 'compress', 'test', 'coveralls']);


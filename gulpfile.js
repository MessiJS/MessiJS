const pkg = require('./package.json');

const gulp        = require('gulp');
const concat      = require('gulp-concat');
const coveralls   = require('gulp-coveralls');
const cssnano     = require('gulp-cssnano');
const del         = require('del');
const eventStream = require('event-stream');
const insert      = require('gulp-insert');
const jshint      = require('gulp-jshint');
const Karma       = require('karma').Server;
const notify      = require('gulp-notify');
const rename      = require('gulp-rename');
const sourcemaps  = require('gulp-sourcemaps');
const uglify      = require('gulp-uglify');
const zip         = require('gulp-zip');
const gutil       = require('gulp-util');

const sources = ['src/*.js', 'test/*Spec.js'];

const banner = [
    '/**!',
    ` * ${pkg.name} - ${pkg.description}`,
    ` * @version ${pkg.version}`,
    ` * @link ${pkg.homepage}`,
    ` * @license ${pkg.license}`,
    ' * @copyright Copyright 2012-13 Marcos Esperón',
    ' * @copyright Copyright 2014-17 Kevin Gustavson',
    ' */',
    ''].join('\n');

gulp.task('clean', done => del([ 'dist', 'coverage' ], done));

gulp.task('lint', () => gulp.src(sources)
    .pipe(jshint())
    .pipe(jshint.reporter('default')));

gulp.task('create-dist', ['clean'], () => {
    gutil.File({ path: 'dist/' });
    return gulp.src(['README.md'])
        .pipe(gulp.dest('dist'));
});

gulp.task('combine', ['create-dist'], () => eventStream.merge(
    gulp.src(['src/*.css'])
        .pipe(concat('messi.css'))
        .pipe(gulp.dest('dist')),
    gulp.src(['src/*.js'])
        .pipe(concat('messi.js'))
        .pipe(gulp.dest('dist'))
));

gulp.task('compress', ['create-dist'], () => eventStream.merge(
    gulp.src(['src/*.js'])
        .pipe(sourcemaps.init())
            .pipe(concat('messi.min.js'))
            .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist')),

    gulp.src(['src/*.css'])
        //.pipe(sourcemaps.init())
            .pipe(concat('messi.min.css'))
            .pipe(cssnano())
        //.pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist'))
));

gulp.task('add-banner', ['combine', 'compress'], () => eventStream.merge(
    gulp.src(['dist/messi.js', 'dist/messi*.css'])
        .pipe(insert.prepend(banner))
        .pipe(gulp.dest('dist')),
    gulp.src('dist/messi.min.js')
        .pipe(insert.wrap(banner, '\n//# sourceMappingURL=messi.min.js.map'))
        .pipe(gulp.dest('dist'))
));

gulp.task('test', ['lint'], done => {
    new Karma({
        configFile: `${__dirname}/karma.conf.js`,
        singleRun: true
    }, exitCode => {
        done();
        process.exit(exitCode);
    }).start();
});

gulp.task('codecoverage', ['test'], done => gulp.src('coverage/**/lcov.info')
    .pipe(coveralls(done)));

gulp.task('zip', ['add-banner'], () => gulp.src('dist/*')
    .pipe(zip('MessiJS.zip'))
    .pipe(gulp.dest('dist')));

gulp.task('notify:test', ['test'], () => gulp.src('./gulpfile.js')
    .pipe(notify({ message: 'All done, master!' })));

gulp.task('notify:zip', ['zip'], () => gulp.src('./gulpfile.js')
    .pipe(notify({ message: 'Zip file has been created.' })));

gulp.task('watch', () => gulp.watch(sources, ['default']));
gulp.task('default', ['zip', 'test']);
gulp.task('travis-test', ['codecoverage']);

module.exports = gulp;

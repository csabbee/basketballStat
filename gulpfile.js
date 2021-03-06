var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var templateCache = require('gulp-angular-templatecache');
var minifyHtml = require('gulp-minify-html');
var concant = require('gulp-concat');
var ngAnnotate = require('gulp-ng-annotate');
var uglify = require('gulp-uglify');
var babel = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');
var es = require('event-stream');

var modularize = require('./gulp-build/angular-modularize.js');

var paths = {
    sass: ['scss/**/*.scss', 'app/**/*.scss'],
    html: ['app/**/*.html'],
    js: ['app/**/*.js'],
    jsDest: 'www/js',
    cssDest: 'www/css'
};

gulp.task('default', ['sass', 'htmlcache', 'javascript', 'watch']);

gulp.task('sass', function(done) {
    gulp.src('./scss/ionic.app.scss')
        .pipe(sass({
            errLogToConsole: true
        }).on('error', sass.logError))
        .pipe(gulp.dest('./www/css/'))
        .pipe(minifyCss({
            keepSpecialComments: 0
        }))
        .pipe(rename({ extname: '.min.css' }))
        .pipe(gulp.dest(paths.cssDest))
        .on('end', done);
});

gulp.task('htmlcache', function() {
    return gulp.src(paths.html)
        .pipe(minifyHtml({
            empty: true,
            spare: true,
            quotes: true
        }))
        .pipe(templateCache('htmlcache.js', {
            standalone: true,
            module: 'htmlTemplates'
        }))
        .pipe(gulp.dest(paths.jsDest));
});

gulp.task('javascript', function() {
    return gulp.src(paths.js)
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015']
        }))
        .on('error', function(err) {
            console.log(err);
            this.emit('end');
        })
        .pipe(ngAnnotate({
            gulpWarnings: false
        }))
        .pipe(modularize.injectModule(es))
        .pipe(concant('basketballStat.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('.', { sourceRoot: 'app'}))
        .pipe(gulp.dest(paths.jsDest));
});

gulp.task('watch', function() {
    gulp.watch(paths.sass, ['sass']);
    gulp.watch(paths.js, ['javascript']);
    gulp.watch(paths.html, ['htmlcache']);
});

gulp.task('install', ['git-check'], function() {
    return bower.commands.install()
        .on('log', function(data) {
            gutil.log('bower', gutil.colors.cyan(data.id), data.message);
        });
});

gulp.task('git-check', function(done) {
    if (!sh.which('git')) {
        console.log(
            '  ' + gutil.colors.red('Git is not installed.'),
            '\n  Git, the version control system, is required to download Ionic.',
            '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
            '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
        );
        process.exit(1);
    }
    done();
});

// Initialize modules
// Importing specific gulp API functions lets us write them below as series() instead of gulp.series()
const {
  src,
  dest,
  watch,
  series,
  parallel
} = require('gulp');
// Importing all the Gulp-related packages we want to use
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
var replace = require('gulp-replace');
const fileinclude = require('gulp-file-include');
const browsersync = require("browser-sync").create();

// File paths
const files = {
  scssPath: 'build/scss/*.scss',
  jsPath: 'build/js/**/*.js',
}
function browserSync(done) {
  browsersync.init({
    server: {
      baseDir: "./"
    }
  });
  done();
}

// BrowserSync Reload
function browserSyncReload(done) {
  browsersync.reload();
  done();
}

// Sass task: compiles the style.scss file into style.css
function scssTask() {
  return src(files.scssPath)
      .pipe(sourcemaps.init()) // initialize sourcemaps first
      .pipe(sass()) // compile SCSS to CSS
      .pipe(postcss([autoprefixer(), cssnano()])) // PostCSS plugins
      .pipe(concat('app.css'))
      .pipe(sourcemaps.write('.')) // write sourcemaps file in current directory
      .pipe(dest('dist')) // put final CSS in dist folder
      .pipe(browsersync.stream())
}

// JS task: concatenates and uglifies JS files to script.js
function jsTask() {
    return src([
          'build/js/jquery-3.3.1.js',
          'plugins/select2/select2.full.min.js',
          'build/js/general.js',
        ])
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(dest('dist'))
        .pipe(browsersync.stream())
}
// Watch task: watch SCSS and JS files for changes
// If any change, run scss and js tasks simultaneously
function watchTask() {
  watch([files.scssPath,files.jsPath], {
          interval: 1000,
          usePolling: true
      }, //Makes docker work
      series(
          parallel(scssTask, jsTask),
          browserSyncReload
          // cacheBustTask
      )
  );
}

// Export the default Gulp task so it can be run
// Runs the scss and js tasks simultaneously
// then runs cacheBust, then watch task
exports.default = series(
  parallel(scssTask, jsTask),
  browserSync,
  watchTask
);
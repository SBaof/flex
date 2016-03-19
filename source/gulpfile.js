var gulp = require('gulp');
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var wrap = require('gulp-wrap');
var browserSync = require('browser-sync');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');

function handleError(err) {
  console.log(err.toString());
  this.emit('end');
}

gulp.task('sync', ['build', 'sass', 'copy'], function() {
  browserSync({
    server: {
      baseDir: '..'
    }
  });
});

gulp.task('imagemin', function() {
  gulp.src('assets/*')
      .pipe(imagemin({
        progressive: true,
        svgPlugins: [{removeViewBox: false}],
        use: [pngquant()]
      }))
      .pipe(gulp.dest('assets'));
});

gulp.task('build', function() {
  gulp.src('pages/*.html')
      .pipe(wrap({src: 'layout/default.html'}))
      .pipe(gulp.dest('..'));
});

gulp.task('rebuild', ['build'], function() {
  browserSync.reload();
});

gulp.task('sass', function() {
  gulp.src('styles/main.scss')
      .pipe(sass()).on('error', handleError)
      .pipe(prefix())
      .pipe(gulp.dest('../styles'))
      .pipe(browserSync.reload({stream: true}));
});

gulp.task('copy', function() {
  return gulp.src(['js/main.js', 'assets/*'], {base: '.'})
      .pipe(gulp.dest('..'));
});

gulp.task('watch', function() {
  gulp.watch(['**/*.html'], ['rebuild']);
  gulp.watch(['styles/*.scss'], ['sass']);
  gulp.watch(['assets/*'], ['imagemin']);
  gulp.watch(['js/main.js', 'assets/*'], ['copy']);
});

gulp.task('default', ['sync', 'watch']);

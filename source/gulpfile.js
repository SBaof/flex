var gulp = require('gulp');
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');

gulp.task('sass', function() {
  gulp.src('styles/main.scss')
      .pipe(sass())
      .pipe(prefix())
      .pipe(gulp.dest('../styles'));
});

gulp.task('copy', function() {
  gulp.src('index.html')
      .pipe(gulp.dest('..'));
})

gulp.task('watch', function() {
  gulp.watch(['*.html'], ['copy']);
  gulp.watch(['styles/*.scss'], ['sass']);
});

gulp.task('default', ['sass', 'copy', 'watch']);

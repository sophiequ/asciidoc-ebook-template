var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

gulp.task('serve', function() {
  browserSync.init({
    server: {
      baseDir: "./",
      index: "book.html"
    }
  });

  gulp.watch("*.html").on("change", reload);
});

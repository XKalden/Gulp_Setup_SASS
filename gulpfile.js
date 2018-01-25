const gulp            = require('gulp'),
      uglify          = require('gulp-uglify'),
      rename          = require('gulp-rename'),
      browserSync     = require('browser-sync').create(),
      eslint          = require('gulp-eslint'),
      sass            = require('gulp-sass'),
      autoprefixer    = require('gulp-autoprefixer'),
      cssnano         = require('gulp-cssnano'),
      prettyError     = require('gulp-prettyerror');


gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch("./*.html").on('change', browserSync.reload);
});

gulp.task('sass', function(){
   gulp.src('./assets/src/scss/*.scss') 
      .pipe(prettyError()) // pretty css
      .pipe(sass())
      .pipe(autoprefixer({
         browsers: ['last 2 versions']
      }))
      .pipe(cssnano())
      .pipe(rename('style.min.css'))
      .pipe(gulp.dest('./assets/src/css/'));
});
    
gulp.task('scripts', function(){
    gulp.src('./assets/src/js/*.js')
      .pipe(eslint())
      .pipe(eslint.format())
      .pipe(uglify())
      .pipe(rename({ extname: '.min.js' }))
      .pipe(gulp.dest('./dest/assets/src/js'))
});
  
// watch the js Folder and RUN SCRIPTS
gulp.task('watch', function() {

    gulp.watch('./assets/src/js/*.js', ['scripts', 'reload']);
    gulp.watch(['./assets/src/scss/*.scss'],['sass', 'reload']);
 });

 gulp.task('reload', function(){
    browserSync.reload();
})


// Modify our default task method by passing an array of task names
gulp.task('default', [ 'watch','browser-sync']);
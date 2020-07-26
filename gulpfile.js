let gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    del = require('del'),
    autoprefixer = require('gulp-autoprefixer'),
    rename = require('gulp-rename');

gulp.task('scss', function(){
    return gulp.src('app/scss/**/*.scss')
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(autoprefixer({
            cascade: false
        }))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('libs-css', function () {
     return gulp.src([
        'node_modules/normalize.css/normalize.css',
        'node_modules/slick-carousel/slick/slick.css',
        'node_modules/magnific-popup/dist/magnific-popup.css'
    ])
        .pipe(concat('_libs.scss'))
        .pipe(gulp.dest('app/scss'))
        .pipe(browserSync.reload({stream: true}))
})

gulp.task('html', function () {
    return gulp.src('app/*.html')
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('script', function(){
    return gulp.src('app/js/*.js')
    .pipe(browserSync.reload({stream: true}))
});
  
gulp.task('js', function(){
    return gulp.src([
      'node_modules/slick-carousel/slick/slick.js',
      'node_modules/magnific-popup/dist/jquery.magnific-popup.js'
    ])
      .pipe(concat('libs.min.js'))
      .pipe(uglify())
      .pipe(gulp.dest('app/js'))
      .pipe(browserSync.reload({stream: true}))
});

gulp.task('clean', async function(){
    del.sync('dist')
});
 
gulp.task('export',  function() {
    var exportHtml = gulp.src('app/**/*html')
        .pipe(gulp.dest('dist/'))
    
    var exportCss = gulp.src('app/css/**/*css')
        .pipe(gulp.dest('dist/css'))
    
    var exportJs = gulp.src('app/js/**/*js')
        .pipe(gulp.dest('dist/js'))
    
    var exportFonts = gulp.src('app/img/**/*.*')
    .pipe(gulp.dest('dist/img'))
})
  
// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "app/"
        }
    });
});

gulp.task('build', gulp.series('clean','export'))

gulp.task('watch', function () {
    gulp.watch('app/*.html', gulp.parallel('html'));
    gulp.watch('app/js/*.js', gulp.parallel('script'));
    gulp.watch('app/scss/**/*.scss', gulp.parallel('scss'))    
});

gulp.task('default', gulp.parallel( 'libs-css', 'scss', 'js', 'browser-sync', 'watch'))
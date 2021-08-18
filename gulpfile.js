const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
var rename = require('gulp-rename');
const cssnano = require('cssnano');
const browsersync = require('browser-sync').create();

sass.compiler = require("node-sass");

// Sass Task
//biên dịch file scss sang file css
function scssTask(){
  return src('src/scss/*.scss')
    .pipe(sass().on("error", sass.logError))//thông báo khi phát hiện lỗi
    .pipe(postcss([cssnano()]))//minify css
    //.pipe(rename('style.min.css'))//khi biên dịch sẽ tự động đổi tên file css
    .pipe(dest('src/css'));
}
// Browsersync Tasks
//đồng bộ và reload khi có thay đổi
function browsersyncServe(run){
  browsersync.init({
    server: {
      baseDir: '.'
    }
  });
  run();
}
function browsersyncReload(cb){
  browsersync.reload();
  cb();
}

// Watch Task
//quan sát tự thay đổi của các file
function watchTask(){
  watch('*.html', browsersyncReload);
  watch(['src/scss/**/*.scss'], series(scssTask, browsersyncReload));
}

exports.default = series(
  scssTask,
  browsersyncServe,
  watchTask
);
var gulp = require('gulp');
var ts = require('gulp-typescript');
var JSON_FILES = ['src/**/*.json'];

var output = {
  bundle: 'dist',
  serverDist: 'dist/src/server',
  appIndexDist: 'dist/src/apps/'
}

var src = {
  serverTsFile: 'src/server/**/*.ts',
  indexFile: 'src/apps/**/index.html'
}

var tsProject = ts.createProject('tsconfig.json');
gulp.task('scripts', () => {
  var tsResult = tsProject.src().pipe(tsProject());

  return tsResult.js.pipe(gulp.dest(output.serverDist));
})

gulp.task('output_index', () => {
  return gulp.src(src.indexFile)
      .pipe(gulp.dest(output.appIndexDist));
})

gulp.task('assets', () => {
  return gulp.src(JSON_FILES).pipe(gulp.dest(output.bundle));
})

gulp.task('default', ['scripts', 'assets', 'output_index']);

gulp.task('watch', ['default'], () => {
  gulp.watch(src.serverTsFile, ['scripts']);
  gulp.watch(src.indexFile, ['output_index']);
  gulp.watch(JSON_FILES, ['assets']);
})
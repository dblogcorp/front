var gulp = require('gulp');
var ts = require('gulp-typescript');
var JSON_FILES = ['src/**/*.json'];

var output = {
  bundle: 'dist',
  src: 'dist/src/',
  app: 'dist/src/apps/'
}

var src = {
  tsFile: 'src/**/*.ts',
  indexFile: 'src/apps/**/index.html'
}

var tsProject = ts.createProject('tsconfig.json');

gulp.task('scripts', () => {
  var tsResult = tsProject.src().pipe(tsProject());

  return tsResult.js.pipe(gulp.dest(output.src));
})

gulp.task('output_index', () => {
  return gulp.src(src.indexFile)
      .pipe(gulp.dest(output.app));
})

gulp.task('watch', ['scripts'], () => {
  gulp.watch(src.tsFile, ['scripts']);
})

gulp.task('assets', () => {
  return gulp.src(JSON_FILES).pipe(gulp.dest(output.bundle));
})

gulp.task('default', ['watch', 'assets', 'output_index']);
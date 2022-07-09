import { src, dest } from 'gulp';
import plumber from 'gulp-plumber';
import { init, write } from 'gulp-sourcemaps';
import babel from 'gulp-babel';
import terser from 'gulp-terser';
import rename from 'gulp-rename';

const js = () =>
  src('index.js')
    .pipe(plumber())
    .pipe(init())
    .pipe(
      babel({
        presets: ['@babel/env'],
      }),
    )
    .pipe(terser())
    .pipe(write())
    .pipe(rename({ suffix: '.min' }))
    .pipe(dest('dist'));

export default js;

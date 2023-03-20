import { src, dest } from 'gulp';
import plumber from 'gulp-plumber';
import babel from 'gulp-babel';
import terser from 'gulp-terser';
import rename from 'gulp-rename';

const js = () =>
  src('notify.js')
    .pipe(plumber())
    .pipe(
      babel({
        presets: ['@babel/env'],
      }),
    )
    .pipe(terser())
    .pipe(rename({ suffix: '.min' }))
    .pipe(dest('dist'));

export default js;

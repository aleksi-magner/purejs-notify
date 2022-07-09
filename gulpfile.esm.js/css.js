import { src, dest } from 'gulp';
import plumber from 'gulp-plumber';
import { init, write } from 'gulp-sourcemaps';
import autoprefixer from 'gulp-autoprefixer';
import cleanCSS from 'gulp-clean-css';
import rename from 'gulp-rename';

const css = () =>
  src('style.css')
    .pipe(plumber())
    .pipe(init())
    .pipe(
      autoprefixer({
        cascade: false,
      }),
    )
    .pipe(dest('dist'))
    .pipe(cleanCSS({ compatibility: '*' }))
    .pipe(write())
    .pipe(rename({ suffix: '.min' }))
    .pipe(dest('dist'));

export default css;

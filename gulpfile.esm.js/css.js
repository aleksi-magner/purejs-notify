import { src, dest } from 'gulp';
import plumber from 'gulp-plumber';
import autoprefixer from 'gulp-autoprefixer';
import cleanCSS from 'gulp-clean-css';
import rename from 'gulp-rename';

const css = () =>
  src('style.css')
    .pipe(plumber())
    .pipe(
      autoprefixer({
        cascade: false,
      }),
    )
    .pipe(dest('dist'))
    .pipe(cleanCSS({ compatibility: '*' }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(dest('dist'));

export default css;

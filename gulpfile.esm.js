import { src, dest, parallel, series } from 'gulp';
import plumber from 'gulp-plumber';
import tsc from 'gulp-typescript';
import babel from 'gulp-babel';
import autoprefixer from 'gulp-autoprefixer';
import cleanCSS from 'gulp-clean-css';

const ts = () =>
  src('src/index.ts')
    .pipe(plumber())
    .pipe(
      tsc({
        target: 'ES6',
        lib: ['ES6', 'DOM', 'DOM.Iterable'],
        declaration: true,
      }),
    )
    .pipe(dest('dist'));

const js = () =>
  src('dist/index.js')
    .pipe(plumber())
    .pipe(
      babel({
        presets: ['@babel/env'],
        minified: true,
        comments: false,
        targets: {
          android: '58',
          chrome: '58',
          edge: '79',
          firefox: '54',
          ios: '10.3',
          opera: '45',
          safari: '10.1',
          samsung: '7.2',
        },
        parserOpts: {
          sourceType: 'module',
          strictMode: true,
          attachComment: false,
        },
      }),
    )
    .pipe(dest('dist'));

const css = () =>
  src('src/style.css')
    .pipe(plumber())
    .pipe(
      autoprefixer({
        cascade: false,
      }),
    )
    .pipe(cleanCSS({ compatibility: '*' }))
    .pipe(dest('dist'));

export default parallel(series(ts, js), css);

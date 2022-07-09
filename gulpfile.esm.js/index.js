import { parallel } from 'gulp';
import css from './css';
import js from './js';

export default parallel(css, js);

import {uglify} from 'rollup-plugin-uglify';
import projInfo from '../package.json';
import path from 'path';
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';

export default {
  entry: 'index.js',
  output: {
    file: path.resolve(__dirname, '..', 'dist', `chorder-${projInfo.version}.min.js`),
    format: 'iife',
    name: 'Chorder'
  },
  plugins: [
    resolve(),
    babel(),
    (process.env.NODE_ENV === 'production' && uglify())
  ]
}
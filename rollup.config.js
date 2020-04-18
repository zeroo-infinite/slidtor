import babel from 'rollup-plugin-babel';
import builtins from 'rollup-plugin-node-builtins';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import replace from 'rollup-plugin-replace';
import postcss from 'rollup-plugin-postcss';
import filesize from 'rollup-plugin-filesize';
import autoprefixer from 'autoprefixer';
import localResolve from 'rollup-plugin-local-resolve';

import pkg from './package.json';

// Stop Rollup from warning about circular dependencies.
const ONWARN = (warning) => {
  if (warning.code !== 'CIRCULAR_DEPENDENCY') {
    console.warn(`(!) ${warning.message}`) // eslint-disable-line no-console
  }
}

const INPUT_FILE_PATH = 'src/index.js';
const OUTPUT_NAME = 'build';

const GLOBALS = {
  react: 'React',
  'react-dom': 'ReactDOM',
};

const PLUGINS = [
  postcss({
    extract: true,
    plugins: [
      autoprefixer,
    ],
  }),
  babel({
    exclude: 'node_modules/**',
    runtimeHelpers: true,
    "presets": [
      "@babel/preset-env",
      "@babel/preset-react"
    ],
    "plugins": [
      "@babel/plugin-transform-runtime",
      "@babel/plugin-proposal-class-properties"
    ]
  }),
  localResolve(),
  resolve({
    browser: true,
  }),
  commonjs({
    include: 'node_modules/**',
    namedExports: {
      'node_modules/esrever/esrever.js': ['reverse'],
      'node_modules/rc-util/node_modules/react-is/index.js': ['isFragment'],
      'node_modules/rc-collapse/node_modules/react-is/index.js': ['isFragment'],
    },
  }),
  json(),
  replace({
    'process.env.NODE_ENV': JSON.stringify('production'),
  }),

  // Register Node.js builtins for browserify compatibility.
  builtins(),

  filesize(),
];

const EXTERNAL = [
  'react',
  'react-dom',
];

const OUTPUT_DATA = [
  {
    file: pkg.browser,
    format: 'umd',
  },
  {
    file: pkg.main,
    format: 'cjs',
  },
  {
    file: pkg.module,
    format: 'es',
  },
];

const config = OUTPUT_DATA.map(({ file, format }) => ({
  input: INPUT_FILE_PATH,
  output: {
    file,
    format,
    name: OUTPUT_NAME,
    globals: GLOBALS,
  },
  external: EXTERNAL,
  plugins: PLUGINS,
  onwarn: ONWARN,
}));

export default config;

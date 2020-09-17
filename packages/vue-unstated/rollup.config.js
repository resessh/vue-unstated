import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';
import externalGlobals from 'rollup-plugin-external-globals';
import pkg from './package.json';

const input = 'src/index.ts';

export default () => {
  const configs = [
    // UMD
    {
      input,
      output: {
        name: 'VueUnstated',
        file: pkg.unpkg,
        format: 'umd',
      },
      plugins: [
        typescript({
          typescript: require('typescript'),
        }),
        babel({
          exclude: ['node_modules/**'],
        }),
        terser({
          output: {
            comments: /^!/,
          },
        }),
        externalGlobals({
          vue: 'Vue',
        }),
      ],
    },

    // CommonJS and ES module
    {
      input,
      external: ['vue'],
      output: [
        {
          file: pkg.main,
          format: 'cjs',
        },
        {
          file: pkg.module,
          format: 'es',
        },
      ],
      plugins: [
        typescript({
          typescript: require('typescript'),
        }),
        babel({
          exclude: ['node_modules/**'],
        }),
      ],
    },
  ];

  return configs;
};

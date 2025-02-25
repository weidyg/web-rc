import { defineConfig } from 'father';

export default defineConfig({
  esm: {
    input: 'src',
    output: 'es',
    extraBabelPlugins: [[require.resolve('./scripts/replaceLib'), {}]],
    platform: 'browser',
    transformer: 'babel',
    ignores: ['src/**/_demos/*'],
  },
  cjs: {
    extraBabelPlugins: [[require.resolve('./scripts/replaceEs'), {}]],
    input: 'src',
    output: 'lib',
    platform: 'browser',
    transformer: 'babel',
    ignores: ['src/**/_demos/*'],
  },
});

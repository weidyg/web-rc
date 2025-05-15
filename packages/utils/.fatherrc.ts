import { defineConfig } from 'father';

export default defineConfig({
  umd: {
    name: 'biz-utils',
    chainWebpack: (memo) => {
      memo.output.libraryExport('default');
      return memo;
    },
  },
  extends: '../../.fatherrc.base.ts',
});

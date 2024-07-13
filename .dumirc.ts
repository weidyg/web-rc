
import chalk from 'chalk';
import { join } from 'path';
import { readdirSync } from 'fs';

import { defineConfig } from 'dumi';
import { IDumiUserConfig } from 'dumi/dist/types';
import { IHero, SiteThemeConfig } from 'dumi-theme-antd-style';
import { IThemeConfig } from 'dumi/dist/client/theme-api/types';

const headPkgList: string[] = [];
// utils must build before core
// runtime must build before renderer-react
const pkgList = readdirSync(join(__dirname, 'packages')).filter(
  (pkg) => pkg.charAt(0) !== '.' && !headPkgList.includes(pkg),
);

const alias = pkgList.reduce((pre, pkg) => {
  pre[`@web-react/${pkg}`] = join(__dirname, 'packages', pkg, 'src');
  return { ...pre, };
}, {} as Record<string, string>);
console.log(`🌼 alias list \n${chalk.blue(Object.keys(alias).join('\n'))}`);

const tailPkgList = pkgList.map((path) => `packages/${path}/src/components`);

const config: IDumiConfig = {
  outputPath: 'docs-dist',
  alias,
  resolve: {
    docDirs: ['docs'],
    atomDirs: tailPkgList.map((dir) => ({ type: 'component', dir })),
    // atomDirs: [{ type: 'component', dir: 'src' }],
    // entryFile: './src/index.tsx',
  },
  styles: [`.markdown table{table-layout: fixed;}`],
  locales: [
    { id: 'zh-CN', name: '中文' },
    { id: 'en-US', name: 'English' },
  ],
  themeConfig: {
    lastUpdated: true,
    name: 'ant-components',
    logo: 'https://gw.alipayobjects.com/zos/antfincdn/upvrAjAPQX/Logo_Tech%252520UI.svg',
    github: 'https://github.com/weidyg/ant-components',
    siteToken: { demoInheritSiteTheme: true },
    nav: {
      'zh-CN': [
        { title: '文档', link: '/docs' },
        { title: '组件', link: '/components' },
        { title: 'Changelog', link: '/changelog' },
      ],
      'en-US': [
        { title: 'Docs', link: '/en-US/docs' },
        { title: 'Components', link: '/en-US/components' },
        { title: 'Changelog', link: '/en-US/changelog' },
      ],
    },
    footerConfig: {
      columns: [],
      copyright: 'Copyright © 2024',
      bottom: 'Powered by weidyg',
    },
    apiHeader: {
      pkg: '@web-react/components',
      match: ["/api", "/components"],
    },
    prefersColor: {
      default: 'light',
      switch: true,
    },
  },
}

export interface IDumiConfig extends IDumiUserConfig {
  themeConfig?: IThemeConfig & Omit<SiteThemeConfig, 'hero'> & {
    hero?: IHero;
  };
}
export default defineConfig(config);

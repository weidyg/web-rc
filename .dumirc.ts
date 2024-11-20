import { readdirSync } from 'fs';
import { join } from 'path';

import { defineConfig } from 'dumi';
import { IHero, SiteThemeConfig } from 'dumi-theme-antd-style';
import { IThemeConfig } from 'dumi/dist/client/theme-api/types';
import { IDumiUserConfig } from 'dumi/dist/types';

const headPkgList: string[] = [];
// utils must build before core
// runtime must build before renderer-react
const pkgList = readdirSync(join(__dirname, 'packages')).filter(
  (pkg) => pkg.charAt(0) !== '.' && !headPkgList.includes(pkg),
);

const alias = pkgList.reduce((pre, pkg) => {
  pre[`@web-rc/biz-${pkg}`] = join(__dirname, 'packages', pkg, 'src');
  return { ...pre };
}, {} as Record<string, string>);

// console.log(`🌼 alias list \n${chalk.blue(Object.keys(alias).join('\n'))}`);

const tailPkgList = pkgList.map((path) => `packages/${path}/src/components`);

const config: IDumiConfig = {
  base: '/web-rc/',
  publicPath: '/web-rc/',
  codeSplitting: {
    jsStrategy: 'granularChunks',
  },
  alias,
  // mako: {},
  resolve: {
    docDirs: ['docs'],
    atomDirs: tailPkgList.map((dir) => ({ type: 'component', dir })),
  },
  styles: [`.markdown table{table-layout: fixed;}`],
  locales: [
    { id: 'zh-CN', name: '中文' },
    { id: 'en-US', name: 'English' },
  ],
  themeConfig: {
    name: 'biz-components',
    logo: 'https://gw.alipayobjects.com/zos/antfincdn/upvrAjAPQX/Logo_Tech%252520UI.svg',
    github: 'https://github.com/weidyg/web-rc',
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
      pkg: '@web-rc/biz-components',
      match: ['/api', '/components'],
    },
    prefersColor: {
      default: 'auto',
      switch: true,
    },
    lastUpdated: true,
    siteToken: { demoInheritSiteTheme: true },
  },
};

export interface IDumiConfig extends IDumiUserConfig {
  themeConfig?: IThemeConfig &
    Omit<SiteThemeConfig, 'hero'> & {
      hero?: IHero;
    };
}
export default defineConfig(config);

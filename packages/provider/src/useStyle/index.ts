import { useContext } from 'react';
import { ConfigProvider as AntdConfigProvider, theme } from 'antd';
import { CSSInterpolation, useStyleRegister } from '@ant-design/cssinjs';
import type { GlobalToken } from 'antd/lib/theme/interface';
import { TinyColor } from '@ctrl/tinycolor';
import * as batToken from './token';
import { BizConfigContext } from '../index';

/**
 * 把一个颜色设置一下透明度
 * @example (#fff, 0.5) => rgba(255, 255, 255, 0.5)
 * @param baseColor {string}
 * @param alpha {0-1}
 * @returns rgba {string}
 */
export const setAlpha = (baseColor: string, alpha: number) => new TinyColor(baseColor).setAlpha(alpha).toRgbString();

export type GenerateStyle<ComponentToken extends object = GlobalToken, ReturnType = CSSInterpolation> = (
  token: ComponentToken,
  ...rest: any[]
) => ReturnType;

const genTheme = (): any => {
  if (typeof theme === 'undefined' || !theme) {
    return batToken as any;
  }
  return theme;
};
export const bizTheme = genTheme() as typeof theme;
export const useToken = bizTheme.useToken;

export type BizAliasToken = GlobalToken & {
  themeId: number;
  antPrefixCls: string;
  iconPrefixCls: string;
  bizPrefixCls: string;
  componentCls: string;
};

/**
 * 封装了一下 antd 的 useStyle，支持了一下antd@4
 * @param componentName {string} 组件的名字
 * @param styleFn {GenerateStyle} 生成样式的函数
 * @returns UseStyleResult
 */
export function useStyle(
  componentName: string,
  styleFn: (token: BizAliasToken) => CSSInterpolation,
  prefixCls?: string,
) {
  let { token, hashed, theme: provideTheme } = useContext(BizConfigContext);
  const { iconPrefixCls, getPrefixCls } = useContext(AntdConfigProvider.ConfigContext);
  const { token: antdToken, hashId } = useToken();
  const suffixCls = componentName
    ?.replace(/([A-Z])/g, (_, g) => '-' + g.toLowerCase())
    ?.replace(/^\-/, '')
    ?.replace(/^biz\-/, '');

  if (!token) { token = { ...antdToken } as BizAliasToken; }
  token.antPrefixCls = token.antPrefixCls || getPrefixCls();
  token.iconPrefixCls = token.iconPrefixCls || iconPrefixCls;
  token.bizPrefixCls = token.bizPrefixCls || 'biz';

  token.componentCls = `.${(prefixCls ?? token.bizPrefixCls)?.replace(/^\./, '')}-${suffixCls}`;
  return {
    wrapSSR: useStyleRegister(
      {
        token,
        theme: provideTheme!,
        path: [componentName],
      },
      () => styleFn(token)
    ),
    token,
    hashId: hashed ? hashId : '',
    prefixCls: token.componentCls?.replace(/^\./, ''),
  };
}

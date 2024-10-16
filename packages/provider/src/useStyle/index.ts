import { useContext } from 'react';
import { ConfigProvider as AntdConfigProvider, theme } from 'antd';
import { CSSInterpolation, useStyleRegister } from '@ant-design/cssinjs';
import type { GlobalToken } from 'antd/lib/theme/interface';
import { TinyColor } from '@ctrl/tinycolor';
import * as batToken from './token';
import { BizConfigContext } from '../index';

export type BizAliasToken = GlobalToken & {
  themeId: number;
  antPrefixCls: string;
  iconPrefixCls: string;
  bizPrefixCls: string;
  componentCls: string;
};
export type GenerateStyleUtils<ComponentToken> = {
  token: ComponentToken,
  isDark: (baseColor: string) => Boolean,
  setAlpha: (baseColor: string, alpha: number) => string,
}
export type GenerateStyleFn<ComponentToken extends BizAliasToken, Props, ReturnType = CSSInterpolation> =
  (utils: GenerateStyleUtils<ComponentToken>, props: Props) => ReturnType;


const setAlpha = (baseColor: string, alpha: number) => new TinyColor(baseColor).setAlpha(alpha).toRgbString();
const isDark = (baseColor: string) => new TinyColor(baseColor).isDark();
const genTheme = (): any => {
  if (typeof theme === 'undefined' || !theme) {
    return batToken as any;
  }
  return theme;
};

export const bizTheme = genTheme() as typeof theme;
export const useToken = bizTheme.useToken;
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

export function generatStyles<ComponentToken extends BizAliasToken, Props>(
  genBizStyle: GenerateStyleFn<ComponentToken, Exclude<Props, "prefixCls">>,
  componentName: string,
) {
  return (props: Props & { prefixCls?: string }) => {
    const { prefixCls, ...restProps } = props as any;
    return useStyle(componentName, (bizToken) => {
      const token = { ...bizToken, } as ComponentToken;
      return [genBizStyle({
        token,
        isDark,
        setAlpha,
      }, restProps)];
    }, prefixCls);
  }
}


import { useContext } from "react";
import { ConfigProvider as AntdConfigProvider, theme } from 'antd';
import type { GlobalToken } from 'antd/lib/theme/interface';
import { CSSInterpolation, useStyleRegister } from '@ant-design/cssinjs';
import { TinyColor } from '@ctrl/tinycolor';
import * as batToken from './token';
import { BizProvider } from '../index';

/**
 * 把一个颜色设置一下透明度
 * @example (#fff, 0.5) => rgba(255, 255, 255, 0.5)
 * @param baseColor {string}
 * @param alpha {0-1}
 * @returns rgba {string}
 */
export const setAlpha = (baseColor: string, alpha: number) =>
    new TinyColor(baseColor).setAlpha(alpha).toRgbString();


export type GenerateStyle<
    ComponentToken extends object = GlobalToken,
    ReturnType = CSSInterpolation,
> = (token: ComponentToken, ...rest: any[]) => ReturnType;

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
    bizComponentsCls: string;
    componentCls: string;
    antCls: string;
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
    let { token = {} as Record<string, any> as BizAliasToken } = useContext(BizProvider);
    const { hashed, theme: provideTheme } = useContext(BizProvider);
    const { token: antdToken, hashId } = useToken();
    const { getPrefixCls } = useContext(AntdConfigProvider.ConfigContext);
    const suffixCls = componentName
        ?.replace(/([A-Z])/g, (_, g) => "-" + g.toLowerCase())
        ?.replace(/^\-/, '')
        ?.replace(/^biz\-/, '');

    // 如果不在 Provider 里面，就用 antd 的
    // if (!token.layout) { token = { ...antdToken } as any; }
    token = { ...antdToken } as any;
    token.antCls = `.${getPrefixCls()}`;
    token.bizComponentsCls = `.${token.bizComponentsCls?.replace(/^\./, '') ?? getPrefixCls('biz')}`;
    token.componentCls = `.${(prefixCls ?? token.bizComponentsCls)?.replace(/^\./, '')}-${suffixCls}`;
    console.log('token.componentCls',token.componentCls);
    return {
        wrapSSR: useStyleRegister({
            token,
            theme: provideTheme!,
            path: [componentName],
        }, () => styleFn(token as BizAliasToken)),
        hashId: hashed ? hashId : '',
        prefixCls: token.componentCls?.replace(/^\./, ''),
    };
}

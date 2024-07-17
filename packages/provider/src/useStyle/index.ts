import { useContext } from "react";
import { ConfigProvider as AntdConfigProvider, theme } from 'antd';
import type { GlobalToken } from 'antd/lib/theme/interface';
import { CSSInterpolation, useStyleRegister } from '@ant-design/cssinjs';
import * as batToken from './token';
import { BizProvider } from '../index';

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
    /**
     * biz 的 className
     * @type {string}
     * @example .ant-biz
     */
    bizComponentsCls: string;
    /**
     * antd 的 className
     * @type {string}
     * @example .ant
     */
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
) {
    let { token = {} as Record<string, any> as BizAliasToken } = useContext(BizProvider);
    const { hashed, theme: provideTheme } = useContext(BizProvider);

    const { token: antdToken, hashId } = useToken();
    const { getPrefixCls } = useContext(AntdConfigProvider.ConfigContext);

    // 如果不在 Provider 里面，就用 antd 的
    // if (!token.layout) { token = { ...antdToken } as any; }
    token = { ...antdToken } as any;
    token.antCls = `.${getPrefixCls()}`;
    token.bizComponentsCls = token.bizComponentsCls ?? `.${getPrefixCls('biz')}`;
    return {
        wrapSSR: useStyleRegister(
            {
                theme: provideTheme!,
                token,
                path: [componentName],
            },
            () => styleFn(token as BizAliasToken),
        ),
        hashId: hashed ? hashId : '',
    };
}

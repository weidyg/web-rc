import React, { useContext, useEffect, useMemo } from 'react';
import { ConfigProvider as AntdConfigProvider } from 'antd';
import { SWRConfig, useSWRConfig } from 'swr';
import zh_CN from 'antd/lib/locale/zh_CN';
import type { Theme } from '@ant-design/cssinjs';
import { useCacheToken } from '@ant-design/cssinjs';
import { merge } from './utils/merge';

import { bizTheme } from './useStyle';
import type { BizAliasToken } from './useStyle';
import { defaultToken, emptyTheme } from './useStyle/token';
export * from './useStyle';



type OmitUndefined<T> = {
  [P in keyof T]: NonNullable<T[P]>;
};

const omitUndefined = <T extends Record<string, any>>(
  obj: T,
): OmitUndefined<T> => {
  const newObj = {} as Record<string, any> as T;
  Object.keys(obj || {}).forEach((key) => {
    if (obj[key] !== undefined) {
      (newObj as any)[key] = obj[key];
    }
  });
  if (Object.keys(newObj as Record<string, any>).length < 1) {
    return undefined as any;
  }
  return newObj as OmitUndefined<T>;
};

/**
 * 用于判断当前是否需要开启哈希（Hash）模式。
 * 首先也会判断当前是否处于测试环境中（通过 process.env.NODE_ENV === 'TEST' 判断），
 * 如果是，则返回 false。否则，直接返回 true 表示需要打开。
 * @returns
 */
export const isNeedOpenHash = () => {
  if (
    typeof process !== 'undefined' &&
    (process.env.NODE_ENV?.toUpperCase() === 'TEST' ||
      process.env.NODE_ENV?.toUpperCase() === 'DEV')
  ) {
    return false;
  }
  return true;
};

export type ParamsType = Record<string, any>;
export type DeepPartial<T> = T extends object
  ? { [P in keyof T]?: DeepPartial<T[P]>; }
  : T;

/**
 * 自带的token 配置
 */
export type ConfigContextPropsType = {
  token: BizAliasToken;
  hashId?: string;
  hashed?: boolean;
  dark?: boolean;
  theme?: Theme<any, any>;
};

/* Creating a context object with the default values. */
const BizConfigContext = React.createContext<ConfigContextPropsType>({
  theme: emptyTheme,
  hashed: true,
  dark: false,
  token: defaultToken as BizAliasToken,
});

export const { Consumer: ConfigConsumer } = BizConfigContext;

/**
 * 组件解除挂载后清空一下 cache
 * @date 2022-11-28
 * @returns null
 */
const CacheClean = () => {
  const { cache } = useSWRConfig();

  useEffect(() => {
    return () => {
      // is a map
      // @ts-ignore
      cache.clear();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
};

/**
 * 用于配置 Pro 的组件,分装之后会简单一些
 * @param props
 * @returns
 */
const ConfigProviderContainer: React.FC<{
  children: React.ReactNode;
  autoClearCache?: boolean;
  token?: DeepPartial<BizAliasToken>;
  hashed?: boolean;
  dark?: boolean;
  prefixCls?: string;
}> = (props) => {
  const {
    children,
    dark,
    autoClearCache = false,
    token: propsToken,
    prefixCls,
  } = props;
  const { locale, getPrefixCls, ...restConfig } = useContext(
    AntdConfigProvider.ConfigContext,
  );
  const tokenContext = bizTheme.useToken?.();
  const bizProvide = useContext(BizConfigContext);

  /**
   * pro 的 类
   * @type {string}
   * @example .ant-pro
   */

  const bizComponentsCls: string = prefixCls
    ? `.${prefixCls}`
    : `.${getPrefixCls()}-biz`;

  const antCls = '.' + getPrefixCls();

  const salt = `${bizComponentsCls}`;

  const bizProvideValue = useMemo(() => {
    return {
      ...bizProvide,
      dark: dark ?? bizProvide.dark,
      token: merge(bizProvide.token, tokenContext.token, {
        bizComponentsCls,
        antCls,
        themeId: tokenContext.theme.id,
      }),
    };
  }, [
    locale?.locale,
    bizProvide,
    dark,
    tokenContext.token,
    tokenContext.theme.id,
    bizComponentsCls,
    antCls,
  ]);

  const finalToken = {
    ...(bizProvideValue.token || {}),
    bizComponentsCls,
  };

  const [token, nativeHashId] = useCacheToken<BizAliasToken>(
    tokenContext.theme as unknown as Theme<any, any>,
    [tokenContext.token, finalToken ?? {}],
    {
      salt,
      override: finalToken,
    },
  );

  const hashed = useMemo(() => {
    if (props.hashed === false) {
      return false;
    }
    if (bizProvide.hashed === false) return false;
    return true;
  }, [bizProvide.hashed, props.hashed]);

  const hashId = useMemo(() => {
    if (props.hashed === false) {
      return '';
    }
    if (bizProvide.hashed === false) return '';
    //Fix issue with hashId code
    if (isNeedOpenHash() === false) {
      return '';
    } else if (tokenContext.hashId) {
      return tokenContext.hashId;
    } else {
      // 生产环境或其他环境
      return nativeHashId;
    }
  }, [nativeHashId, bizProvide.hashed, props.hashed]);

  const themeConfig = useMemo(() => {
    return {
      ...restConfig.theme,
      hashId: hashId,
      hashed: hashed && isNeedOpenHash(),
    };
  }, [restConfig.theme, hashId, hashed, isNeedOpenHash()]);

  const bizConfigContextValue = useMemo(() => {
    return {
      ...bizProvideValue!,
      token,
      theme: tokenContext.theme as unknown as Theme<any, any>,
      hashed,
      hashId,
    };
  }, [
    bizProvideValue,
    token,
    tokenContext.theme,
    hashed,
    hashId,
  ]);

  const configProviderDom = useMemo(() => {
    return (
      <AntdConfigProvider {...restConfig} theme={themeConfig}>
        <BizConfigContext.Provider value={bizConfigContextValue}>
          <>
            {autoClearCache && <CacheClean />}
            {children}
          </>
        </BizConfigContext.Provider>
      </AntdConfigProvider>
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    restConfig,
    themeConfig,
    bizConfigContextValue,
    autoClearCache,
    children,
  ]);

  if (!autoClearCache) return configProviderDom;

  return (
    <SWRConfig value={{ provider: () => new Map() }}>
      {configProviderDom}
    </SWRConfig>
  );
};

/**
 * 用于配置 Biz 的一些全局性的东西
 * @param props
 * @returns
 */
export const BizConfigProvider: React.FC<{
  children: React.ReactNode;
  autoClearCache?: boolean;
  token?: DeepPartial<BizAliasToken>;
  needDeps?: boolean;
  dark?: boolean;
  hashed?: boolean;
  prefixCls?: string;
}> = (props) => {
  const { needDeps, dark, token } = props;
  const bizProvide = useContext(BizConfigContext);
  const { locale, theme, ...rest } = useContext(
    AntdConfigProvider.ConfigContext,
  );

  // 是不是不需要渲染 provide
  const isNullProvide =
    needDeps &&
    bizProvide.hashId !== undefined &&
    Object.keys(props).sort().join('-') === 'children-needDeps';

  if (isNullProvide) return <>{props.children}</>;

  const mergeAlgorithm = () => {
    const isDark = dark ?? bizProvide.dark;
    if (isDark && !Array.isArray(theme?.algorithm)) {
      return [bizTheme.darkAlgorithm, theme?.algorithm].filter(Boolean);
    }
    if (isDark && Array.isArray(theme?.algorithm)) {
      return [bizTheme.darkAlgorithm, ...(theme?.algorithm || [])].filter(
        Boolean,
      );
    }
    return theme?.algorithm;
  };
  // 自动注入 antd 的配置
  const configProvider = {
    ...rest,
    locale: locale || zh_CN,
    theme: omitUndefined({
      ...theme,
      algorithm: mergeAlgorithm(),
    }),
  } as typeof theme;

  return (
    <AntdConfigProvider {...configProvider}>
      <ConfigProviderContainer {...props} token={token} />
    </AntdConfigProvider>
  );
};

BizConfigContext.displayName = 'BizProvider';
export const BizProvider = BizConfigContext;
export default BizConfigContext;

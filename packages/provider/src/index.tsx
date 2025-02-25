import React, { useContext, useEffect, useMemo } from 'react';
import { ConfigProvider as AntdConfigProvider, ConfigProvider, MappingAlgorithm, theme } from 'antd';
import { SWRConfig, useSWRConfig } from 'swr';
import zh_CN from 'antd/lib/locale/zh_CN';
import type { Theme } from '@ant-design/cssinjs';
import { useCacheToken } from '@ant-design/cssinjs';
import { merge } from './utils/merge';
// import dayjs from 'dayjs';

// import { bizTheme, useToken, type BizAliasToken } from './useStyle';
import { findIntlKeyByAntdLocaleKey, intlMap, IntlType, zhCNIntl } from './intl';
import { BizAliasToken, bizTheme } from './useStyle';
export * from './useStyle';

const { useToken } = bizTheme;

type OmitUndefined<T> = {
  [P in keyof T]: NonNullable<T[P]>;
};

const omitUndefined = <T extends Record<string, any>>(obj: T): OmitUndefined<T> => {
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
    (process.env.NODE_ENV?.toUpperCase() === 'TEST' || process.env.NODE_ENV?.toUpperCase() === 'DEV')
  ) {
    return false;
  }
  return true;
};

export type ParamsType = Record<string, any>;
export type DeepPartial<T> = T extends object ? { [P in keyof T]?: DeepPartial<T[P]> } : T;

/**
 * 自带的token 配置
 */
export type ConfigContextPropsType = {
  intl?: IntlType;
  hashId?: string;
  hashed?: boolean;
  dark?: boolean;
  token?: BizAliasToken;
  theme?: Theme<any, any>;
};

/* Creating a context object with the default values. */
export const BizConfigContext = React.createContext<ConfigContextPropsType>({
  intl: {
    ...zhCNIntl,
    locale: 'default',
  },
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
 * 用于配置 Biz 的一些全局性的东西
 * @param props
 * @returns
 */
const ConfigProviderContainer: React.FC<{
  children: React.ReactNode;
  autoClearCache?: boolean;
  hashed?: boolean;
  dark?: boolean;
  antPrefixCls?: string;
  iconPrefixCls?: string;
  bizPrefixCls?: string;
  intl?: IntlType;
}> = (props) => {
  const { children, dark, autoClearCache = false, intl } = props;
  const bizProvide = useContext(BizConfigContext);
  const {
    locale,
    theme: antTheme,
    iconPrefixCls: antIconPrefixCls,
    getPrefixCls,
    ...restConfig
  } = useContext(AntdConfigProvider.ConfigContext);
  const tokenContext = useToken();

  const antPrefixCls: string = props.antPrefixCls || getPrefixCls();
  const iconPrefixCls: string = props.iconPrefixCls || antIconPrefixCls;
  const bizPrefixCls: string = props.bizPrefixCls || `${antPrefixCls}-biz`;

  const bizProvideValue = useMemo(() => {
    const localeName = locale?.locale;
    const key = findIntlKeyByAntdLocaleKey(localeName);
    // antd 的 key 存在的时候以 antd 的为主
    const resolvedIntl =
      intl ??
      (localeName && bizProvide.intl?.locale === 'default'
        ? intlMap[key! as 'zh-CN']
        : bizProvide.intl || intlMap[key! as 'zh-CN']);

    return {
      ...bizProvide,
      dark: dark ?? bizProvide.dark,
      token: merge(bizProvide.token, tokenContext.token, {
        themeId: tokenContext.theme.id,
        antPrefixCls,
        iconPrefixCls,
        bizPrefixCls,
      }),
      intl: resolvedIntl || zhCNIntl,
    };
  }, [
    locale?.locale,
    bizProvide,
    dark,
    tokenContext.token,
    tokenContext.theme.id,
    bizPrefixCls,
    antPrefixCls,
    iconPrefixCls,
  ]);

  const finalToken = {
    ...(bizProvideValue.token || {}),
    bizPrefixCls,
  };

  const [token, nativeHashId] = useCacheToken<BizAliasToken>(
    tokenContext.theme as unknown as Theme<any, any>,
    [tokenContext.token, finalToken ?? {}],
    { salt: bizPrefixCls, override: finalToken },
  );

  const [hashed, hashId] = useMemo(() => {
    if (props.hashed === false || bizProvide.hashed === false || isNeedOpenHash() === false) {
      return [false, ''];
    } else if (tokenContext.hashId) {
      return [true, tokenContext.hashId];
    } else {
      // 生产环境或其他环境
      return [true, nativeHashId];
    }
  }, [nativeHashId, bizProvide.hashed, props.hashed]);

  // useEffect(() => {
  //   dayjs.locale(locale?.locale || 'zh-cn');
  // }, [locale?.locale]);

  const themeConfig = useMemo(() => {
    return {
      ...antTheme,
      hashId,
      hashed,
    };
  }, [dark, antTheme, hashId, hashed]);

  const bizConfigContextValue = useMemo(() => {
    return {
      ...bizProvideValue!,
      theme: tokenContext.theme as unknown as Theme<any, any>,
      token,
      hashed,
      hashId,
    };
  }, [bizProvideValue, tokenContext.theme, token, hashed, hashId]);

  const configProviderDom = useMemo(() => {
    return (
      <AntdConfigProvider {...restConfig} prefixCls={antPrefixCls} iconPrefixCls={iconPrefixCls} theme={themeConfig}>
        <BizConfigContext.Provider value={bizConfigContextValue}>
          <>
            {autoClearCache && <CacheClean />}
            {children}
          </>
        </BizConfigContext.Provider>
      </AntdConfigProvider>
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restConfig, themeConfig, bizConfigContextValue, autoClearCache, children]);

  if (!autoClearCache) return configProviderDom;

  return <SWRConfig value={{ provider: () => new Map() }}>{configProviderDom}</SWRConfig>;
};

/**
 * 用于配置 Biz 的一些全局性的东西
 * @param props
 * @returns
 */
export const BizConfigProvider: React.FC<{
  children: React.ReactNode;
  autoClearCache?: boolean;
  needDeps?: boolean;
  dark?: boolean;
  hashed?: boolean;
  antPrefixCls?: string;
  iconPrefixCls?: string;
  bizPrefixCls?: string;
  intl?: IntlType;
}> = (props) => {
  const { needDeps, dark } = props;
  const bizProvide = useContext(BizConfigContext);
  const { locale, theme, ...rest } = useContext(AntdConfigProvider.ConfigContext);

  // 是不是不需要渲染 provide
  const isNullProvide =
    needDeps && bizProvide.hashId !== undefined && Object.keys(props).sort().join('-') === 'children-needDeps';

  if (isNullProvide) {
    return <>{props.children}</>;
  }

  const mergeAlgorithm = () => {
    const isDark = dark ?? bizProvide.dark;
    return isDark ? bizTheme.darkAlgorithm : theme?.algorithm;
  };
  // 自动注入 antd 的配置
  const configProvider = {
    ...rest,
    locale: locale || zh_CN,
    theme: omitUndefined({
      ...theme,
      hashed: props.hashed ?? bizProvide.hashed ?? theme?.hashed,
      algorithm: mergeAlgorithm(),
    }),
  } as typeof theme;

  return (
    <AntdConfigProvider {...configProvider}>
      <ConfigProviderContainer {...props} dark={dark} />
    </AntdConfigProvider>
  );
};

/**
 * It returns the intl object from the context if it exists, otherwise it returns the intl object for
 * 获取国际化的方法
 * @param locale
 * @param localeMap
 * the current locale
 * @returns The return value of the function is the intl object.
 */
export function useIntl(): IntlType {
  const { locale } = useContext(AntdConfigProvider.ConfigContext);
  const { intl } = useContext(BizConfigContext);

  if (intl && intl.locale !== 'default') {
    return intl || zhCNIntl;
  }

  if (locale?.locale) {
    return intlMap[findIntlKeyByAntdLocaleKey(locale.locale) as 'zh-CN'] || zhCNIntl;
  }

  return zhCNIntl;
}

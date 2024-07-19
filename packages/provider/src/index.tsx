import { createContext, useContext, useMemo } from 'react';
import { ConfigProvider as AntdConfigProvider } from 'antd';
import { BizAliasToken, bizTheme } from './useStyle';
import { useCacheToken, type Theme } from '@ant-design/cssinjs';
import { defaultToken, emptyTheme } from './useStyle/token';
import { merge } from './utils/merge';

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

const BizConfigContext = createContext<ConfigContextPropsType>({
  theme: emptyTheme,
  hashed: true,
  dark: false,
  token: defaultToken as BizAliasToken,
});
const ConfigProviderContainer: React.FC<BizConfigProviderProps> = (props) => {
  const { children, dark, token: propsToken, prefixCls } = props;

  const { locale, getPrefixCls, ...restConfig } = useContext(
    AntdConfigProvider.ConfigContext,
  );
  const tokenContext = bizTheme.useToken?.();
  const bizProvide = useContext(BizConfigContext);
  const bizComponentsCls = prefixCls
    ? `.${prefixCls}`
    : `.${getPrefixCls()}-biz`;
  const antCls = `.${getPrefixCls()}`;
  const salt = `${bizComponentsCls}`;

  const proProvideValue = useMemo(() => {
    // const localeName = locale?.locale;
    // const key = findIntlKeyByAntdLocaleKey(localeName);
    // // antd 的 key 存在的时候以 antd 的为主
    // const resolvedIntl =
    //     intl ??
    //     (localeName && proProvide.intl?.locale === 'default'
    //         ? intlMap[key! as 'zh-CN']
    //         : proProvide.intl || intlMap[key! as 'zh-CN']);

    return {
      ...bizProvide,
      dark: dark ?? bizProvide.dark,
      token: merge(bizProvide.token, tokenContext.token, {
        bizComponentsCls,
        antCls,
        themeId: tokenContext.theme.id,
        // layout: proLayoutTokenMerge,
      }),
      // intl: resolvedIntl || zhCNIntl,
    };
  }, [
    locale?.locale,
    bizProvide,
    dark,
    tokenContext.token,
    tokenContext.theme.id,
    bizComponentsCls,
    antCls,
    // proLayoutTokenMerge,
    // intl,
  ]);

  const finalToken = {
    ...(proProvideValue.token || {}),
    bizComponentsCls,
  };

  const [token, nativeHashId] = useCacheToken<BizAliasToken>(
    tokenContext.theme as unknown as Theme<any, any>,
    [tokenContext.token, finalToken ?? {}],
    { salt, override: finalToken },
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

  // useEffect(() => {
  //     dayjs.locale(locale?.locale || 'zh-cn');
  // }, [locale?.locale]);

  const themeConfig = useMemo(() => {
    return {
      ...restConfig.theme,
      hashId: hashId,
      hashed: hashed && isNeedOpenHash(),
    };
  }, [restConfig.theme, hashId, hashed, isNeedOpenHash()]);

  const bizConfigContextValue = useMemo(() => {
    return {
      ...proProvideValue!,
      token,
      theme: tokenContext.theme as unknown as Theme<any, any>,
      hashed,
      hashId,
    };
  }, [proProvideValue, token, tokenContext.theme, hashed, hashId]);

  const configProviderDom = useMemo(() => {
    return (
      <BizConfigContext.Provider value={bizConfigContextValue}>
        {children}
      </BizConfigContext.Provider>
    );
  }, [restConfig, children]);

  return <>{configProviderDom}</>;
};

export const BizConfigProvider: React.FC<BizConfigProviderProps> = (props) => {
  return (
    <>
      <ConfigProviderContainer {...props} />
    </>
  );
};

export type ConfigContextPropsType = {
  token: BizAliasToken;
  hashId?: string;
  hashed?: boolean;
  dark?: boolean;
  theme?: Theme<any, any>;
};
export type BizConfigProviderProps = {
  children: React.ReactNode;
  token?: DeepPartial<BizAliasToken>;
  hashed?: boolean;
  dark?: boolean;
  prefixCls?: string;
};
export type DeepPartial<T> = T extends object
  ? { [P in keyof T]?: DeepPartial<T[P]> }
  : T;
BizConfigProvider.displayName = 'BizProvider';
export const BizProvider = BizConfigContext;
export default BizConfigContext;

export * from './useStyle';

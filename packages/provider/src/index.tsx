import { ConfigProvider as AntdConfigProvider } from 'antd';
import { useContext, useMemo } from 'react';
// import { SWRConfig, useSWRConfig } from 'swr';


/**
 * 用于配置 Pro 的组件,分装之后会简单一些
 * @param props
 * @returns
 */
const ConfigProviderContainer: React.FC<{
    children: React.ReactNode;
}> = (props) => {
    const {
        children,
    } = props;

    const { locale, getPrefixCls, ...restConfig } = useContext(
        AntdConfigProvider.ConfigContext,
    );

    const configProviderDom = useMemo(() => {
        return (
            <>
                {children}
            </>
        );
    }, [
        restConfig,
        children,
    ]);

    return (
        <>
            {configProviderDom}
        </>
    );
};

/**
 * 用于配置 Biz 的一些全局性的东西
 * @param props
 * @returns
 */
export const BizConfigProvider: React.FC<{
    children: React.ReactNode;
}> = (props) => {
    const { locale, theme, ...rest } = useContext(
        AntdConfigProvider.ConfigContext,
    );
    const configProvider = {
        ...rest,
    } as typeof theme;

    return (
        <AntdConfigProvider {...configProvider}>
            <ConfigProviderContainer {...props} />
        </AntdConfigProvider>
    );
};
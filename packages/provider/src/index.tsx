
import { createContext, useContext, useMemo } from 'react';
import { ConfigProvider as AntdConfigProvider } from 'antd';
import { ProConfigProvider } from '@ant-design/pro-components';

const BizConfigContext = createContext<ConfigContextPropsType>({

});
const ConfigProviderContainer: React.FC<BizConfigProviderProps> = (props) => {
    const {
        children,
    } = props;

    const { locale, getPrefixCls, ...restConfig } = useContext(
        AntdConfigProvider.ConfigContext,
    );

    const configProviderDom = useMemo(() => {
        return (
            <BizConfigContext.Provider value={{}}>
                {children}
            </BizConfigContext.Provider>
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

export type ConfigContextPropsType = {

};
export type BizConfigProviderProps = {
    children: React.ReactNode;
}
export const BizConfigProvider: React.FC<BizConfigProviderProps> = (props) => {
    return (
        <ProConfigProvider>
            <ConfigProviderContainer {...props} />
        </ProConfigProvider>
    );
};
BizConfigProvider.displayName = 'BizProvider';
export const BizProvider = BizConfigContext;
export default BizConfigContext;
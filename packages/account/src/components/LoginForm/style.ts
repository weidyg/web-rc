import type { GenerateStyle, BizAliasToken } from '@web-react/biz-components';
import { setAlpha, useStyle as useAntdStyle } from '@web-react/biz-components';

const genBizStyle: GenerateStyle<LoginFormToken> = (token) => {
  const loginBoxBlur = false;
  const isDarkMode = false;
  const opacity = loginBoxBlur ? (isDarkMode ? 0.65 : 0.25) : 0.98;
  return {
    [token.componentCls]: {
      '&-container': {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: 'fit-content',
        overflow: 'hidden',
        padding: `${token.paddingLG}px ${token.paddingLG * 2}px`,
        borderRadius: token.borderRadius,
        backgroundSize: '100%',
        backgroundPosition: 'top',
        backdropFilter: 'blur(10px)',
        backgroundImage: `radial-gradient(circle at 93% 1e+02%, ${setAlpha(token.colorPrimary, 0.17)} 0%, ${setAlpha(token.colorWhite, 0.05)} 23%, ${setAlpha(token.colorWhite, 0.03)} 87%, ${setAlpha(token.colorPrimary, 0.12)} 109%)`,
        backgroundColor: isDarkMode ? `${setAlpha('#000', opacity)}` : `${setAlpha('#fff', opacity)}`,
        boxShadow: `0px 0px 24px 0px ${isDarkMode ? `${setAlpha('#fff', 0.2)}` : `${setAlpha('#000', 0.1)}`}`,
      },
      '&-main': {
        display: 'flex',
        justifyContent: 'space-around',
      },
      '&-qrcode': {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'nowrap',
        alignItems: 'center',
        flexDirection: 'column'
      },
      '&-divider': {
        margin: `0 ${token.marginXXL}px`,
        borderRight: `1px solid ${token.colorBorder}`
      },
      '&-form': {
        minWidth: '320px',
        display: 'inline-grid',
        alignContent: 'space-around',
      },
      '&-tabs': {
        [`.${token.antPrefixCls}-tabs-tab`]: {
          padding: `${token.paddingXS}px 0`,
          fontSize: token.fontSizeLG,
        }
      },
      '&-agreement': {
        padding: `${token.marginXS}px 0 0 0`,
      },
      [`@media (max-width: ${token.screenMDMin}px)`]: {
        [`&-container`]: {
          padding: `${token.paddingLG}px`,
          borderRadius: '0px',
          width: '-webkit-fill-available',
          height: '-webkit-fill-available',
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
        },
        [`&-qrcode,&-divider`]: {
          display: 'none',
        },
      },
    },
  };
};
interface LoginFormToken extends BizAliasToken { }
export function useStyle(prefixCls?: string) {
  return useAntdStyle('LoginForm', (token) => {
    const bizToken: LoginFormToken = {
      ...token,
    };
    return [genBizStyle(bizToken)];
  }, prefixCls);
}

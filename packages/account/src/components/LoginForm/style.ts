import type { GenerateStyle, BizAliasToken } from '@web-react/biz-components';
import { useStyle as useAntdStyle } from '@web-react/biz-components';

const genBizStyle: GenerateStyle<LoginFormToken> = (token) => {
  const loginBoxBlur = true;
  const isDarkMode = false;
  const opacity = loginBoxBlur ? (isDarkMode ? 0.65 : 0.25) : 0.98;
  return {
    [token.componentCls]: {
      [`&-container`]: {
        overflow: 'hidden',
        padding: '24px 48px',
        borderRadius: token.borderRadius,
        backgroundSize: '100%',
        backgroundPosition: 'top',
        backdropFilter: 'blur(10px)',
        backgroundImage: 'radial-gradient(circle at 93% 1e+02%, rgba(22,119,255,0.17) 0%, rgba(255,255,255,0.05) 23%, rgba(255,255,255,0.03) 87%, rgba(22,119,255,0.12) 109%)',
        backgroundColor: isDarkMode ? `rgba(0, 0, 0,${opacity})` : `rgba(255, 255,255,${opacity})`,
        boxShadow: isDarkMode ? '0px 0px 24px 0px rgba(255,255,255,0.2)' : '0px 0px 24px 0px rgba(0,0,0,0.1)',
      },
      [`@media (max-width: ${token.screenMDMin}px)`]: {
        [`&-container`]: {
          padding: 24,
          boxShadow: 'none',
          borderRadius: '0px',
          display: 'flex',
          justifyContent: 'center',
          background: 'unset',
          overflow: 'unset',
          backdropFilter: 'unset',
        },
      },
      '&-main': {
        minWidth: '328px',
        maxWidth: '580px',
        margin: '0 auto',
        display: 'inline-grid',
        alignContent: 'space-around',
        '&-other': {
          marginBlockStart: '24px',
          lineHeight: '22px',
          textAlign: 'start',
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

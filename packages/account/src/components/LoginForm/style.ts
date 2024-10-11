import type { GenerateStyle, BizAliasToken } from '@web-react/biz-components';
import { useStyle as useAntdStyle } from '@web-react/biz-components';

const genBizStyle: GenerateStyle<LoginFormToken> = (token) => {
  return {
    [token.componentCls]: {
      display: 'flex',
      flex: '1',
      zIndex: 99,
      flexDirection: 'column',
      paddingInline: 0,
      paddingBlock: 32,
      alignItems: 'center',
      justifyContent: 'center',
      height: 'max-content',
      margin: 'auto',
      overflow: 'hidden',
      '&-main': {
        minWidth: '328px',
        maxWidth: '580px',
        margin: '0 auto',
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

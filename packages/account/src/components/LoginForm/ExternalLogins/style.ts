import type { GenerateStyle, BizAliasToken } from '@web-react/biz-components';
import { useStyle as useAntdStyle } from '@web-react/biz-components';

const genBizStyle: GenerateStyle<ExternalLoginsToken> = (token) => {
  return {
    [token.componentCls]: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      '&-title': {
        color: token.colorTextPlaceholder,
        fontWeight: 'normal',
        fontSize: 14,
      },
      '&-item': {
        width: 40,
        height: 40,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        borderRadius: '50%',
        // border: '1px solid ' + token.colorPrimaryBorder,
      },
    },
  };
};
interface ExternalLoginsToken extends BizAliasToken { }
export function useStyle(prefixCls?: string) {
  return useAntdStyle('ExternalLogins', (token) => {
    const bizToken: ExternalLoginsToken = {
      ...token,
    };
    return [genBizStyle(bizToken)];
  }, prefixCls);
}

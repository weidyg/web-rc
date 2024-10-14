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
        fontSize: token.fontSize
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
      '&-more': {
        fontSize: token.fontSizeLG,
        background: token.colorInfoBg,
        color: token.colorInfoText,
        border: `1px dashed ${token.colorInfoBorder}`,
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

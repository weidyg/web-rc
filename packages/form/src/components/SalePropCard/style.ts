import type { GenerateStyle, BizAliasToken } from '@web-react/biz-components';
import { setAlpha, useStyle as useAntdStyle } from '@web-react/biz-components';

const genBizStyle: GenerateStyle<SalePropCardToken> = (token) => {
  return {
    [token.componentCls]: {
      '&-group': {
        '&-wrapper': {
          width: '120px',
        },
        '&-item': {
          padding: '0px 4px',
          height: '32px !important',
          lineHeight: '32px !important',
        },
      },
      '&-checkbox': {
        padding: '4px 4px 4px 8px',
        width: '100px',
        boxSizing: 'border-box',
        borderRadius: token.borderRadius,
        backgroundColor: token.colorFillContent,
        '&-wrapper': {
          // width: '480px',
          // height: '320px',
          overflow: 'auto',
          padding: '8px',
          overlay: 'auto'
        },
        '&-text': {
          width: '56px',
        },
        '&-action': {
          color: token.colorPrimary,
          backgroundColor: token.colorPrimaryBg,
        },
        '&-hidden': {
          display: 'none',
          width: '0px',
          height: '0px',
        }
      }
    }
  };
};

interface SalePropCardToken extends BizAliasToken {

}
export function useStyle(prefixCls?: string) {
  return useAntdStyle(
    'BizSalePropCard',
    (token) => {
      const bizToken: SalePropCardToken = {
        ...token,
      };
      return [genBizStyle(bizToken)];
    },
    prefixCls,
  );
}

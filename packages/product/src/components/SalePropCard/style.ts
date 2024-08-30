import type { GenerateStyle, BizAliasToken } from '@web-react/biz-components';
import { setAlpha, useStyle as useAntdStyle } from '@web-react/biz-components';

const genBizStyle: GenerateStyle<SalePropCardToken> = (token) => {
  return {
    [token.componentCls]: {
      height: 'calc(100% - 1px)',
      display: 'flex',
      flexDirection: 'column',
      '&-header': {
        padding: '8px 16px !important',
        minHeight: 'unset !important',
        fontWeight: '500 !important',
        '&-selected': {
          display: 'inline-flex',
          width: '80px',
        }
      },
      '&-body': {
        overflow: 'hidden',
        padding: '0 !important',
        flex: 1
      },
      '&-group': {
        '&-wrapper': {
          width: '120px',
        },
        '&-menu': {
          width: '100%',
          height: '100%',
          overflow: 'auto',
        },
        '&-item': {
          padding: '0px 4px',
          height: '32px !important',
          lineHeight: '32px !important',
        },
      },
      '&-checkbox': {
        width: '100px',
        padding: '4px 4px 4px 8px',
        boxSizing: 'border-box',
        borderRadius: token.borderRadius,
        backgroundColor: token.colorFillContent,
        [`&:has(${token.antCls}-checkbox-checked:not(${token.antCls}-checkbox-disabled))`]: {
          backgroundColor: token.colorPrimaryBg,
        },
        [`&-only-checked:has(${token.antCls}-checkbox:not(${token.antCls}-checkbox-checked)),
          &-hidden`]: {
          display: 'none',
          width: '0px',
          height: '0px',
        },
        '&-empty': {
          width: '100px',
        },
        '&-wrapper': {
          padding: '8px',
        },
        '&-text': {
          width: '56px',
        },
      }
    }
  };
};

interface SalePropCardToken extends BizAliasToken {

}
export function useStyle(prefixCls?: string) {
  return useAntdStyle('SalePropCard', (token) => {
    const bizToken: SalePropCardToken = {
      ...token,
    };
    return [genBizStyle(bizToken)];
  }, prefixCls);
}

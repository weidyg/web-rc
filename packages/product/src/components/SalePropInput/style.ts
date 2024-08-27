import type { GenerateStyle, BizAliasToken } from '@web-react/biz-components';
import { setAlpha, useStyle as useAntdStyle } from '@web-react/biz-components';

const genBizStyle: GenerateStyle<SalePropInputToken> = (token) => {
  return {
    [token.componentCls]: {
      '&-img': {
        width: 'inherit !important',
        height: 'inherit !important',
        borderRadius: 'inherit',
        objectFit: 'contain',
        '&-wrap': {
          cursor: 'pointer',
          width: token.controlHeight,
          height: token.controlHeight,
          borderRadius: token.borderRadius,
          border: `1px solid ${token.colorBorder}`,
        },
        '&-content': {
          width: 'inherit',
          height: 'inherit',
          borderRadius: 'inherit',
        },
        '&-placeholder': {
          width: 'inherit',
          height: 'inherit',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: token.colorTextPlaceholder,
          '&:hover': {
            color: token.colorPrimaryHover,
          }
        },
        '&-empty': {
          border: `1px dashed ${token.colorBorder}`,
          '&:hover': {
            border: `1px dashed ${token.colorPrimaryHover}`,
          }
        }
      },
    },
  }
};
// repeating-linear-gradient(-45deg, transparent, transparent 6px, #f0f2f5 0, #f0f2f5 8px) !important;
interface SalePropInputToken extends BizAliasToken {

}
export function useStyle(prefixCls?: string) {
  return useAntdStyle('SalePropInput', (token) => {
    const bizToken: SalePropInputToken = {
      ...token,
    };
    return [genBizStyle(bizToken)];
  }, prefixCls,);
}

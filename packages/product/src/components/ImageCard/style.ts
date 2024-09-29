import type { GenerateStyle, BizAliasToken } from '@web-react/biz-components';
import { setAlpha, useStyle as useAntdStyle } from '@web-react/biz-components';
import { unit } from '@ant-design/cssinjs';

const genBizStyle: GenerateStyle<ImageCardToken> = (token) => {
  return {
    [token.componentCls]: {
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
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: token.colorTextPlaceholder,
        '&:hover': {
          color: token.colorPrimaryHover,
        },
        '&-icon': {
          fontSize: token.fontSizeLG,
        },
        '&-text': {
          overflow: 'hidden',
          marginTop: token.marginXS,
          fontSize: token.fontSizeSM,
        },
      },
      '&-empty': {
        border: `1px dashed ${token.colorBorder}`,
        '&:hover': {
          border: `1px dashed ${token.colorPrimaryHover}`,
        },
      },
      '&-img': {
        width: 'inherit !important',
        height: 'inherit !important',
        borderRadius: 'inherit',
        objectFit: 'contain',
        // backgroundColor: token.colorBgLayout,
      },
      [`&-mask-info`]: {
        padding: `0 ${unit(token.paddingXXS)}`,
        [token.antCls]: {
          marginInlineEnd: token.marginXXS,
          svg: {
            verticalAlign: 'baseline',
          },
        },
      },
    },
  };
};
// repeating-linear-gradient(-45deg, transparent, transparent 6px, #f0f2f5 0, #f0f2f5 8px) !important;
interface ImageCardToken extends BizAliasToken {}
export function useStyle(prefixCls?: string) {
  return useAntdStyle(
    'ImageCard',
    (token) => {
      const bizToken: ImageCardToken = {
        ...token,
      };
      return [genBizStyle(bizToken)];
    },
    prefixCls,
  );
}

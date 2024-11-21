import { unit } from '@ant-design/cssinjs';
import { generatStyles } from '@web-rc/biz-provider';

export const useStyles = generatStyles(({ token }) => {
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
        width:'inherit',
        height: 'inherit',
        borderRadius: 'inherit',
        overflow: 'hidden',
      },
      '&-img': {
        width: 'calc(100% - 2px) !important',
        height: 'calc(100% - 2px) !important',
        borderRadius: 'inherit',
        objectFit: 'contain',
      },
      '&-placeholder': {
        // width: 'inherit',
        height: 'inherit',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: token.colorTextPlaceholder,
        // '&:hover': {
        //   color: token.colorPrimaryHover,
        // },
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
        boxSizing: 'border-box',
        border: `1px dashed ${token.colorBorder}`,
        '&:hover': {
          border: `1px dashed ${token.colorPrimaryHover}`,
        },
      },
      [`&-mask`]: {
        borderRadius: 'inherit',
        padding: `0 ${unit(token.paddingXXS)}`,
        [`.${token.antPrefixCls}`]: {
          marginInlineEnd: token.marginXXS,
          svg: {
            verticalAlign: 'baseline',
          },
        },
      },
      '&-status': {
        '&-warning': {
          border: `1px solid ${token.colorWarning}`,
        },
        '&-error': {
          border: `1px solid ${token.colorError}`,
        },
      },
    },
  };
}, 'ImageCard');

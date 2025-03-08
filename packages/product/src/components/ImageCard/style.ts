import { unit } from '@ant-design/cssinjs';
import { generatStyles } from '@web-rc/biz-provider';

export const useStyles = generatStyles(({ token }) => {
  return {
    [token.componentCls]: {
      borderRadius: 'inherit',
      overflow: 'hidden',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      '&-wrap': {
        cursor: 'pointer',
        width: 'fit-content',
        height: 'fit-content',
        borderRadius: token.borderRadius,
        border: `1px solid ${token.colorBorder}`,
        overflow: 'hidden',
      },
      '&-img,&-placeholder': {
        width: token.controlHeight,
        height: token.controlHeight,
      },
      '&-img': {
        borderRadius: 'inherit',
        objectFit: 'contain',
      },
      '&-placeholder': {
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
        [`&-info`]: {
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          padding: `0 ${unit(token.paddingXXS)}`,
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

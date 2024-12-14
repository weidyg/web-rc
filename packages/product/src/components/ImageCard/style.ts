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
        width: token.controlHeight,
        height: token.controlHeight,
        borderRadius: token.borderRadius,
        border: `1px solid ${token.colorBorder}`,
      },
      '&-img': {
        width: '100%',
        height: '100%',
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
        // padding: `0 ${unit(token.paddingXXS)}`,

        // width: '100%',
        // height: '100%',
        // position: 'relative',
        // inset: '0',
        // display: 'flex',
        // alignItems: 'center',
        // justifyContent: 'center',
        // color: token.colorWhite,
        // background: token.colorBgMask,
        // cursor: 'pointer',
        // transition: 'opacity 0.3s',
        // opacity: 0,
        // [`&:hover`]: {
        //   opacity: 1,
        // },
        [`&-info`]: {
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          padding: `0 ${unit(token.paddingXXS)}`,
        },
        // [`.${token.antPrefixCls}-mask-info`]: {
        //   marginInlineEnd: token.marginXXS,
        //   svg: {
        //     verticalAlign: 'baseline',
        //   },
        // },
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

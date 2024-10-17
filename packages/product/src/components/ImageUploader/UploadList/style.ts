import { generatStyles } from "@web-react/biz-provider";

export const useStyles = generatStyles(({ token }) => {
  return {
    [token.componentCls]: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      '&-files': {
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
        flex: 'auto',
        padding: `${token.paddingXS}px 0`,
      },
      '&-item': {
        display: 'flex',
        alignItems: 'center',
        color: token.colorText,
        fontSize: token.fontSize,
        lineHeight: token.lineHeight,
        fontFamily: token.fontFamily,
        background: token.colorBgContainer,
        padding: `${token.paddingXS}px 0`,
        borderBottom: `${token.lineWidth}px ${token.lineType} ${token.colorBorderSecondary}`,
        // '&:last-child': {
        //   marginBottom: 0,
        // },
        '&-img, &-img img': {
          width: '36px !important',
          height: '36px !important',
          objectFit: 'contain',
          borderRadius: token.borderRadius,
          background: token.colorBgLayout,
        },
        '&-name': {
          width: '40%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: `0 ${token.paddingSM}px`,
        },
        '&-desc': {
          flexShrink: 0,
          color: token.colorTextSecondary,
          fontSize: token.fontSizeSM,
        },
        '&-state': {
          flex: '1 1',
          width: '30%',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
        },
      },
      '&-actions': {
        display: 'flex',
        alignItems: 'center',
        '&-container': {
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        },
      },
    },
  };
}, 'UploadList');
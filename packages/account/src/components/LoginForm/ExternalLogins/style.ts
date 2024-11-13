import { generatStyles } from '@web-rc/biz-provider';

export const useStyles = generatStyles(({ token }) => {
  return {
    [token.componentCls]: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      '&-title': {
        color: token.colorTextPlaceholder,
        fontWeight: 'normal',
        fontSize: token.fontSize,
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
}, 'ExternalLogins');

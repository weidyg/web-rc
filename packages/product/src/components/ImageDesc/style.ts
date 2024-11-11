import { generatStyles } from '@web-react/biz-provider';

export const useStyles = generatStyles(({ token }) => {
  return {
    [token.componentCls]: {
      width: '796px',
      display: 'flex',
      justifyContent: 'space-between',
      borderRadius: token.borderRadiusLG,
      backgroundColor: token.colorBgLayout,
      padding: `${token.padding}px ${token.paddingSM}px ${token.paddingSM}px`,
      '&-preview': {
        width: '420px',
        padding: `${token.paddingSM}px ${token.paddingXS}px`,
        boxSizing: 'border-box',
        borderRadius: token.borderRadiusLG,
        overflow: 'hidden',
        [`${token.componentCls}-header`]: {
          width: '390px',
          height: '20px',
          marginBottom: token.marginMD,
        },
      },
      '&-operate': {
        position: 'relative',
        boxSizing: 'border-box',
        overflow: 'hidden',
        transition: 'all .4s',
        '&-imgs': {
          width: '394px',
          height: '672px',
          overflow: 'auto',
          border: 'none',
          paddingLeft: token.paddingXXS,
          marginTop: token.marginSM,
          borderRadius: token.borderRadiusLG * 2,
        },
        [`${token.componentCls}-header`]: {
          width: '100%',
          height: '36px',
          paddingRight: `${token.padding}px`,
          boxSizing: 'border-box',
        },
      },

      '&-content': {
        width: '380px',
        height: '672px',
        textAlign: 'center',
        borderRadius: token.borderRadiusLG,
        backgroundColor: token.colorBgContainer,
      },
      '&-banner': {
        boxSizing: 'border-box',
        img: {
          width: '210px',
          height: '38px',
        },
      },
      '&-header': {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        '&-left': {
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          '&-title': {
            lineHeight: '20px',
            fontSize: token.fontSize,
            color: token.colorTextSecondary,
          },
          '&-desc': {
            marginLeft: token.marginXS,
            fontSize: token.fontSizeSM,
            color: token.colorTextDescription,
          },
        },
      },
    },
  };
}, 'ImageDesc');

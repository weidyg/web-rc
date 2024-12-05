import { generatStyles } from '@web-rc/biz-provider';

export const useStyles = generatStyles(({ token }) => {
  return {
    [token.componentCls]: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: 'fit-content',
      ['&-img']: {
        position: 'relative',
        cursor: 'pointer',
        overflow: 'hidden',
        borderRadius: '50%',
        border: `1px solid ${token.colorBorder}`,
        boxShadow: token.boxShadow,
        ['&-bg']: {
          width: '100%',
          borderRadius: '50%',
          transitionProperty: 'transform',
          transitionTimingFunction: token.motionEaseInOut,
        },
        ['&-tip']: {
          position: 'absolute',
          bottom: '12px',
          left: 0,
          zIndex: 10,
          display: 'block',
          height: '28px',
          width: '100%',
          textAlign: 'center',
          lineHeight: '30px',
          fontSize: token.fontSizeSM,
          color: token.colorWhite
        },
      }
    },
  };
}, 'SliderRotateCaptcha');

import { generatStyles } from '@web-rc/biz-provider';

export const useStyles = generatStyles(({ token }) => {
  return {
    [token.componentCls]: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      ['&-img']: {
        width: '100%',
        borderRadius: '50%',
        transitionProperty: 'transform',
        transitionTimingFunction: token.motionEaseInOut,

        ['&-wrapper']: {
          position: 'relative',
          cursor: 'pointer',
          overflow: 'hidden',
          borderRadius: '50%',
          border: `1px solid ${token.colorBorder}`,
          boxShadow: `0 0 transparent,0 0 transparent,0 4px 6px -1px rgba(0,0,0,.1),0 2px 4px -2px rgba(0,0,0,.1)`,
        },
        ['&-tip']: {
          position: 'absolute',
          bottom: '.75rem',
          left: 0,
          zIndex: 10,
          display: 'block',
          height: '1.75rem',
          width: '100%',
          textAlign: 'center',
          fontSize: '0.75rem',
          lineHeight: '30px',
          color: token.colorWhite
        },
      }
    },
  };
}, 'SliderRotateCaptcha');

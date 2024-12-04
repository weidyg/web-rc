import { generatStyles } from '@web-rc/biz-provider';

export const useStyles = generatStyles(({ token }) => {
  return {
    [token.componentCls]: {
      width: 'fit-content',
      [`&-img`]: {
        background: 'rgba(0, 0, 0, 0.08)',
        position: 'relative',
        overflow: 'hidden',
        [`&-bg,&-jp`]: {
          top: 0,
          left: 0,
          position: 'absolute',
          margin: '0 auto',
          userSelect: 'none',
          msUserSelect: 'none',
          WebkitUserSelect: 'none',
          MozUserSelect: 'none',
          WebkitTouchCallout: 'none',
        },
        [`&-jp`]: {
          transitionProperty: 'left',
          transitionTimingFunction: token.motionEaseInOut,
        },
      },
    },
  };
}, 'SliderPuzzleCaptcha');

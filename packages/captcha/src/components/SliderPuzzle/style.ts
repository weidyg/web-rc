import { generatStyles } from '@web-rc/biz-provider';

export const useStyles = generatStyles(({ token }) => {
  return {
    [token.componentCls]: {
      [`&-img`]: {
        [`&-wrapper`]: {
          background: 'rgba(0, 0, 0, 0.08)',
          position: 'relative',
          overflow: 'hidden',
        },
      },
      [`&-bgimg,&-jpimg`]: {
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
      [`&-jpimg`]: {
        transitionProperty: 'left',
        transitionTimingFunction: token.motionEaseInOut,
      },
    },
  };
}, 'SliderPuzzleCaptcha');

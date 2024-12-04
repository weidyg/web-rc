import { generatStyles } from '@web-rc/biz-provider';

export const useStyles = generatStyles(({ token }) => {
  return {
    [token.componentCls]: {
      [`.transition-left`]: {
        left: '0 !important',
        transition: 'left .3s cubic-bezier(.4,0,.2,1)',
      },
    },
  };
}, 'SliderPuzzleCaptcha');

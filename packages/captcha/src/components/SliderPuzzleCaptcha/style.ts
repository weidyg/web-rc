import { generatStyles } from '@web-rc/biz-provider';

export const useStyles = generatStyles(({ token, isDark, setAlpha }) => {
  return {
    [token.componentCls]: {},
  };
}, 'SliderPuzzleCaptcha');

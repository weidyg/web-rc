import { generatStyles } from '@web-rc/biz-provider';

export const useStyles = generatStyles(({ token }) => {
  return {
    [token.componentCls]: {},
  };
}, 'PointSelectionCaptcha');

import { generatStyles } from "@web-react/biz-provider";

export const useStyles = generatStyles(({ token }) => {
  return {
    [token.componentCls]: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'nowrap',
      alignItems: 'center',
      flexDirection: 'column'
    },
  };
}, 'QrcodeLogin');
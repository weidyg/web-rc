import { generatStyles } from "@web-react/biz-provider";

const useStyles = generatStyles(({ token }) => {
  return {
    [token.componentCls]: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      height: 180,
    },
  };
}, 'CurrentAccount')
export default useStyles;
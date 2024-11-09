import { generatStyles } from '@web-react/biz-provider';

export const useStyles = generatStyles(({ token }) => {
  return {
    [token.componentCls]: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      '&-config': {
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        marginBottom: token.marginXXS,
        [`.${token.antPrefixCls}-form-item`]: {
          padding: '4px 0',
          display: 'flex',
          flexWrap: 'nowrap',
          alignItems: 'center',
        },
      },
      '&-board': {
        height: '100%',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        cursor: 'pointer',
        '&-tips': {
          marginTop: '18px',
          marginRight: '0',
          marginBottom: '0',
          marginLeft: '0',
          fontWeight: '400',
          color: token.colorTextSecondary,
        },
        '&-format': {
          marginTop: '14px',
          marginRight: '0',
          marginBottom: '0',
          marginLeft: '0',
          fontWeight: '400',
          color: token.colorTextDescription,
        },
      },
    },
  };
}, 'DraggerUpload');

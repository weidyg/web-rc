import type { GenerateStyle, BizAliasToken } from '@web-react/biz-components';
import { setAlpha, useStyle as useAntdStyle } from '@web-react/biz-components';

const genBizStyle: GenerateStyle<DraggerUploadToken> = (token) => {
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
        [`${token.antCls}-form-item`]: {
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
};

interface DraggerUploadToken extends BizAliasToken {
}
export function useStyle(prefixCls?: string) {
  return useAntdStyle('DraggerUpload', (token) => {
    const bizToken: DraggerUploadToken = {
      ...token,
    };
    return [genBizStyle(bizToken)];
  }, prefixCls);
}

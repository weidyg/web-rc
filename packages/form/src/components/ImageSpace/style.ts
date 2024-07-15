import type { GenerateStyle, ProAliasToken } from '@ant-design/pro-components';
import { useStyle as useAntdStyle } from '@ant-design/pro-components';

export interface ImageSpaceToken extends ProAliasToken {
  componentCls: string;
}

const genProStyle: GenerateStyle<ImageSpaceToken> = (token) => {
  return {
    [token.componentCls]: {
      '&-container': {

      },
      '&-header': {

      },
      '&-body': {
        '&-aside': {
        },
        '&-dashboard': {
          '&-headSearch': {
          },
        },
      },
      '&-footer': {
        width: '100%',
        height: '60px',
        backgroundColor: '#fff',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        '&-selectOk': {
          height: '36px',
          width: '107px',
          borderRadius: '18px',
          marginRight: '25px',
        }
      }
    },
  };
};

export function useStyle(prefixCls: string) {
  return useAntdStyle('BizImageSpace', (token) => {
    const imageSpaceToken: ImageSpaceToken = {
      ...token,
      componentCls: `.${prefixCls}`,
    };
    return [genProStyle(imageSpaceToken)];
  });
}

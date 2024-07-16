import type { GenerateStyle, ProAliasToken } from '@ant-design/pro-components';
import { useStyle as useAntdStyle } from '@ant-design/pro-components';

export interface ImageSpaceToken extends ProAliasToken {
  componentCls: string;
}

const genProStyle: GenerateStyle<ImageSpaceToken> = (token) => {
  return {
    [token.componentCls]: {
      display: 'flex',
      width: '100%',
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      flexDirection: 'column',
      overflowX: 'auto',

      '&-header': {

      },
      '&-body': {
        display: 'flex',
        flex: '1 1',
        overflowY: 'hidden',
        padding: '0 15px',
        '&-aside': {
          width: '158px',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: '12px',
          boxSizing: 'border-box',
          position: 'relative',
          overflow: 'hidden',
          background: 'rgba(247, 248, 250, 0.5)',
          padding: '6px 6px 0',
          height: '100%',
          flexShrink: 0
        },
        '&-treeDom': {
          flex: '1 1',
          overflowY: 'scroll',
          overflowX: 'scroll',
          padding: '0 8px 0 6px',
          maxHeight: 'calc(100% - 1px)',
          '&::-webkit-scrollbar': {
            width: '7.5px',
            height: ' 7.5px',
            borderRadius: '6px',
          },
          '&::-webkit-scrollbar-thumb': {
            width: '7.5px',
            height: '7.5px',
            borderRadius: '6px',
            '&:hover': {
              backgroundColor: '#dcdcdc',
            }
          },
          '&::-webkit-scrollbar-track': {
            background: 'transparent',
            padding: '0',
            width: '4px',
            height: '4px',
            borderRadius: '6px',
          }
        },
        '&-dashboard': {
          padding: '6px 0 0 24px',
          boxSizing: 'border-box',
          maxHeight: '100vh',
          height: '100%',
          flex: '1 1 auto',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          minWidth: '685px',

          '&-header': {
            margin: '5px 0 8px',
            height: '35px',
            display: 'flex',
            '&-actions': {
              display: 'flex',
              flexShrink: 0,
              width: '100%',
              height: '30px',
              alignItems: 'center',
              transform: 'translateX(-8px)',
              '&-left': {
                flex: '1 1',
                display: 'flex',
                alignItems: 'center',
                marginRight: '8px',
              },
              '&-right': {
                height: '30px'
              },
            },
          },
          '&-list': {
            boxSizing: 'border-box',
            height: '100%',
            overflowY: 'auto',
            '&-document': {
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between'
            }
          },
          '&-table': {
            boxSizing: 'border-box',
            padding: '5px 0 0',
            marginTop: '9px',
            overflow: 'hidden',
            WebkitUserSelect: 'none',
            MozUserSelect: 'none',
            userSelect: 'none'
          }
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

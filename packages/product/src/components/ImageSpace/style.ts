import type { GenerateStyle, BizAliasToken } from '@web-react/biz-components';
import { setAlpha, useStyle as useAntdStyle } from '@web-react/biz-components';

const genBizStyle: GenerateStyle<ImageSpaceToken> = (token) => {
  return {
    [token.componentCls]: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      border: `1px solid ${token.colorBorderSecondary}`,
      borderRadius: token.borderRadius,
      backgroundColor: token.colorBgPage,
      '&-header': {
        display: 'flex',
      },
      '&-body': {
        display: 'flex',
        flex: 1,
        overflow: 'hidden',
      },
      '&-aside': {
        display: 'flex',
        width: '158px',
        overflow: 'hidden',
        padding: '6px 6px 0',
        backgroundColor: token.colorBgSide,
      },
      '&-treeDom': {
        flex: '1 1',
        overflow: 'auto',
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
            backgroundColor: token.colorBorder,
          },
        },
        '&::-webkit-scrollbar-track': {
          background: 'transparent',
          padding: '0',
          width: '4px',
          height: '4px',
          borderRadius: '6px',
        },
        [`${token.antCls}-tree`]: {
          padding: '6px 0',
          [`&-switcher`]: {
            width: 'unset',
            '&:hover': {
              background: 'transparent !important',
            }
          },
          [`&-node-content-wrapper`]: {
            '&:hover': {
              background: 'transparent !important',
            }
          },
          [`&-treenode`]: {
            margin: '2px 6px',
            padding: '4px 2px',
            overflow: 'hidden',
            [`&-selected`]: {
              background: token.controlItemBgActive,
              borderRadius: token.borderRadius,
            },
            '&:hover': {
              background: token.controlItemBgActive,
              borderRadius: token.borderRadius,
            }
          },
        },
      },
      '&-container': {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        backgroundColor: token.colorBgContainer,
        '&-top': {
          display: 'flex',
          height: '35px',
        },
        '&-list': {
          display: 'flex',
          flex: 1,
          overflow: 'auto',
        },
      },
      '&-footer': {
        display: 'flex',
        width: '100%',
        height: '60px',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: token.colorBgFooter,
      },
      '&-spin': {
        height: '100%',
        [`${token.antCls}-spin-container`]: {
          height: '100%',
        }
      }
    },
  };
};

interface ImageSpaceToken extends BizAliasToken {
  colorBgPage: string;
  colorBgFooter: string;
  colorBgSide: string;
}
export function useStyle(prefixCls?: string) {
  return useAntdStyle('ImageSpace', (token) => {
    const bizToken: ImageSpaceToken = {
      ...token,
      colorBgPage: token.colorBgElevated,
      colorBgSide: token.colorBgLayout,
      colorBgFooter: token.colorBgElevated,
    };
    return [genBizStyle(bizToken)];
  }, prefixCls);
}

import type { GenerateStyle, BizAliasToken } from '@web-react/biz-components';
import { setAlpha, useStyle as useAntdStyle } from '@web-react/biz-components';

const genBizStyle: GenerateStyle<FolderToken> = (token) => {
  return {
    [token.componentCls]: {
      height: '100%',
      [`${token.antCls}-tree`]: {
        padding: '6px 0',
        [`&-switcher`]: {
          width: 'unset',
          '&:hover': {
            background: 'transparent !important',
          },
        },
        [`&-node-content-wrapper`]: {
          '&:hover': {
            background: 'transparent !important',
          },
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
          },
        },
      },
      '&-select': {
        width: '100%',
        marginBottom: '4px',
      },
      ['&-tree,&-empty']: {
        height: `calc(100% - ${token.controlHeight}px)`,
        overflow: 'auto',
      },
      '&-empty': {
        display: 'flex',
        alignItems: 'center',
      },
      '&-spin': {
        flex: 1,
        display: 'flex',
        overflow: 'hidden',
        [`${token.antCls}-spin-container`]: {
          height: '100%',
          width: '100%',
        },
      },
    },
  };
};

interface FolderToken extends BizAliasToken {}
export function useStyle(prefixCls?: string) {
  return useAntdStyle(
    'Folder',
    (token) => {
      const bizToken: FolderToken = {
        ...token,
      };
      return [genBizStyle(bizToken)];
    },
    prefixCls,
  );
}

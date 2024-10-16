import { generatStyles } from '@web-react/biz-components';

const useStyles = generatStyles(({ token }) => {
  return {
    [token.componentCls]: {
      height: '100%',
      [`.${token.antPrefixCls}-tree`]: {
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
        [`.${token.antPrefixCls}-spin-container`]: {
          height: '100%',
          width: '100%',
        },
      },
    },
  };
}, 'Folder')
export default useStyles;


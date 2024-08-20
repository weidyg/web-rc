import type { GenerateStyle, BizAliasToken } from '@web-react/biz-components';
import { setAlpha, useStyle as useAntdStyle } from '@web-react/biz-components';

const genBizStyle: GenerateStyle<BizImageSpaceToken> = (token) => {
  return {
    [token.componentCls]: {
      // position: 'absolute',
      // top: 0,
      // right: 0,
      // bottom: 0,
      // left: 0,
      width: '100%',
      height: '100%',
      display: 'flex',
      overflowX: 'auto',
      flexDirection: 'column',
      border: `1px solid ${token.colorBorderSecondary}`,
      borderRadius: token.borderRadius,
      backgroundColor: token.colorBgPage,
      '&-header': {},
      '&-body': {
        display: 'flex',
        flex: '1 1',
        overflowY: 'hidden',
      },
      '&-footer': {
        width: '100%',
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: token.colorBgFooter,
        '&-left': {
          display: 'flex',
          alignItems: 'center',
          margin: '0 24px'
        },
        '&-right': {
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'row-reverse',
          margin: '0 24px'
        },
      },
      '&-aside': {
        width: '158px',
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
        position: 'relative',
        overflow: 'hidden',
        padding: '6px 6px 0',
        // height: '100%',
        flexShrink: 0,
        backgroundColor: token.colorBgSide,
      },
      '&-treeDom': {
        flex: '1 1',
        overflow: 'auto',
        // padding: '0 8px 0 6px',
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
      '&-uploader': {
        '&-container': {
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          borderRadius: '12px',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: token.colorBgContainer,
        },
        '&-body': {
          height: 'calc(100% - 65px)',
          flex: '1 1',
        },
        '&-panel': {
          padding: '8px 21px 0',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          '&-form': {
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            flexWrap: 'nowrap',
          },
          '&-config': {
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            '&-item': {
              margin: 0,
              padding: '4px 0',
              display: 'flex',
              flexWrap: 'nowrap',
              alignItems: 'center',
            },
          },
          '&-board': {
            height: '100%',
            width: '100%',
            marginTop: '9px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            cursor: 'pointer',
          },
          '&-btn': {
            height: '48px',
            padding: '0 18px',
          },
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
        '&-list': {
          display: 'flex',
          flex: '1 1',
          width: '100%',
          height: '100%',
          flexDirection: 'column',
          paddingBottom: '20px',
          '&-container': {
            display: 'none',
            flex: '1 1',
            height: 'calc(100% - 65px)',
            flexDirection: 'column',
          },
          '&-files': {
            display: 'flex',
            marginTop: '12px',
            flexDirection: 'column',
            width: '100%',
            height: 'calc(100% - 118px)',
            overflowY: 'scroll',
            // overflowY: 'overlay'
          },
          '&-item': {
            display: 'flex',
            alignItems: 'center',
            borderRadius: '9px',
            marginBottom: '12px',
            '&:last-child': {
              marginBottom: 0,
            },
            '&-img': {
              backgroundColor: '#f7f8fa',
              borderRadius: '12px',
              flexShrink: 0,
              height: '48px',
              width: '48px',
              img: {
                width: '100%',
                height: '100%',
                objectFit: 'contain',
              },
            },
            '&-content': {
              width: '40%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              marginLeft: '12px',
              height: '100%',
              overflow: 'hidden',
              flexShrink: 0,
            },
            '&-name': {
              fontWeight: '500',
              color: '#333',
              flex: '1 1',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              whiteSpace: 'break-all',
              WebkitLineClamp: '2',
              WebkitBoxOrient: 'vertical',
            },
            '&-desc': {
              flexShrink: 0,
              color: '#999',
            },
            '&-state': {
              flex: '1 1',
              width: '30%',
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
            },
          },
          '&-actions': {
            '&-wrap': {
              marginTop: '20px',
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            },
            display: 'flex',
            alignItems: 'center',
          },
        },
      },
    },
  };
};

interface BizImageSpaceToken extends BizAliasToken {
  colorBgPage: string;
  colorBgFooter: string;
  colorBgDashboard: string;
  colorBgPicCard: string;
  colorBgSide: string;
  colorControlText: string;
}
export function useStyle(prefixCls?: string) {
  return useAntdStyle(
    'BizImageSpace',
    (token) => {
      const bizToken: BizImageSpaceToken = {
        ...token,
        colorBgPage: token.colorBgElevated,
        colorBgFooter: token.colorBgElevated,
        colorBgDashboard: token.colorBgContainer,
        colorBgPicCard: token.colorBgLayout,
        colorBgSide: token.colorBgLayout,
        colorControlText: token.colorWhite,
      };
      return [genBizStyle(bizToken)];
    },
    prefixCls,
  );
}

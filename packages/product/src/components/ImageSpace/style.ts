import type { GenerateStyle, BizAliasToken } from '@web-react/biz-components';
import { setAlpha, useStyle as useAntdStyle } from '@web-react/biz-components';

const genBizStyle: GenerateStyle<ImageSpaceToken> = (token) => {
  return {
    [token.componentCls]: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      height: '100%',
      minWidth: 'fit-content',
      overflow: 'hidden',
      border: `1px solid ${token.colorBorderSecondary}`,
      borderRadius: token.borderRadius,
      backgroundColor: token.colorBgPage,
      '&-header': {
        display: 'flex',
      },
      '&-body': {
        flex: 1,
        display: 'flex',
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
        // flex: '1 1',
        overflow: 'auto',
        height: '100%',
        // maxHeight: 'calc(100% - 1px)',
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
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: token.colorBgContainer,
        padding: '0 0 0 8px',
        '&-top': {
          display: 'flex',
          height: '38px',
          padding: '6px 6px 6px 0',
        },
        '&-list': {
          // flex: 1,
          width: '100%',
          height: '100%',
          display: 'flex',
          overflow: 'auto',
          '&-content': {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            // margin: '8px 8px 0 8px'
          }
        },
        '&-table': {
          // flex: 1,
          width: '100%',
          height: '100%',
          display: 'flex',
          overflow: 'hidden',
          flexDirection: 'column',
          boxSizing: 'border-box',
          color: token.colorText,
          fontSize: token.fontSize,
          lineHeight: token.lineHeight,
          fontFamily: token.fontFamily,
          background: token.colorBgContainer,
          borderTop: `${token.lineWidth}px ${token.lineType} ${token.colorBorderSecondary}`,
          // borderRadius: `${token.borderRadius}px ${token.borderRadius}px 0 0`,
          [`
            &-header > tr > th,
            &-body > tr > td
          `]: {
            padding: '8px 0',
          },
          '&-header': {
            display: 'flex',
            ['tr']: {
              ['th']: {
                position: 'relative',
                textAlign: 'start',
                color: token.colorText,
                background: token.colorBgContainer,
                fontWeight: token.fontWeightStrong,
                borderBottom: `${token.lineWidth}px ${token.lineType} ${token.colorBorderSecondary}`,
                transition: 'background 0.2s ease'
              }
            }
          },
          '&-body': {
            flex: 1,
            // display: 'flex',
            overflow: 'auto',
            ['tr']: {
              ['td']: {
                transition: `background 0.2s,border-color 0.2s`,
                borderBottom: `${token.lineWidth}px ${token.lineType} ${token.colorBorderSecondary}`,
              }
            }
          },
        }
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
        flex: 1,
        display: 'flex',
        overflow: 'hidden',
        [`${token.antCls}-spin-container`]: {
          height: '100%',
          width: '100%',
        }
      },
      '&-fileName': {
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        alignContent: 'center',
        '&-checkbox': {
          marginRight: '10px',
        },
        '&-img, &-img img': {
          cursor: 'pointer',
          width: '36px !important',
          height: '36px !important',
          objectFit: 'contain',
          borderRadius: '6px',
          background: token.colorBgLayout,
        },
        '&-title': {
          maxWidth: '105px',
          marginLeft: '10px',
          'p': {
            display: 'inline',
            textAlign: 'center',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }
        }
      },
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

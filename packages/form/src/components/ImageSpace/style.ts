import type { GenerateStyle, BizAliasToken } from '@web-react/biz-components';
import { setAlpha, useStyle as useAntdStyle } from '@web-react/biz-components';

const genBizStyle: GenerateStyle<BizImageSpaceToken> = (token) => {
  return {
    [token.componentCls]: {
      display: 'flex',
      width: '100%',
      overflowX: 'auto',
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      flexDirection: 'column',
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
        height: '100%',
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
      '&-dashboard': {
        // padding: '6px 0 0 24px',
        boxSizing: 'border-box',
        maxHeight: '100vh',
        height: '100%',
        flex: '1 1 auto',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        minWidth: '685px',
        position: 'relative',
        backgroundColor: token.colorBgDashboard,

        '&-header': {
          margin: '12px 12px 8px 24px',
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
              height: '30px',
            },
          },
        },
        '&-list': {
          marginLeft: '18px',
          boxSizing: 'border-box',
          height: '100%',
          '&-document': {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          },
        },
        '&-table': {
          marginLeft: '18px',
          boxSizing: 'border-box',
          overflow: 'hidden',
          WebkitUserSelect: 'none',
          MozUserSelect: 'none',
          userSelect: 'none',
        },
      },
      '&-mask': {
        display: 'flex',
        flexGrow: 1,
        flexBasis: '100%',
        position: 'absolute',
        background: setAlpha(token.colorBgLayout, 0.3),
        zIndex: 1,
        width: '100%',
        height: '100%',
        justifyItems: 'center',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
      },

      '&-picCard': {
        position: 'relative',
        width: '122px',
        height: '153px',
        margin: '10px 12px 0 0',
        '&&-empty': {
          visibility: 'hidden',
          height: '0px',
        },

        '&:hover': {
          [token.componentCls]: {
            '&-picCard': {
              '&-checkbox': {
                display: 'flex !important;',
              },
              '&-spec': {
                display: 'none !important;',
              },
              '&-copy': {
                display: 'block !important;',
              },
            },
          },
        },
        '&-background': {
          height: '120px',
          width: '120px',
          borderRadius: '12px',
          position: 'relative',
          display: 'inline-block',
          backgroundColor: token.colorBgPicCard,
          backgroundSize: 'contain',
          textAlign: 'center',
        },
        '&-imgBox': {
          verticalAlign: 'middle',
          display: 'table-cell',
          position: 'relative',
          textAlign: 'center',
          width: '120px',
          height: '120px',
          borderRadius: '8px',
          overflow: 'hidden',
          '&:hover': {
            [token.componentCls]: {
              '&-pic': {
                '&-ai-entry': {
                  display: 'inline-flex !important',
                },
              },
            },
          },
          'img': {
            maxHeight: '120px',
            maxWidth: '120px',
          },
        },
        '&-checkbox': {
          display: 'none',
          position: 'absolute',
          top: '8px',
          right: '8px',
          '&.checked': {
            display: 'flex',
          },
        },
        '&-ai-entry': {
          display: 'none',
          position: 'absolute',
          width: '70px',
          height: '20px',
          color: '#eaeaea',
          backgroundColor: token.colorBgMask,
          top: '12px',
          left: '8px',
          borderRadius: '5px',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: '1000',
        },
        '&-controlWrap': {
          display: 'flex',
          alignItems: 'center',
          padding: '0 8px',
          position: 'absolute',
          left: '0',
          top: '84px',
          borderRadius: '0 0 12px 12px',
          width: '100%',
          height: '36px',
          backgroundImage: `linear-gradient(
          180deg, 
          ${setAlpha(token.colorTextBase, 0.05)}, 
          ${setAlpha(token.colorTextBase, 0.3)}
          )`,
          boxSizing: 'border-box',
          WebkitBoxSizing: 'border-box',
        },
        '&-spec': {
          height: '14px',
          width: '30px',
          fontSize: `${token.fontSize}px`,
          fontWeight: '400',
          letterSpacing: '0',
          lineHeight: '14px',
          color: token.colorControlText,
        },
        '&-copy': {
          display: 'none',
          marginRight: '8px',
          cursor: 'pointer',
          color: token.colorControlText,
        },
        '&-fullView': {
          marginLeft: 'auto',
          cursor: 'pointer',
          color: token.colorControlText,
        },
        '&-title': {
          '&-wrap': {
            display: 'inline-flex',
            width: '108px',
            alignItems: 'center',
            justifyContent: 'center',
          },
          '&-svg': {
            flexShrink: 0,
            height: '16px',
            width: '16px',
            cursor: 'pointer',
          },
          '&-tip': {
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            cursor: 'pointer',
            fontSize: `${token.fontSizeSM}px`,
            fontWeight: '400',
            color: token.colorText,
            height: '18px',
            lineHeight: '18px',
            margin: '0 4px',
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
            height: 'calc(100vh - 65px)',
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

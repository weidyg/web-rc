import type { GenerateStyle, BizAliasToken } from '@web-react/biz-components';
import { setAlpha, useStyle as useAntdStyle } from '@web-react/biz-components';

const genBizStyle: GenerateStyle<PicPanelToken> = (token) => {
  return {
    [token.componentCls]: {
      display: 'flex',
      flex: '1 1 auto',
      flexDirection: 'column',
      overflow: 'hidden',
      minWidth: 'min-content',
      // height: '100%',
      // position: 'relative',
      // boxSizing: 'border-box',
      // padding: '6px 0 0 24px',
      backgroundColor: token.colorBgPicPanel,

      '&-header': {
        margin: '12px 12px 8px 24px',
        height: '35px',
        display: 'flex',
        zIndex: 1,
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
      '&-mask': {
        flexGrow: 1,
        flexBasis: '100%',
        position: 'absolute',
        width: '-webkit-fill-available',
        height: '-webkit-fill-available',
        display: 'flex',
        alignItems: 'center',
        justifyItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        zIndex: 100,
        background: setAlpha(token.colorBgLayout, 0.5),
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

interface PicPanelToken extends BizAliasToken {
  colorBgPicPanel: string;
}
export function useStyle(prefixCls?: string) {
  return useAntdStyle('PicPanel', (token) => {
    const bizToken: PicPanelToken = {
      ...token,
      colorBgPicPanel: token.colorBgContainer,
    };
    return [genBizStyle(bizToken)];
  }, prefixCls);
}

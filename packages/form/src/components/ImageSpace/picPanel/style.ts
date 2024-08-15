import type { GenerateStyle, BizAliasToken } from '@web-react/biz-components';
import { setAlpha, useStyle as useAntdStyle } from '@web-react/biz-components';

const genBizStyle: GenerateStyle<PicPanelToken> = (token) => {
  return {
    [token.componentCls]: {
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
      backgroundColor: token.colorBgPicPanel,

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
      '&-mask': {
        display: 'flex',
        flexGrow: 1,
        flexBasis: '100%',
        position: 'absolute',
        background: setAlpha(token.colorBgLayout, 0.5),
        zIndex: 1,
        width: '100%',
        height: '100%',
        justifyItems: 'center',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
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
  },
    prefixCls,
  );
}

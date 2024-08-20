import { Keyframes } from '@ant-design/cssinjs';
import type { GenerateStyle, BizAliasToken } from '@web-react/biz-components';
import { setAlpha, useStyle as useAntdStyle } from '@web-react/biz-components';

const downOut = new Keyframes('card-loading', {
  'from': {
    transform: 'translate(0, 0)',
    opacity: 1
  },
  'to': {
    transform: 'translate(0, 100%)',
    opacity: 0
  },
});

const genBizStyle: GenerateStyle<DescImgEditorToken> = (token) => {
  return {
    [token.componentCls]: {
      width: '796px',
      padding: '18px 12px 12px',
      display: 'flex',
      borderRadius: '12px',
      justifyContent: 'space-between',
      backgroundColor: token.colorFillContent,
      '&-preview': {
        width: '420px',
        padding: '12px 8px',
        boxSizing: 'border-box',
        borderRadius: '12px',
        overflow: 'hidden',
        [`${token.componentCls}-header`]: {
          width: '390px',
          height: '20px',
          marginBottom: '20px',
        },
      },
      '&-operate': {
        position: 'relative',
        boxSizing: 'border-box',
        overflow: 'hidden',
        transition: 'all .4s',
        '&-imgs': {
          width: '394px',
          height: '672px',
          overflow: 'auto',
          border: 'none',
          paddingLeft: '6px',
          marginTop: '12px',
          borderRadius: '18px',
        },
        [`${token.componentCls}-header`]: {
          width: '100%',
          height: '36px',
          paddingRight: '18px',
          boxSizing: 'border-box',
        },
      },

      '&-content': {
        width: '380px',
        height: '672px',
        backgroundColor: token.colorBgContainer,
        borderRadius: '18px',
        textAlign: 'center',
      },
      '&-banner': {
        boxSizing: 'border-box',
        img: { width: '210px', height: '38px' },
      },

      '&-header': {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        '&-left': {
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          '&-title': {
            color: token.colorTextSecondary,
            fontSize: '14px',
            lineHeight: '20px',
          },
          '&-desc': {
            color: token.colorTextDescription,
            fontSize: '12px',
            marginLeft: '7px',
          },
        },

      },
      '.down-out': {
        animation: `${downOut} 0.3s both`
      }
    }
  };
};

interface DescImgEditorToken extends BizAliasToken {

}
export function useStyle(prefixCls?: string) {
  return useAntdStyle(
    'DescImgEditor',
    (token) => {
      const bizToken: DescImgEditorToken = {
        ...token,
      };
      return [genBizStyle(bizToken)];
    },
    prefixCls,
  );
}

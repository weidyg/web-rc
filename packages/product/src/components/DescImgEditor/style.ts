import type { GenerateStyle, BizAliasToken } from '@web-react/biz-components';
import { useStyle as useAntdStyle } from '@web-react/biz-components';


const genBizStyle: GenerateStyle<DescImgEditorToken> = (token) => {
  return {
    [token.componentCls]: {
      width: '796px',
      padding: '18px 12px 12px',
      display: 'flex',
      justifyContent: 'space-between',
      borderRadius: token.borderRadiusLG,
      backgroundColor: token.colorBgLayout,
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
        textAlign: 'center',
        borderRadius: token.borderRadiusLG,
        backgroundColor: token.colorBgContainer,
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
            lineHeight: '20px',
            fontSize: '14px',
            color: token.colorTextSecondary,
          },
          '&-desc': {
            marginLeft: '7px',
            fontSize: '12px',
            color: token.colorTextDescription,
          },
        },
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

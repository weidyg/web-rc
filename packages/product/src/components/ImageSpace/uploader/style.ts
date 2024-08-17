import type { GenerateStyle, BizAliasToken } from '@web-react/biz-components';
import { setAlpha, useStyle as useAntdStyle } from '@web-react/biz-components';

const genBizStyle: GenerateStyle<PicUploaderToken> = (token) => {
  return {
    [token.componentCls]: {
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
        '&-header': {
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'nowrap',
        },
        '&-config': {
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
          [`${token.antCls}-form-item`]: {
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
          overflowY: 'auto',
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
            height: '48px',
            width: '48px',
            flexShrink: 0,
            backgroundColor: '#f7f8fa',
            borderRadius: token.borderRadius,
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
            color: token.colorTextSecondary,
            fontSize: token.fontSizeSM,
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
      }
    },
  };
};

interface PicUploaderToken extends BizAliasToken {
}
export function useStyle(prefixCls?: string) {
  return useAntdStyle(
    'PicUploader',
    (token) => {
      const bizToken: PicUploaderToken = {
        ...token,
      };
      return [genBizStyle(bizToken)];
    },
    prefixCls,
  );
}

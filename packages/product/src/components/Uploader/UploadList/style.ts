import type { GenerateStyle, BizAliasToken } from '@web-react/biz-components';
import { setAlpha, useStyle as useAntdStyle } from '@web-react/biz-components';

const genBizStyle: GenerateStyle<UploadListToken> = (token) => {
  return {
    [token.componentCls]: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      '&-files': {
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
        flex: 'auto',
        padding: `${token.paddingSM}px 0`,
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
        display: 'flex',
        alignItems: 'center',
        '&-wrap': {
          // marginTop: '20px',
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        },
      },
    },
  };
};

interface UploadListToken extends BizAliasToken {
}
export function useStyle(prefixCls?: string) {
  return useAntdStyle('UploadList', (token) => {
    const bizToken: UploadListToken = {
      ...token,
    };
    return [genBizStyle(bizToken)];
  }, prefixCls);
}

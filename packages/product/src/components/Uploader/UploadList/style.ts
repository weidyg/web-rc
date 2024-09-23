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
        padding: `${token.paddingXS}px 0`,
      },
      '&-item': {
        display: 'flex',
        alignItems: 'center',
        color: token.colorText,
        fontSize: token.fontSize,
        lineHeight: token.lineHeight,
        fontFamily: token.fontFamily,
        background: token.colorBgContainer,
        '&:last-child': {
          marginBottom: 0,
        },
        '&-img, &-img img': {
          width: '48px !important',
          height: '48px !important',
          objectFit: 'contain',
          borderRadius: token.borderRadius,
          background: token.colorBgLayout,
        },
        '&-content': {
          width: '40%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          overflow: 'hidden',
          flexShrink: 0,
          paddingLeft: `${token.paddingSM}px`,
        },
        '&-name': {
          fontSize: token.fontSize,
          color: token.colorText,
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

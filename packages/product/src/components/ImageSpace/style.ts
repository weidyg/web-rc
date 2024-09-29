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
        borderBottom: `${token.lineWidth}px ${token.lineType} ${token.colorBorderSecondary}`,
        borderRadius: `${token.borderRadius}px ${token.borderRadius}px 0 0`,
        fontSize: token.fontSize,
        color: token.colorText,
        background: token.colorBgContainer,
        padding: `${token.padding}px`,
      },
      '&-body': {
        flex: 1,
        display: 'flex',
        overflow: 'hidden',
      },
      '&-aside': {
        display: 'flex',
        width: '148px',
        overflow: 'hidden',
        padding: `${token.paddingXXS}px`,
        backgroundColor: token.colorBgSide,
      },
      '&-container': {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: token.colorBgContainer,
        margin: `0 ${token.marginXS / 2}px ${token.marginXS}px ${token.marginXS}px`,
        '&-top': {
          display: 'flex',
          padding: `${token.paddingXXS}px ${token.paddingXXS}px ${token.paddingXXS}px 0`,
          borderBottom: `${token.lineWidth}px ${token.lineType} ${token.colorBorderSecondary}`,
        },
      },
      '&-list': {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        padding: `${token.paddingXXS}px 0`,
        '&-container': {
          width: '100%',
          height: '100%',
          display: 'flex',
          overflow: 'auto',
        },
      },
      '&-table': {
        '&-container': {
          width: '100%',
          height: '100%',
          position: 'relative',
          overflow: 'hidden',
          boxSizing: 'border-box',
          color: token.colorText,
          fontSize: token.fontSize,
          lineHeight: token.lineHeight,
          fontFamily: token.fontFamily,
          background: token.colorBgContainer,
        },
        '&-header': {
          height: '40px',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1,
          ['tr > th']: {
            position: 'relative',
            textAlign: 'start',
            color: token.colorText,
            background: token.colorBgLayout,
            fontWeight: token.fontWeightStrong,
            transition: 'background 0.2s ease',
          },
        },
        '&-body': {
          top: '40px',
          height: 'calc(100% - 40px)',
          overflowY: 'auto',
          position: 'relative',
          ['tr > td']: {
            transition: `background 0.2s,border-color 0.2s`,
          },
        },
        [`&-header,&-body`]: {
          ['table']: {
            width: '100%',
            borderCollapse: 'collapse',
          },
          ['th,td']: {
            padding: '8px 0',
            borderBottom: `${token.lineWidth}px ${token.lineType} ${token.colorBorderSecondary}`,
          },
        },
      },
      '&-footer': {
        display: 'flex',
        width: '100%',
        height: '46px',
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
        },
      },
      '&-empty': {
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        justifyItems: 'center',
      },
      '&-fileName': {
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        alignContent: 'center',
        '&-checkbox': {
          margin: '0 8px 0 8px',
        },
        '&-img, &-img img': {
          cursor: 'pointer',
          width: '36px !important',
          height: '36px !important',
          objectFit: 'contain',
          borderRadius: token.borderRadius,
          background: token.colorBgLayout,
        },
        '&-title': {
          // maxWidth: '105px',
          marginLeft: '10px',
          p: {
            display: 'inline',
            textAlign: 'center',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          },
        },
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
  return useAntdStyle(
    'ImageSpace',
    (token) => {
      const bizToken: ImageSpaceToken = {
        ...token,
        colorBgPage: token.colorBgElevated,
        colorBgSide: token.colorBgLayout,
        colorBgFooter: token.colorBgElevated,
      };
      return [genBizStyle(bizToken)];
    },
    prefixCls,
  );
}

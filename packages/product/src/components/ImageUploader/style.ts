import { generatStyles } from '@web-react/biz-provider';

export const useStyles = generatStyles(({ token }) => {
  return {
    [token.componentCls]: {
      overflow: 'hidden',
      borderRadius: token.borderRadius,
      backgroundColor: token.colorBgContainer,
      height: '100%',
      '&-body': {
        margin: `${token.marginSM / 2}px  ${token.marginSM}px `,
        height: `calc(100% - ${token.marginSM * 2}px)`,
      },
      '&-panel, &-list': {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      },
      '&-panel': {
        '&-config': {
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
          marginBottom: token.marginXXS,
          [`.${token.antPrefixCls}-form-item`]: {
            padding: '4px 0',
            display: 'flex',
            flexWrap: 'nowrap',
            alignItems: 'center',
          },
        },
        '&-board': {
          height: '100%',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          cursor: 'pointer',
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
      },

      '&-list': {
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
    },
  };
}, 'PicUploader');

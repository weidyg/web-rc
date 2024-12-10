import { unit } from '@ant-design/cssinjs';
import { generatStyles } from '@web-rc/biz-provider';

export const useStyles = generatStyles(({ token }) => {
  return {
    [token.componentCls]: {
      height: 'calc(100% - 1px)',
      display: 'flex',
      flexDirection: 'column',
      '&-header': {
        padding: '8px 16px !important',
        minHeight: 'unset !important',
        fontWeight: '500 !important',
        '&-selected': {
          display: 'inline-flex',
          width: '80px',
        },
      },
      '&-body': {
        overflow: 'auto',
        padding: '0 !important',
        flex: 1,
      },
      '&-group': {
        '&-wrapper': {
          width: '120px',
        },
        '&-menu': {
          width: '100%',
          height: '100%',
          overflow: 'auto',
        },
        '&-item': {
          padding: '0px 4px',
          height: '32px !important',
          lineHeight: '32px !important',
        },
      },
      '&-item': {
        width: '100px',
        padding: '4px 4px 4px 8px',
        boxSizing: 'border-box',
        marginInline: 0,
        borderRadius: token.borderRadius,
        backgroundColor: token.colorFillContent,
        '&-action': {
          backgroundColor: token.colorPrimaryBg,
        },
        '&-hidden': {
          display: 'none',
          width: '0px',
          height: '0px',
        },
        '&-empty': {
          width: '100px',
        },
        '&-wrapper': {
          padding: '8px',
        },
        '&-text': {
          width: '56px',
          display: 'block',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
        },
      },
    },
  };
}, 'SelectCard');

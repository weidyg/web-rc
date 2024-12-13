import { BizAliasToken, generatStyles, setAlpha } from '@web-rc/biz-provider';

interface PicCardToken extends BizAliasToken {
  colorBgPicCard: string;
  colorControlText: string;
}
export const useStyles = generatStyles<PicCardToken>(({ token }) => {
  token.colorBgPicCard = token.colorBgLayout;
  token.colorControlText = token.colorWhite;
  return {
    [token.componentCls]: {
      position: 'relative',
      width: '122px',
      height: '153px',
      '&:hover': {
        [token.componentCls]: {
          '&-checkbox': {
            display: 'flex !important;',
          },
          '&-spec': {
            display: 'none !important;',
          },
          '&-copy': {
            display: 'block !important;',
          },
        },
      },
      '&&-empty': {
        visibility: 'hidden',
        height: '0px',
      },
      '&-background': {
        height: '120px',
        width: '120px',
        borderRadius: '12px',
        position: 'relative',
        display: 'inline-block',
        backgroundColor: token.colorBgPicCard,
        backgroundSize: 'contain',
        textAlign: 'center',
      },
      '&-imgBox': {
        verticalAlign: 'middle',
        display: 'table-cell',
        position: 'relative',
        textAlign: 'center',
        width: '120px',
        height: '120px',
        borderRadius: '8px',
        overflow: 'hidden',
        cursor: 'pointer',
        '&:hover': {
          [token.componentCls]: {
            '&-ai-entry': {
              display: 'inline-flex !important',
            },
          },
        },
        img: {
          maxHeight: '120px',
          maxWidth: '120px',
        },
      },
      '&-checkbox': {
        display: 'none',
        position: 'absolute',
        top: '8px',
        right: '8px',
        '&.checked': {
          display: 'flex',
        },
      },
      '&-ai-entry': {
        display: 'none',
        position: 'absolute',
        width: '70px',
        height: '20px',
        fontSize: token.fontSizeSM,
        color: token.colorControlText,
        backgroundColor: token.colorBgMask,
        top: '12px',
        left: '8px',
        borderRadius: '5px',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        zIndex: '1000',
      },
      '&-controlWrap': {
        display: 'flex',
        alignItems: 'center',
        padding: '0 8px',
        position: 'absolute',
        left: '0',
        top: '84px',
        borderRadius: '0 0 12px 12px',
        width: '100%',
        height: '36px',
        backgroundImage: `linear-gradient(
          180deg, 
          ${setAlpha(token.colorTextBase, 0.05)}, 
          ${setAlpha(token.colorTextBase, 0.3)}
          )`,
        boxSizing: 'border-box',
        WebkitBoxSizing: 'border-box',
      },
      '&-spec': {
        height: '14px',
        lineHeight: '14px',
        letterSpacing: '0',
        fontWeight: '400',
        fontSize: token.fontSize,
        color: token.colorControlText,
      },
      '&-copy': {
        display: 'none',
        marginRight: '8px',
        cursor: 'pointer',
        color: token.colorControlText,
      },
      '&-fullView': {
        marginLeft: 'auto',
        cursor: 'pointer',
        color: token.colorControlText,
      },
      '&-title': {
        '&-wrap': {
          display: 'inline-flex',
          width: '108px',
          alignItems: 'center',
          justifyContent: 'center',
        },
        '&-svg': {
          flexShrink: 0,
          height: '16px',
          width: '16px',
          cursor: 'pointer',
        },
        '&-tip': {
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          cursor: 'pointer',
          fontSize: `${token.fontSizeSM}px`,
          fontWeight: '400',
          color: token.colorText,
          height: '18px',
          lineHeight: '18px',
          margin: '0 4px',
        },
      },
    },
  };
}, 'PicCard');

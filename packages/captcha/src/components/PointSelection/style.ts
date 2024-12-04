import { generatStyles } from '@web-rc/biz-provider';

export const useStyles = generatStyles(({ token }) => {
  return {
    [token.componentCls]: {
      position: 'relative',
      display: 'flex',
      width: '100%',
      overflow: 'hidden',
      borderRadius: token.borderRadius,
      padding: 0,
      [`&-container`]: {
        width: 'fit-content'
      },
      [`&-img`]: {
        position: 'relative',
        zIndex: 10,
      },
      [`&-point`]: {
        color: token.colorBgElevated,
        backgroundColor: token.colorPrimary,
        borderColor: token.colorBgElevated,
        borderRadius: '50%',
        border: `2px solid ${token.colorBgElevated}`,

        position: 'absolute',
        zIndex: 20,
        width: '1.25rem',
        height: '1.25rem',
        cursor: 'default',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      [`&-hint`]: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: '.5rem',
        padding: 0,
        [`&-img`]: {
          border: `1px solid ${token.colorBorder}`,
          borderRadius: token.borderRadius,
          height: '2.5rem',
          width: '100%',
        },
        [`&-text`]: {
          border: `1px solid ${token.colorBorder}`,
          borderRadius: token.borderRadius,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '2.5rem',
          width: '100%',
          objectFit: 'contain',
        }
      }
    },
  };
}, 'PointSelectionCaptcha');

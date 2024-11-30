import { Keyframes } from '@ant-design/cssinjs';
import { generatStyles } from '@web-rc/biz-provider';

export const useStyles = generatStyles(({ token, isDark, setAlpha }) => {
  const shine = new Keyframes('shine', {
    '0%': { backgroundPosition: '200% 0' },
    'to': { backgroundPosition: '-200% 0' },
  });
  return {
    [token.componentCls]: {
      [`&-wrapper`]: {
        backgroundColor: token.colorBgContainerDisabled,
        borderRadius: token.borderRadius,
        border: `1px solid ${token.colorBorder}`,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
        width: '100%',
        height: '2.5rem',
        overflow: 'hidden',
      },
      [`&-content`]: {
        zIndex: 1,
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        top: 0,
        width: '100%',
        height: '100%',
        userSelect: 'none',
        fontSize: '.75rem',
        lineHeight: '1rem',
        [`&-text`]: {
          animationName: shine,
          animationDuration: '2s',
          animationTimingFunction: 'linear',
          animationIterationCount: 'infinite',
          animationDirection: 'normal',
          animationPlayState: 'running',
          background: 'radial-gradient(circle at center, #fffc, #f000) -200% 50% / 200% 100% no-repeat, #000',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
          display: 'flex',
          height: '100%',
          alignItems: 'center'
        }
      },
      [`&-bar`]: {
        zIndex: 0,
        width: 0,
        height: '100%',
        position: 'absolute',
        backgroundColor: token.colorSuccess,
      },
      [`&-action`]: {
        zIndex: 2,
        background: token.colorBgContainer,
        position: 'absolute',
        left: '0',
        top: '0',
        display: 'flex',
        height: '100%',
        cursor: 'move',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: '.875rem',
        paddingRight: '.875rem',
        boxShadow: `
        0 0 transparent,
        0 0 transparent,
        0 4px 6px -1px rgba(0,0,0,.1),
        0 2px 4px -2px rgba(0,0,0,.1)
        `,
      },
      [`.transition-left`]: {
        left: '0 !important',
        transitionDuration: '.3s',
        transitionProperty: 'left',
        transitionTimingFunction: 'cubic-bezier(.4,0,.2,1)',
      },
      [`.transition-width`]: {
        width: '0 !important',
        transitionDuration: '.3s',
        transitionProperty: 'width',
        transitionTimingFunction: 'cubic-bezier(.4,0,.2,1)',
      },
      [`.dragging`]: {
        borderRadius: token.borderRadius,
      },
      [`.isPassing`]: {
        WebkitTextFillColor: 'hsl(0deg 0% 98%)',
      }
    },
  };
}, 'SliderButtonCaptcha');

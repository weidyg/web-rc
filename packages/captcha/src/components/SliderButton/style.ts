import { Keyframes } from '@ant-design/cssinjs';
import { generatStyles } from '@web-rc/biz-provider';

export const useStyles = generatStyles(({ token }, props: { borderRadius?: string | number }) => {
  const { borderRadius = token.borderRadius } = props;
  const shine = new Keyframes('shine', {
    '0%': { backgroundPosition: '200% 0' },
    'to': { backgroundPosition: '-200% 0' },
  });
  return {
    [token.componentCls]: {
      overflow: 'hidden',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      textAlign: 'center',
      width: '100%',
      height: token.controlHeightLG,
      borderRadius: borderRadius,
      border: `1px solid ${token.colorBorder}`,
      backgroundColor: token.colorBgContainerDisabled,
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
        fontSize: token.fontSizeSM,
        lineHeight: token.lineHeight,
        [`&-text`]: {
          userSelect: 'none',
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
        userSelect: 'none',
        zIndex: 0,
        width: 0,
        height: '100%',
        position: 'absolute',
        transitionProperty: 'width',
        transitionTimingFunction: token.motionEaseInOut,
      },
      [`&-action`]: {
        userSelect: 'none',
        zIndex: 2,
        borderRadius: borderRadius,
        background: token.colorBgContainer,
        position: 'absolute',
        left: '0',
        top: '0',
        display: 'flex',
        height: '100%',
        width: token.controlHeightLG,
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: token.boxShadowSecondary,
        transitionProperty: 'left',
        transitionTimingFunction: token.motionEaseInOut,
      },
    },
  };
}, 'SliderButtonCaptcha');

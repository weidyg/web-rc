import { Keyframes } from '@ant-design/cssinjs';
import type { GenerateStyle, BizAliasToken } from '@web-react/biz-components';
import { useStyle as useAntdStyle } from '@web-react/biz-components';

const genBizStyle: GenerateStyle<ImageItemToken> = (token) => {
  // const downOut = new Keyframes('card-loading', {
  //   'from': {
  //     transform: 'translate(0, 0)',
  //     opacity: 1
  //   },
  //   'to': {
  //     transform: 'translate(0, 100%)',
  //     opacity: 0
  //   },
  // });
  return {
    [token.componentCls]: {
      width: 88,
      height: 88,
      position: "relative",
      borderRadius: token.borderRadius,
      border: `1px solid ${token.colorBorderSecondary}`,
      '&:hover': {
        [token.componentCls]: {
          '&-mask': {
            opacity: "1",
          }
        }
      },
      '&-drag': {
        cursor: 'move',
      },
      '&-no': {
        left: "0",
        position: "absolute",
        zIndex: "3",
        width: "24px",
        height: "24px",
        textAlign: "center",
        fontSize: token.fontSize,
        lineHeight: token.lineHeight,
        color: token.colorPrimary,
        backdropFilter: "blur(6px)",
        backgroundColor: token.colorBgBlur,
        borderRadius: `${token.borderRadius}px 0 ${token.borderRadius}px 0`,
      },
      '&-img': {
        width: 'inherit',
        height: 'inherit',
        objectFit: 'scale-down',
        borderRadius: token.borderRadius,
        backgroundColor: token.colorFillContent
      },
      '&-mask': {
        left: "0",
        right: "0",
        bottom: "0",
        position: "absolute",
        display: "flex",
        alignContent: "center",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        opacity: 0,
        cursor: 'default',
        color: token.colorTextLightSolid,
        backgroundColor: token.colorBgMask,
        borderRadius: `0 0 ${token.borderRadius}px ${token.borderRadius}px`,
      },
      // '.down-out': {
      //   animation: `${downOut} 0.3s both`
      // }
    }
  };
};

interface ImageItemToken extends BizAliasToken {

}
export function useStyle(prefixCls?: string) {
  return useAntdStyle(
    'ImageItem',
    (token) => {
      const bizToken: ImageItemToken = {
        ...token,
      };
      return [genBizStyle(bizToken)];
    },
    prefixCls,
  );
}

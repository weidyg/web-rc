import type { GenerateStyle, BizAliasToken } from '@web-react/biz-components';
import { setAlpha, useStyle as useAntdStyle } from '@web-react/biz-components';

const genBizStyle: GenerateStyle<SalePropInputToken> = (token) => {
  return {
    [token.componentCls]: {
      '&-del': {
        color: `${token.colorTextTertiary} !important`,
        '&:hover': {
          color: `${token.colorError} !important`,
        }
      },
    },
  }
};
// repeating-linear-gradient(-45deg, transparent, transparent 6px, #f0f2f5 0, #f0f2f5 8px) !important;
interface SalePropInputToken extends BizAliasToken {

}
export function useStyle(prefixCls?: string) {
  return useAntdStyle('SalePropInput', (token) => {
    const bizToken: SalePropInputToken = {
      ...token,
    };
    return [genBizStyle(bizToken)];
  }, prefixCls,);
}

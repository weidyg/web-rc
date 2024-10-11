import type { GenerateStyle, BizAliasToken } from '@web-react/biz-components';
import { useStyle as useAntdStyle } from '@web-react/biz-components';

const genBizStyle: GenerateStyle<LoginToken> = (token) => {
  return {
    [token.componentCls]: {

    },
  };
};
interface LoginToken extends BizAliasToken { }
export function useStyle(prefixCls?: string) {
  return useAntdStyle(
    'ImageCard',
    (token) => {
      const bizToken: LoginToken = {
        ...token,
      };
      return [genBizStyle(bizToken)];
    },
    prefixCls,
  );
}

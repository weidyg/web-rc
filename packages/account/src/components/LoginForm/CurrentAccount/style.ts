import type { GenerateStyle, BizAliasToken } from '@web-react/biz-components';
import { useStyle as useAntdStyle } from '@web-react/biz-components';

const genBizStyle: GenerateStyle<CurrentAccountToken> = (token) => {
  return {
    [token.componentCls]: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      height: 180,
    },
  };
};
interface CurrentAccountToken extends BizAliasToken { }
export function useStyle(prefixCls?: string) {
  return useAntdStyle('CurrentAccount', (token) => {
    const bizToken: CurrentAccountToken = {
      ...token,
    };
    return [genBizStyle(bizToken)];
  }, prefixCls);
}

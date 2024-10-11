import { forwardRef, Ref, useImperativeHandle, useMemo } from 'react';
import { Dropdown, Image, MenuProps } from 'antd';
import { EyeOutlined, PictureOutlined } from '@ant-design/icons';
import { classNames, useMergedState } from '@web-react/biz-utils';
import { useStyle } from './style';

type LoginProps = {
  /** 类名 */
  className?: string;
  /** 样式 */
  style?: React.CSSProperties;
};

type LoginRef = {
};

const Login = forwardRef((props: LoginProps, ref: Ref<LoginRef>) => {
  const { prefixCls, wrapSSR, hashId, token } = useStyle();
  
  useImperativeHandle(ref, () => ({
    
  }));

  return wrapSSR(<>
  
  </>);
});

export type { LoginProps, LoginRef };
export default Login;

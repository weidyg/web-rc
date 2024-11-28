import { forwardRef, Ref, useImperativeHandle } from 'react';
import { useStyles } from './style';

export type PointSelectionCaptchaProps = {};
export type PointSelectionCaptchaRef = {};
const PointSelectionCaptcha = forwardRef((props: PointSelectionCaptchaProps, ref: Ref<PointSelectionCaptchaRef>) => {
  const { ...restProps } = props;
  const { prefixCls, wrapSSR, hashId, token } = useStyles();

  useImperativeHandle(ref, () => ({}));
  return wrapSSR(<>点选择验证码</>);
});
export default PointSelectionCaptcha;

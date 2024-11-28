import { forwardRef, Ref, useImperativeHandle } from 'react';
import { useStyles } from './style';

export type SliderPuzzleCaptchaProps = {};
export type SliderPuzzleCaptchaRef = {};
const SliderPuzzleCaptcha = forwardRef((props: SliderPuzzleCaptchaProps, ref: Ref<SliderPuzzleCaptchaRef>) => {
  const { ...restProps } = props;
  const { prefixCls, wrapSSR, hashId, token } = useStyles();

  useImperativeHandle(ref, () => ({}));
  return wrapSSR(<>滑块拼图验证码</>);
});
export default SliderPuzzleCaptcha;

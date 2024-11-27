import { forwardRef, Ref, useImperativeHandle } from "react";
import { classNames } from '@web-rc/biz-utils';
import { useStyles } from "./style";

export type SliderRotateCaptchaProps = {};
export type SliderRotateCaptchaRef = {};
const SliderRotateCaptcha = forwardRef((
    props: SliderRotateCaptchaProps,
    ref: Ref<SliderRotateCaptchaRef>
) => {
    const { ...restProps } = props;
    const { prefixCls, wrapSSR, hashId, token } = useStyles();

    useImperativeHandle(ref, () => ({}));
    return wrapSSR(<>
    滑块旋转验证码
    </>);
});
export default SliderRotateCaptcha;

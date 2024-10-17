import { useCountdown } from "@web-react/biz-utils";
import { Button, ButtonProps, Flex, Form, Input, InputProps } from "antd";
import { NamePath } from "antd/es/form/interface";
import { forwardRef, Ref, useEffect, useImperativeHandle, useState } from "react";

export type InputCaptchaProps = InputProps & {

    /** @name 手机号的 name */
    phoneName?: NamePath;

    /** @name 倒计时的秒数 */
    countDown?: number;

    /** @name 获取验证码的方法 */
    onGetCaptcha: (mobile: string) => Promise<void>;

    /** @name 计时回调 */
    onTiming?: (count: number) => void;

    /** @name 渲染按钮的文字 */
    captchaTextRender?: (timing: boolean, count: number) => React.ReactNode;

    /** @name 获取按钮验证码的props */
    captchaProps?: ButtonProps;

    value?: any;
    onChange?: any;
};

export type InputCaptchaRef = {
    startTiming: () => void;
    endTiming: () => void;
};

const InputCaptcha = forwardRef((props: InputCaptchaProps, ref: Ref<InputCaptchaRef>) => {
    const {
        name,
        phoneName,
        onTiming,
        captchaTextRender = (paramsTiming, paramsCount) => {
            return paramsTiming ? `${paramsCount} 秒后重新获取` : '获取验证码';
        },
        captchaProps,
        countDown = 60,
        ...restProps
    } = props;

    const form = Form.useFormInstance();
    const [loading, setLoading] = useState<boolean>();
    const { count, timing, start, stop } = useCountdown({ initialCount: countDown || 60, onTiming });

    const onGetCaptcha = async (mobile: string) => {
        try {
            setLoading(true);
            await restProps.onGetCaptcha(mobile);
            setLoading(false);
            start();
        } catch (error) {
            stop();
            setLoading(false);
            console.log(error);
        }
    };
    /**
     * 暴露ref方法
     */
    useImperativeHandle(ref, () => ({
        startTiming: () => start(),
        endTiming: () => stop(),
    }));

    return (
        <div
            style={{
                ...restProps?.style,
                display: 'flex',
                alignItems: 'center',
            }}
        >
            <Input
                {...restProps}
                style={{
                    flex: 1,
                    marginRight: 4,
                    transition: 'width .3s',
                    ...restProps?.style,
                }}
            />
            <Button
                style={{
                    display: 'block',
                    minWidth: 100,
                    ...captchaProps?.style,
                }}
                disabled={timing}
                loading={loading}
                {...captchaProps}
                onClick={async () => {
                    try {
                        if (phoneName) {
                            const phoneNameList = [phoneName].flat(1) as string[];
                            await form.validateFields(phoneNameList);
                            const mobile = form.getFieldValue(phoneNameList);
                            await onGetCaptcha(mobile);
                        } else {
                            await onGetCaptcha('');
                        }
                    } catch (error) {
                        // eslint-disable-next-line no-console
                        console.log(error);
                    }
                }}
            >
                {captchaTextRender(timing, count)}
            </Button>
        </div>
    );
},
);


export default InputCaptcha;
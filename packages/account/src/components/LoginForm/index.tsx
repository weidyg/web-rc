import { forwardRef, ReactNode, Ref, useImperativeHandle, useRef, useState } from 'react';
import { Alert, Button, Checkbox, Form, FormInstance, Input, QRCodeProps, Space, Tabs, Typography } from 'antd';
import { LockOutlined, MessageOutlined, MobileOutlined, UserOutlined } from '@ant-design/icons';
import { classNames } from '@web-react/biz-utils';
import { useStyles } from './style';
import CurrentAccount from './CurrentAccount';
import ExternalLogins, { ThirdPartyLogin } from './ExternalLogins';
import InputCaptcha, { InputCaptchaProps } from './InputCaptcha';
import QRCodeLogin, { QRCodeLoginProps, QRCodeValidateResult } from './QRCodeLogin';
const initialValues = {
  grantType: 'password',
};

type UserLoginState = { status?: 'success' | 'error'; message?: string };
type GrantType = 'password' | 'smscode';


type QRCodeStatus = Exclude<QRCodeProps['status'], 'loading'> & 'successed';
type Agreement = { link: string, label: string };
type LoginFormProps<Values = any> = {
  // urlPath?: {
  //   register?: string,
  //   forgotPassword?: string,
  //   externalLogin?: string,
  //   appHomeUrl?: string,
  //   userAgreement?: string,
  //   privacyPolicy?: string,
  // },
  loginBoxBlur?: boolean,
  currentUser?: {
    isAuthenticated?: boolean,
    userName?: string,
    avatar?: string
  },
  agreements?: Agreement[],
  thirdPartyLogins?: ThirdPartyLogin[],
  onThirdPartyClick?: (key: string) => Promise<void> | void,
  isKeyPressSubmit?: boolean,
  form?: FormInstance<Values>,
  grantTabs: { key: string, label: ReactNode }[],
  captchaProps?: InputCaptchaProps['captchaProps'] & Pick<InputCaptchaProps, 'countDown' | 'captchaTextRender'>,
  onGetCaptcha?: InputCaptchaProps['onGetCaptcha'],
  qrCodeProps?: Omit<QRCodeLoginProps, 'onRefresh' | 'onValidate'>,
  onGetQrCode?: QRCodeLoginProps['onRefresh'],
  onVerifyQrCode?: () => Promise<QRCodeStatus> | QRCodeStatus,
  onSubmit?: (values: Values) => Promise<any>,
  redirectUrl?: string,
  restPasswordUrl?: string;
  registerUrl?: string;
  allowRememberMe?: boolean,
};

type LoginFormRef = {
};

const LoginForm = forwardRef(<Values extends { [k: string]: any } = any>(
  props: LoginFormProps<Values>,
  ref: Ref<LoginFormRef>
) => {
  const {
    // urlPath, 
    loginBoxBlur = true,
    currentUser,
    agreements = [],
    thirdPartyLogins = [],
    onThirdPartyClick,
    grantTabs = [],
    isKeyPressSubmit,
    form,
    captchaProps,
    onGetCaptcha = () => { },
    qrCodeProps,
    onGetQrCode,
    onVerifyQrCode,
    onSubmit,
    redirectUrl,
    restPasswordUrl,
    registerUrl,
    allowRememberMe,
    // grantTypes = ['password'],
    // externalProviders = [],
    // allowRememberMe, onLogin, 
    ...restProps
  } = props;
  const { prefixCls, wrapSSR, hashId, token } = useStyles({ loginBoxBlur: loginBoxBlur });

  const { isAuthenticated, userName, avatar } = currentUser || {};
  const [confirmLogin, setConfirmLogin] = useState(isAuthenticated);
  const [userLoginState, setUserLoginState] = useState<UserLoginState>();

  useImperativeHandle(ref, () => ({

  }));

  const handleVerifyQrCode = async () => {
    clearLoginState();
    const status = await onVerifyQrCode!();
    const successed = status === 'successed';
    if (successed) { afterSuccessfulLogin(); }
    const result: QRCodeValidateResult = {
      status: successed ? 'scanned' : status,
      isStop: successed
    };
    return result;
  }
  const handleGetCaptcha = async (mobile: string) => {
    clearLoginState();
    await onGetCaptcha?.(mobile);
  };
  const handleSubmit = async (values: Values) => {
    clearLoginState();
    try {
      if (!confirmLogin) {
        // if (values.password) { values.password = aes.encrypt(values.password); }
        await onSubmit?.(values);
      }
      afterSuccessfulLogin();
    } catch (error: any) {
      setUserLoginState({ status: 'error', message: error.message });
    }
  };

  const handleExternalLogin = async (provider: string) => {
    clearLoginState();
    await onThirdPartyClick?.(provider);
    // if (urlPath?.externalLogin) {
    //   const url = toOauthCallbackUrl(urlPath?.externalLogin, { provider, returnUrl, returnUrlHash });
    //   await openWindow(url);
    // }
  };

  const clearLoginState = () => {
    setUserLoginState(undefined);
  };
  const afterSuccessfulLogin = () => {
    setUserLoginState({ status: 'success', message: '登录成功' });
    if (redirectUrl) { window.location.href = redirectUrl; }
  };

  const GrantTypeTabs = ({ value, onChange }: any) => {
    return (<Tabs activeKey={value} items={grantTabs} onChange={onChange}
      className={classNames(`${prefixCls}-tabs`, hashId)}
      tabBarStyle={{ marginBottom: 0 }}
    />);
  };
  const formInstance = Form.useFormInstance();
  const formRef = useRef<FormInstance<any>>((form || formInstance) as any);
  return wrapSSR(<div className={classNames(`${prefixCls}-container`, hashId)}>
    <div className={classNames(`${prefixCls}-main`, hashId)}>
      {onGetQrCode && onVerifyQrCode && <>
        <QRCodeLogin
          onRefresh={onGetQrCode}
          onValidate={handleVerifyQrCode}
          {...qrCodeProps}
        />
        <div className={classNames(`${prefixCls}-divider `, hashId)} />
      </>}
      <div className={classNames(`${prefixCls}-form`, hashId)} >
        {confirmLogin ? (
          <CurrentAccount
            userName={userName}
            avatar={avatar}
            onClick={() => setConfirmLogin(false)}
          />
        ) : (
          <Form
            autoComplete="off"
            form={form}
            initialValues={initialValues}
            onKeyUp={(event) => {
              if (!isKeyPressSubmit) return;
              if (event.key === 'Enter') {
                formRef.current?.submit();
              }
            }}
            onValuesChange={clearLoginState}
            onFinish={handleSubmit}
          >
            {userLoginState?.status && <>
              <Alert showIcon closable
                type={userLoginState?.status}
                message={userLoginState?.message}
                onClose={() => setUserLoginState({})}
              />
            </>}

            <Form.Item name="grantType">
              <GrantTypeTabs />
            </Form.Item>

            <Form.Item noStyle dependencies={['grantType']}>
              {({ getFieldValue }) => ((getFieldValue('grantType') as GrantType == 'password') ? (<>
                <Form.Item name="username" rules={[{ required: true, message: '请输入用户名' }]}>
                  <Input prefix={<UserOutlined />} placeholder="请输入用户名" />
                </Form.Item>
                <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
                  <Input.Password prefix={<LockOutlined />} placeholder="请输入密码" />
                </Form.Item>
              </>) : (<>
                <Form.Item name='mobile' rules={[{ required: true, message: '请输入手机号码' }]}>
                  <Input prefix={<MobileOutlined />} placeholder="请输入手机号码" />
                </Form.Item>
                <Form.Item name='code' rules={[{ required: true, message: '请输入手机验证码' }]}>
                  <InputCaptcha prefix={<MessageOutlined />} placeholder="请输入手机验证码"
                    phoneName={'mobile'}
                    captchaProps={captchaProps}
                    countDown={captchaProps?.countDown}
                    captchaTextRender={captchaProps?.captchaTextRender}
                    onGetCaptcha={handleGetCaptcha}
                  />
                </Form.Item>
              </>)
              )}
            </Form.Item>
            <Form.Item noStyle>
              <Button type="primary" htmlType="submit" block>
                登录
              </Button>
            </Form.Item>
            {(allowRememberMe || restPasswordUrl || registerUrl) &&
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBlockStart: 8,
                marginBlockEnd: 12
              }}>
                <div>
                  {allowRememberMe &&
                    <Form.Item noStyle name="rememberMe">
                      <Checkbox>记住我</Checkbox>
                    </Form.Item>
                  }
                </div>
                <Space>
                  <Form.Item noStyle dependencies={['grantType']}>
                    {({ getFieldValue }) => ((getFieldValue('grantType') as GrantType == 'password')
                      && restPasswordUrl && (<>
                        <Typography.Link href={restPasswordUrl}>
                          忘记密码
                        </Typography.Link>
                      </>))}
                  </Form.Item>
                  {registerUrl &&
                    <Typography.Link href={registerUrl}>
                      注册
                    </Typography.Link>
                  }
                </Space>
              </div>
            }

          </Form>
        )}

        {!confirmLogin && thirdPartyLogins.length > 0 && <>
          <ExternalLogins items={thirdPartyLogins} onClick={handleExternalLogin} />
        </>}
      </div>
    </div>
    {agreements.length > 0 && <>
      <div className={classNames(`${prefixCls}-agreement`, hashId)} >
        <Typography.Text type='secondary' style={{ fontSize: 12, }}>
          登录即视为您已阅读并同意
        </Typography.Text>
        {agreements.map(({ link, label }, i) => {
          return <Typography.Link key={i}
            href={link} target='_blank'
            style={{ fontSize: token.fontSizeSM, }}
          >
            《{label}》
          </Typography.Link>
        })}
      </div>
    </>}
  </div>);
});

export type { LoginFormProps, LoginFormRef };
export default LoginForm;


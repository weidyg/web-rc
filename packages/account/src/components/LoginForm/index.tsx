import { forwardRef, ReactNode, Ref, useImperativeHandle, useRef, useState } from 'react';
import { Alert, Button, Form, FormInstance, Input, QRCodeProps, Tabs, Typography } from 'antd';
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

  // allowRememberMe?: boolean,
  // loginBoxBlur?: boolean,
  // onLogin: (values: Record<string, any>) => Promise<any>
  // onGetCaptcha: (mobile: string) => Promise<any>
};

type LoginFormRef = {
};

const LoginForm = forwardRef(<Values extends { [k: string]: any } = any>(props: LoginFormProps<Values>, ref: Ref<LoginFormRef>) => {
  const {
    // urlPath, 
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
    ...propRest
    // grantTypes = ['password'],
    // externalProviders = [],
    // allowRememberMe, onLogin, 
  } = props;
  const { prefixCls, wrapSSR, hashId, token } = useStyles({ loginBoxBlur: false });

  const { isAuthenticated, userName, avatar } = currentUser || {};
  const [confirmLogin, setConfirmLogin] = useState(isAuthenticated);
  const [userLoginState, setUserLoginState] = useState<UserLoginState>({ status: 'success', message: '登录成功' });

  useImperativeHandle(ref, () => ({

  }));

  const handleVerifyQrCode = async () => {
    let status = await onVerifyQrCode!();
    const successed = status === 'successed';
    if (successed) { handleLoginSuccess(); }
    const result: QRCodeValidateResult = {
      status: successed ? 'scanned' : status,
      isStop: successed
    };
    return result;
  }

  const handleLoginSuccess = () => {
    setUserLoginState({ status: 'success', message: '登录成功' });
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
                    onGetCaptcha={onGetCaptcha}
                  />
                </Form.Item>
              </>)
              )}
            </Form.Item>

            <Form.Item >
              <Button type="primary" htmlType="submit" block>
                登录
              </Button>
            </Form.Item>
          </Form>
        )}

        {!confirmLogin && thirdPartyLogins.length > 0 && <>
          <ExternalLogins items={thirdPartyLogins} onClick={onThirdPartyClick} />
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


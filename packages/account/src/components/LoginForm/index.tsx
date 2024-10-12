import { forwardRef, ReactNode, Ref, useImperativeHandle, useMemo, useState } from 'react';
import { Alert, Avatar, Divider, Dropdown, Form, Image, MenuProps, Popover, Space, Tabs, TabsProps, Typography } from 'antd';
import { EyeOutlined, PictureOutlined, UserOutlined } from '@ant-design/icons';
import { classNames, useMergedState } from '@web-react/biz-utils';
import { useStyle } from './style';
import CurrentAccount from './CurrentAccount';
import ExternalLogins from './ExternalLogins';
const initialValues = {
  grantType: 'password',
};

type UserLoginState = { status: 'success' | 'error'; message: string };
type GrantType = 'password' | 'smscode';


type Agreement = { link: string, label: string };
type ThirdPartyLogin = { text: string, icon?: ReactNode, onClick?: () => void };
type LoginFormProps = {
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

  // grantTypes?: GrantType[],
  // allowRememberMe?: boolean,
  // loginBoxBlur?: boolean,
  // onLogin: (values: Record<string, any>) => Promise<any>
  // onGetCaptcha: (mobile: string) => Promise<any>
};

type LoginFormRef = {
};

const LoginForm = forwardRef((props: LoginFormProps, ref: Ref<LoginFormRef>) => {
  const {
    // urlPath, 
    currentUser,
    agreements = [],
    thirdPartyLogins = [],
    // grantTypes = ['password'],
    // externalProviders = [],
    // allowRememberMe, onLogin, onGetCaptcha
  } = props;

  const { isAuthenticated, userName, avatar } = currentUser || {};
  const { prefixCls, wrapSSR, hashId, token } = useStyle();

  const [confirmLogin, setConfirmLogin] = useState(isAuthenticated);
  const [userLoginState, setUserLoginState] = useState<UserLoginState>();

  useImperativeHandle(ref, () => ({

  }));


  return wrapSSR(<>
    <div className={classNames(`${prefixCls}-container`, hashId)}>
      {/* <div className={`${getCls('top')} ${hashId}`.trim()}>
        {title || logoDom ? (
          <div className={`${getCls('header')}`}>
            {logoDom ? <span className={getCls('logo')}>{logoDom}</span> : null}
            {title ? <span className={getCls('title')}>{title}</span> : null}
          </div>
        ) : null}
        {subTitle ? <div className={getCls('desc')}>{subTitle}</div> : null}
      </div> */}
      <div className={classNames(`${prefixCls}-main`, hashId)} >

        <CurrentAccount />

        <div className={classNames(`${prefixCls}-main-other`, hashId)}>
          {!confirmLogin && thirdPartyLogins.length > 0 &&
            <ExternalLogins actions={thirdPartyLogins} />
          }
          {agreements.length > 0 &&
            <div>
              <Typography.Text type='secondary' style={{ fontSize: 12, }}>
                登录即视为您已阅读并同意
              </Typography.Text>
              {agreements.map(({ link, label }, i) => {
                return <Typography.Link
                  href={link} target='_blank'
                  style={{ fontSize: token.fontSizeSM, }}
                >
                  《{label}》
                </Typography.Link>
              })}
            </div>
          }
        </div>
      </div>
    </div>
  </>);
});

export type { LoginFormProps, LoginFormRef };
export default LoginForm;

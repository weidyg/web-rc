/**
 * title: 基本使用
 * description: 登录表单
 */

import { AlipayOutlined, DingdingOutlined, GithubOutlined, WechatOutlined, WeiboOutlined } from "@ant-design/icons";
import { LoginForm } from "@web-react/biz-components";

export default () => {
  return (<LoginForm
    grantTabs={[
      { key: 'password', label: '账户登录' },
      { key: 'smscode', label: '短信登录' },
    ]}
    thirdPartyLogins={[
      { value: 'wechat', title: '微信', icon: <WechatOutlined />, style: { backgroundColor: 'rgb(135, 208, 104)' } },
      { value: 'alipay', title: '支付宝', icon: <AlipayOutlined />, style: { backgroundColor: 'rgb(22, 119, 255)' } },
      { value: 'dingding', title: '钉钉', icon: <DingdingOutlined />, style: { backgroundColor: 'rgb(22 119 255 / 78%)' } },
      { value: 'github', title: 'Github', icon: <GithubOutlined /> },
      { value: 'weibo', title: '微博', icon: <WeiboOutlined />, style: { backgroundColor: 'rgb(245, 106, 0)' } },
    ]}
    onThirdPartyClick={async (key) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, 2000);
      });
    }}
    currentUser={{
      isAuthenticated: false
    }}
    agreements={[
      { label: '用户协议', link: "/Account/UserAgreement" },
      { label: '隐私政策', link: "/Account/PrivacyPolicy" }
    ]}
  />);
};

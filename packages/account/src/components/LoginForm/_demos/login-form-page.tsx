/**
 * iframe: true
 * title: 登录页面
 * description: 登录表单页面
 */

import { AlipayCircleOutlined, AlipayOutlined, DingdingOutlined, GithubOutlined, WechatOutlined, WeiboOutlined } from "@ant-design/icons";
import { LoginForm, LoginFormPage } from "@web-react/biz-components";

export default () => {
    return (<LoginFormPage
        backgroundImageUrl="https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr"
        // backgroundImageUrl="https://srccdn.jushuitan.com/jst-login/assets/img/login_subimg_20230201-35a38a2251.png"
        // backgroundVideoUrl='https://gw.alipayobjects.com/v/huamei_gcee1x/afts/video/jXRBRK_VAwoAAAAAAAAAAAAAK4eUAQBr'
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
        footerNav={[
            { label: '链接1', link: "" },
            { label: '链接2', link: "" }
        ]}
        copyright={{
            year: 2020,
            company: "福建省不想上班有限公司",
            icp: "闽ICP备000000000000号-1",
            beian: "闽公网安备000000000000号"
        }}
    />);
};

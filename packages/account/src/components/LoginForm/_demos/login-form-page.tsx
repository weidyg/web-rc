/**
 * iframe: true
 * title: 登录页面
 * description: 登录表单页面
 */

import { AlipayOutlined, DingdingOutlined, GithubOutlined, WechatOutlined, WeiboOutlined } from "@ant-design/icons";
import { useToken, LoginFormPage } from "@web-react/biz-components";
import { useState } from "react";

export default () => {
    const { token } = useToken();
    const [qrStatus, setQrStatus] = useState<string>();
    return (<LoginFormPage
        // redirectUrl=""
        // restPasswordUrl="/"
        // registerUrl="/"
        // allowRememberMe={true}
        // backgroundImageUrl="https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr"
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
        qrCodeProps={{
            title: '扫码登录',
            subTitle: '打开淘宝APP—点击左上角扫一扫',
            description: <>
                <div style={{ color: token.colorTextDescription }} >使用<span style={{ color: token.colorText }} >阿里云APP/支付宝/钉钉</span></div>
                <a style={{ color: token.colorTextDescription }}
                    onMouseOver={(e) => { e.currentTarget.style.color = token.colorLinkHover; }}
                >
                    下载阿里云APP，上云更轻松
                </a>
            </>,
        }}
        onGetQrCode={() => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve("https://img.alicdn.com/imgextra/i4/O1CN01KqhJjG1JzKzk5b")
                }, 1000)
            })
        }}
        onVerifyQrCode={() => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    const statusArry = ['active', 'expired', 'scanned', 'successed'];
                    const index = Math.floor(Math.random() * statusArry.length);
                    let status = statusArry[index];
                    if (status == 'active' && qrStatus == 'scanned') {
                        status = 'scanned';
                    }
                    setQrStatus(status);
                    resolve(status as any)
                }, 1000)
            })
        }}
        onGetCaptcha={async (mobile) => {
            console.log('获取验证码', mobile);
        }}
        onSubmit={async (values) => {
            console.log('登录', values);
        }}
    />);
};

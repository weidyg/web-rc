/**
 * iframe: true
 * title: 登录页面
 * description: 登录表单页面
 */

import { LoginForm, LoginFormPage } from "@web-react/biz-components";

export default () => {
    return (<LoginFormPage
        backgroundImageUrl="https://srccdn.jushuitan.com/jst-login/assets/img/login_subimg_20230201-35a38a2251.png"
        // backgroundVideoUrl='https://gw.alipayobjects.com/v/huamei_gcee1x/afts/video/jXRBRK_VAwoAAAAAAAAAAAAAK4eUAQBr'
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

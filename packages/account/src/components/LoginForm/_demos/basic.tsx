/**
 * title: 基本使用
 * description: 登录表单
 */

import { LoginForm } from "@web-react/biz-components";

export default () => {
  return (<LoginForm
    agreements={[
      { label: '用户协议', link: "/Account/UserAgreement" },
      { label: '隐私政策', link: "/Account/PrivacyPolicy" }
    ]}
     grantTabs={[]}  
       // onLogin={(values: Record<string, any>) => {
    //   throw new Error("Function not implemented.");
    // }}
    // onGetCaptcha={(mobile: string) => {
    //   throw new Error("Function not implemented.");
    // }}
  />);
};

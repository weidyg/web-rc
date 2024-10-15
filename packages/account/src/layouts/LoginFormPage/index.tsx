import { forwardRef, Ref, useImperativeHandle, useMemo, useState } from "react";
import classNames from "classnames";
import { LoginForm, LoginFormProps } from "../../components";
import { useStyle } from "./style";

type CopyrightProps = { year?: number, company?: string, icp?: string, beian?: string, };
type LoginFormPageProps = LoginFormProps & {
  backgroundImageUrl?: string;
  backgroundVideoUrl?: string;
  footerNav?: { label: string, link: string }[],
  copyright?: CopyrightProps,
};
type LoginFormPageRef = {};

const LoginFormPage = forwardRef((props: LoginFormPageProps, ref: Ref<LoginFormPageRef>) => {
  const {
    // urlPath, 
    // currentUser,
    backgroundImageUrl,
    backgroundVideoUrl,
    footerNav,
    copyright,
    // thirdPartyLogins = [],
    // grantTypes = ['password'],
    // externalProviders = [],
    // allowRememberMe, onLogin, onGetCaptcha,
    ...propRest
  } = props;

  const { prefixCls, wrapSSR, hashId, token } = useStyle();


  useImperativeHandle(ref, () => ({

  }));


  const Footer = () => {
    const { year, company, icp, beian, ...restProps } = copyright || {};
    const endYear = new Date().getFullYear();
    const beianNo = beian?.match(/\d+/g)?.at(0);
    return (
      <div className={classNames(`${prefixCls}-footer`, hashId)} >
        {(footerNav || []).length > 0 &&
          <div className={classNames(`${prefixCls}-footer-nav`, hashId)} >
            {footerNav?.map((nav: any, index: number) => {
              return <a key={index} href={nav.link}>{nav.label}</a>
            })}
          </div>}
        {company && <>
          <div className={classNames(`${prefixCls}-copyright`, hashId)}   {...restProps}>
            <span>Copyright {(!year || year === endYear) ? endYear : `${year}-${endYear}`} © {company}</span>
            {icp && <a target="_blank" href="//beian.miit.gov.cn">{icp}</a>}
            {beian && <a target="_blank" href={`//www.beian.gov.cn/portal/registerSystemInfo?recordcode=${beianNo}`}>
              <span className={classNames(`${prefixCls}-copyright-beian`, hashId)} ></span>
              <span>{beian}</span>
            </a>}
          </div>
        </>}
      </div>
    )
  }
  return wrapSSR(<>
    <div className={classNames(`${prefixCls}`, hashId)}>
      <div style={{
        position: 'relative',
        backgroundImage: backgroundImageUrl && `url("${backgroundImageUrl}")`,
      }}
        className={classNames(`${prefixCls}-container`, hashId)}>
        {backgroundVideoUrl ? (
          <div className={classNames(`${prefixCls}-bgVideo`, hashId)}>
            <video src={backgroundVideoUrl}
              muted={true} controls={false}
              crossOrigin="anonymous"
              loop autoPlay playsInline
            />
          </div>
        ) : null}

        {/* {showHeader && <Header />} */}

        <div className={classNames(`${prefixCls}-container`, hashId)}>
          {/* <div className={classNames(`${prefixCls}-notice`, hashId)}>

          </div> */}
          <div className={classNames(`${prefixCls}-loginbox`, hashId)}>
            <LoginForm {...propRest} />
          </div>
        </div>
        {(footerNav || copyright) && <Footer />}
      </div>
    </div>
  </>);
});

export type { LoginFormPageProps, LoginFormPageRef };
export default LoginFormPage;

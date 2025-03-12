import { SliderPuzzleCaptcha, SliderPuzzleCaptchaData, SliderPuzzleCaptchaVerifyData } from '@web-rc/biz-components';
export default () => {
  async function handleLoad() {
    return new Promise<SliderPuzzleCaptchaData>((resolve) => {
      setTimeout(() => {
        const data = {
          bgImg: "https://static-captcha.aliyuncs.com/qst/PUZZLE/online/493/b729d19d-fbaa-412a-8a7f-f779a4cd6f51/back.png",
          jpImg: "https://static-captcha.aliyuncs.com/qst/PUZZLE/online/493/b729d19d-fbaa-412a-8a7f-f779a4cd6f51/shadow.png",
        };
        resolve(data);
      }, 1000);
    });
  }

  async function handleVerify(data: SliderPuzzleCaptchaVerifyData) {
    return new Promise<boolean>((resolve) => {
      setTimeout(() => {
        resolve(false);
      }, 1000);
    });
  }

  return (
    <>
      <SliderPuzzleCaptcha
        onVerify={handleVerify}
        onLoad={handleLoad}
      />
    </>
  );
};

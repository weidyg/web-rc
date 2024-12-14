/**
 * title: 基本使用
 * description: 基本使用
 */

import { ReactNode, useEffect, useRef, useState } from 'react';
import { SliderPuzzleCaptcha } from '@web-rc/biz-components';
import { PullRequestOutlined } from '@ant-design/icons';
export default () => {
  return (
    <>
      <SliderPuzzleCaptcha
        bgImg="https://static-captcha.aliyuncs.com/qst/PUZZLE/online/493/b729d19d-fbaa-412a-8a7f-f779a4cd6f51/back.png"
        jpImg="https://static-captcha.aliyuncs.com/qst/PUZZLE/online/493/b729d19d-fbaa-412a-8a7f-f779a4cd6f51/shadow.png"
        onVerify={function (): boolean | Promise<boolean> {
          return false;
        }}
        onRefresh={function (): void | Promise<void> {
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve();
            }, 1000);
          });
        }}
      />
    </>
  );
};

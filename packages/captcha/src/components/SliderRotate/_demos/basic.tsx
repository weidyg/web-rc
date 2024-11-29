/**
 * title: 基本使用
 * description: 基本使用
 */

import { ReactNode, useEffect, useRef, useState } from 'react';
import { SliderRotateCaptcha } from '@web-rc/biz-components';
export default () => {
  return (
    <>
      <SliderRotateCaptcha
        src={'https://unpkg.com/@vbenjs/static-source@0.1.7/source/avatar-v1.webp'}
        // onSuccess={() => {
        //   console.log('success');
        // }}
      />
    </>
  );
};

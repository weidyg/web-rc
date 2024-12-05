/**
 * title: 基本使用
 * description: 基本使用
 */

import { ReactNode, useEffect, useRef, useState } from 'react';
import { CaptchaPoint, PointSelectionCaptcha } from '@web-rc/biz-components';
import { Input, InputNumber, message, Switch } from 'antd';

const DEFAULT_CAPTCHA_IMAGE = 'https://unpkg.com/@vbenjs/static-source@0.1.7/source/default-captcha-image.jpeg';
const DEFAULT_HINT_IMAGE = 'https://unpkg.com/@vbenjs/static-source@0.1.7/source/default-hint-image.png';

export default () => {
  const [selectedPoints, setSelectedPoints] = useState<CaptchaPoint[]>([]);
  const [width, setWidth] = useState<number | undefined>();
  const [height, setHeight] = useState<number | undefined>();
  const [bgImgUrl, setBgImgUrl] = useState(DEFAULT_CAPTCHA_IMAGE);
  const [tipImg, setTipImg] = useState(DEFAULT_HINT_IMAGE);
  const [tipText, setTipText] = useState('唇，燕，碴，找');
  const [tipType, setTipType] = useState<'text' | 'image'>('text');

  const handleClick = (point: CaptchaPoint) => {
    setSelectedPoints([...selectedPoints, point]);
  };

  return (
    <>
      <div>
        <Input
          value={bgImgUrl}
          onChange={(e) => setBgImgUrl(e.target.value)}
          placeholder='验证码图片（支持img标签src属性值）'
        />
        <div>
          <Switch
            checked={tipType == 'image'}
            checkedChildren='提示图片'
            unCheckedChildren='提示文本'
            onChange={(checked) => setTipType(checked ? 'image' : 'text')}
          />
          {tipType == 'image' ? <>
            <Input
              value={tipImg}
              onChange={(e) => setTipImg(e.target.value)}
              placeholder='提示图片（支持img标签src属性值）'
            />
          </> : <>
            <Input
              value={tipText}
              onChange={(e) => setTipText(e.target.value)}
              placeholder='提示文本'
            />
          </>}
        </div>
        <div>
          <InputNumber<number>
            min={1} step={1} precision={0}
            placeholder='验证码图片宽度 默认300px'
            value={width}
            onChange={(value) => setWidth(value ?? undefined)}
            addonAfter={'px'}
          />
          <InputNumber<number>
            min={1} step={1} precision={0}
            placeholder='验证码图片高度 默认220px'
            value={height}
            onChange={(value) => setHeight(value ?? undefined)}
            addonAfter={'px'}
          />
        </div>
      </div>

      <PointSelectionCaptcha
        bgImg={bgImgUrl}
        height={height || 220}
        width={width || 400}
        tip={tipType == 'image' ? tipImg : tipText}
        tipType={tipType}
        onClick={handleClick}
      />

      {selectedPoints?.map((point, index) => {
        return (
          <div key={index}>
            <span>索引：{point.i}</span>
            <span>时间戳：{point.t}</span>
            <span>x：{point.x}</span>
            <span>y：{point.y}</span>
          </div>
        );
      })}
    </>
  );
};

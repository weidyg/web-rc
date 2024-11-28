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
  const [params, setParams] = useState<any>({
    captchaImage: '',
    captchaImageUrl: DEFAULT_CAPTCHA_IMAGE,
    height: undefined,
    width: undefined,
    hintImage: '',
    hintImageUrl: DEFAULT_HINT_IMAGE,
    hintText: '唇，燕，碴，找',
    paddingX: undefined,
    paddingY: undefined,
    showConfirm: true,
    showHintImage: false,
    title: '',
  });

  const handleConfirm = (points: CaptchaPoint[], clear: () => void) => {
    message.success({
      content: `captcha points: ${JSON.stringify(points)}`,
    });
    clear();
    setSelectedPoints([]);
  };
  const handleRefresh = () => {
    setSelectedPoints([]);
  };
  const handleClick = (point: CaptchaPoint) => {
    setSelectedPoints([...selectedPoints, point]);
  };

  return (
    <>
      <div>
        <Input
          value={params.title}
          onChange={(e) => setParams({ ...params, title: e.target.value })}
          placeholder='验证码标题文案'
        />

        <Input
          value={params.captchaImageUrl}
          onChange={(e) => setParams({ ...params, captchaImageUrl: e.target.value })}
          placeholder='验证码图片（支持img标签src属性值）'
        />
        <div>
          <Switch
            checked={params.showHintImage}
            checkedChildren='提示图片'
            unCheckedChildren='提示文本'
            onChange={(checked) => setParams({ ...params, showHintImage: checked })}
          />
          {params?.showHintImage ? <>
            <Input
              value={params.hintImageUrl}
              onChange={(e) => setParams({ ...params, hintImageUrl: e.target.value })}
              placeholder='提示图片（支持img标签src属性值）'
            />
          </> : <>
            <Input
              value={params.hintText}
              onChange={(e) => setParams({ ...params, hintText: e.target.value })}
              placeholder='提示文本'
            />
          </>}
          <Switch
            checked={params.showConfirm}
            checkedChildren='展示确认'
            unCheckedChildren='隐藏确认'
            onChange={(checked) => setParams({ ...params, showConfirm: checked })}
          />
        </div>
        <div>
          <InputNumber<number>
            min={1} step={1} precision={0}
            placeholder='验证码图片宽度 默认300px'
            value={params.width}
            onChange={(value) => setParams({ ...params, width: value })}
            addonAfter={'px'}
          />
          <InputNumber<number>
            min={1} step={1} precision={0}
            placeholder='验证码图片高度 默认220px'
            value={params.height}
            onChange={(value) => setParams({ ...params, height: value })}
            addonAfter={'px'}
          />
          <InputNumber<number>
            min={1} step={1} precision={0}
            placeholder='水平内边距 默认12px'
            value={params.paddingX}
            onChange={(value) => setParams({ ...params, paddingX: value })}
            addonAfter={'px'}
          />
          <InputNumber<number>
            min={1} step={1} precision={0}
            placeholder='垂直内边距 默认16px'
            value={params.paddingY}
            onChange={(value) => setParams({ ...params, paddingY: value })}
            addonAfter={'px'}
          />
        </div>
      </div>
      <PointSelectionCaptcha
        captchaImage={params.captchaImageUrl || params.captchaImage}
        height={params.height || 220}
        width={params.width || 400}
        hintImage={params.showHintImage ? params.hintImageUrl || params.hintImage : ''}
        hintText={params.hintText}
        paddingX={params.paddingX}
        paddingY={params.paddingY}
        title={params.title || '请完成安全验证'}
        showConfirm={params.showConfirm}
        onClick={handleClick}
        onConfirm={handleConfirm}
        onRefresh={handleRefresh}
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

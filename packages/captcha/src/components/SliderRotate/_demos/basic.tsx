/**
 * title: 基本使用
 * description: 基本使用
 */

import { SliderRotateCaptcha } from '@web-rc/biz-components';
import { useEffect, useState } from 'react';
export default () => {
  const diffDegree = 20, maxDegree = 300, minDegree = 120;
  const [currentRotate, setCurrentRotate] = useState<number>(0);
  const [randomRotate, setRandomRotate] = useState<number>(0);
  const [base64Image, setBase64Image] = useState<string>('');

  function getRotatedImage(imagePath: string, angleDegrees: number): Promise<string> {
    return new Promise((resolve, reject) => {
      // 创建一个隐藏的 Canvas 元素
      const offscreenCanvas: HTMLCanvasElement = document.createElement('canvas');
      const offscreenCtx: CanvasRenderingContext2D | null = offscreenCanvas.getContext('2d');
      if (!offscreenCtx) {
        reject(new Error('2D context not available'));
        return;
      }

      // 加载图像
      const img: HTMLImageElement = new Image();
      img.crossOrigin = 'anonymous'; // 避免跨域问题
      img.src = imagePath;

      img.onload = () => {
        // 图像的宽度和高度
        const width: number = img.width;
        const height: number = img.height;

        // 设置隐藏 Canvas 的尺寸
        offscreenCanvas.width = width;
        offscreenCanvas.height = height;

        // 将角度转换为弧度
        const angleRadians: number = (angleDegrees * Math.PI) / 180;

        // 保存当前绘图状态
        offscreenCtx.save();

        // 将绘图原点移动到图像中心
        offscreenCtx.translate(width / 2, height / 2);

        // 旋转图像
        offscreenCtx.rotate(angleRadians);

        // 绘制图像
        offscreenCtx.drawImage(img, -width / 2, -height / 2);

        // 恢复之前的绘图状态
        offscreenCtx.restore();

        // 将 Canvas 转换为 Base64 编码的图像字符串
        const base64Image: string = offscreenCanvas.toDataURL('image/png');

        // 返回 Base64 编码的图像字符串
        resolve(base64Image);
      };

      img.onerror = (error) => {
        reject(new Error('Failed to load image: ' + error));
      };
    });
  }

  useEffect(() => {
    handleImgOnLoad();
  }, []);

  // 使用示例
  async function handleImgOnLoad() {
    const ranRotate = Math.floor(minDegree + Math.random() * (maxDegree - minDegree)); // 生成随机角度
    const data = await getRotatedImage('https://unpkg.com/@vbenjs/static-source@0.1.7/source/avatar-v1.webp', ranRotate);
    setRandomRotate(ranRotate);
    setBase64Image(data);
  }

  return (
    <>
      <SliderRotateCaptcha
        src={base64Image}
        maxDegree={maxDegree}
        minDegree={minDegree}
        // onSuccess={() => {
        //   console.log('success');
        // }}
        onMove={(ev, { currentRotate }) => {
          setCurrentRotate(currentRotate);
          // console.log('currentRotate', currentRotate);
        }}
        onVerify={() => {
          return new Promise((resolve) => {
            setTimeout(() => {
              const success = Math.abs(randomRotate - currentRotate) < diffDegree;
              resolve(success);
            }, 1000);
          });
        }}
        onRefresh={handleImgOnLoad}
      />
    </>
  );
};

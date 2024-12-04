import { forwardRef, Ref, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { Button, Card } from 'antd';
import { classNames } from '@web-rc/biz-utils';
import { useStyles } from './style';
import { drawImage } from '../../utils';

export type CaptchaData = {
  x: number;
  y: number;
  t: number;
}
export type CaptchaPoint = CaptchaData & {
  i: number;
}
export type PointSelectionCaptchaCardProps = {
  captchaImage: string;
  height?: number;
  width?: number;
  paddingX?: number | string;
  paddingY?: number | string;
  title?: string;
  onClick?: (e: React.MouseEvent) => void;
};

export type PointSelectionCaptchaProps = Omit<PointSelectionCaptchaCardProps, 'onClick'> & {
  showConfirm?: boolean;
  hintImage?: string;
  hintText?: string;
  onClick?: (point: CaptchaPoint) => void;
  onConfirm?: (points: CaptchaPoint[], clear: () => void) => void;
  onRefresh?: () => void;
};
export type PointSelectionCaptchaRef = {};
const PointSelectionCaptcha = forwardRef((props: PointSelectionCaptchaProps, ref: Ref<PointSelectionCaptchaRef>) => {
  const { captchaImage,
    height = 220, width = 300,
    paddingX = 12, paddingY = 16,
    onClick, onRefresh, onConfirm,
    hintImage, hintText, showConfirm,
    title,
    ...restProps } = props;

  const { prefixCls, wrapSSR, hashId, token } = useStyles();
  const imgRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    drawImage(imgRef.current, captchaImage, { width, height });
  }, [captchaImage]);

  useImperativeHandle(ref, () => ({}));

  const POINT_OFFSET = 11;
  const [points, setPoints] = useState<CaptchaPoint[]>([]);
  function getElementPosition(element: HTMLElement) {
    const rect = element.getBoundingClientRect();
    return {
      x: rect.left + window.scrollX,
      y: rect.top + window.scrollY,
    };
  }

  function handleClick(e: React.MouseEvent) {
    try {
      const dom = e.currentTarget as HTMLElement;
      if (!dom) throw new Error('Element not found');
      const { x: domX, y: domY } = getElementPosition(dom);
      const mouseX = e.clientX + window.scrollX;
      const mouseY = e.clientY + window.scrollY;
      if (typeof mouseX !== 'number' || typeof mouseY !== 'number') {
        throw new TypeError('Mouse coordinates not found');
      }
      const xPos = mouseX - domX;
      const yPos = mouseY - domY;
      const rect = dom.getBoundingClientRect();
      // 点击位置边界校验
      if (xPos < 0 || yPos < 0 || xPos > rect.width || yPos > rect.height) {
        console.warn('Click position is out of the valid range');
        return;
      }
      const x = Math.ceil(xPos);
      const y = Math.ceil(yPos);
      const point = { i: points.length, t: Date.now(), x, y, };
      setPoints([...points, point])
      onClick?.(point);
      e.stopPropagation();
      e.preventDefault();
    } catch (error) {
      console.error('Error in handleClick:', error);
    }
  }

  function clear() {
    try {
      setPoints([]);
    } catch (error) {
      console.error('Error in clear:', error);
    }
  }

  function handleRefresh() {
    try {
      clear();
      onRefresh?.();
    } catch (error) {
      console.error('Error in handleRefresh:', error);
    }
  }

  function handleConfirm() {
    if (!showConfirm) return;
    try {
      onConfirm?.(points, clear);
    } catch (error) {
      console.error('Error in handleConfirm:', error);
    }
  }


  const parseValue = (value: number | string) => {
    if (typeof value === 'number') { return value; }
    const parsed = Number.parseFloat(value);
    return Number.isNaN(parsed) ? 0 : parsed;
  };

  const rootStyles = useMemo(() => ({
    padding: `${parseValue(paddingY)}px ${parseValue(paddingX)}px`,
    width: `${parseValue(width) + parseValue(paddingX) * 2}px`,
  }), [width, paddingX, paddingY]);

  return wrapSSR(<>
    {/* <Card
      title={title || '请完成安全验证'}
      extra={<>
        <Button onClick={handleRefresh}>刷新验证码</Button>
        {showConfirm &&
          <Button onClick={handleConfirm}>确认选择</Button>
        }
      </>}
      style={{
        width: 'fit-content'
      }}
      styles={{
        body: rootStyles
      }}
    > */}
    <div className={classNames(`${prefixCls}-container`, hashId)}>
      <div className={classNames(`${prefixCls}`, hashId)}>
        {/* <img
          src={captchaImage}
          onClick={handleClick}
          style={{ width, height, }}
          className={classNames(`${prefixCls}-img`, hashId)}
        /> */}
        <canvas
          ref={imgRef}
          onClick={handleClick}
          style={{ width, height, }}
          className={classNames(`${prefixCls}-img`, hashId)}
        />
        <div style={{ position: 'absolute', inset: 0 }}>
          {points?.map((point, index) => {
            return (
              <div key={index}
                style={{
                  top: `${point.y - POINT_OFFSET}px`,
                  left: `${point.x - POINT_OFFSET}px`,
                }}
                className={classNames(`${prefixCls}-point`, hashId)}
              >
                {index + 1}
              </div>
            );
          })}
        </div>
      </div>
      <div className={classNames(`${prefixCls}-hint`, hashId)}>
        {hintImage ? (
          <img src={hintImage}
            className={classNames(`${prefixCls}-hint-img`, hashId)}
          />
        ) : (hintText ? (
          <div className={classNames(`${prefixCls}-hint-text`, hashId)}>
            {`请依次点击【${hintText}】`}
          </div>
        ) : undefined)}
      </div>
    </div>
    {/* </Card> */}
  </>);
});



export default PointSelectionCaptcha;

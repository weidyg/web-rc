import { forwardRef, Ref, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { classNames } from '@web-rc/biz-utils';
import { useStyles } from './style';
import { drawImage, getElementPosition } from '../../utils';
import ActionButton, { ActionButtonProps } from '../ActionButton';
import { ReloadOutlined } from '@ant-design/icons';

const POINT_OFFSET = 11;
export type CaptchaPoint = {
  i: number;
  x: number;
  y: number;
  t: number;
};
export type PointSelectionCaptchaProps = {
  tip: string;
  tipType: 'text' | 'image';
  bgImg?: string;
  height?: number;
  width?: number;
  onClick?: (data: CaptchaPoint) => void;
  onVerify: () => boolean | Promise<boolean>;
  onRefresh?: () => void | Promise<void>;
  actions?: ActionButtonProps[];
};

export type PointSelectionCaptchaRef = {
  clear: () => void;
  getPoints: () => CaptchaPoint[];
};

const PointSelectionCaptcha = (props: PointSelectionCaptchaProps, ref: Ref<PointSelectionCaptchaRef>) => {
  const { bgImg, tip, tipType, width, height, onClick, onVerify, onRefresh, actions = [], ...restProps } = props;

  const { prefixCls, wrapSSR, hashId, token } = useStyles();
  const imgBgRef = useRef<HTMLCanvasElement>(null);
  const [points, setPoints] = useState<CaptchaPoint[]>([]);
  const [isPassed, setIsPassed] = useState<boolean | undefined>();

  useEffect(() => {
    handleRefresh();
  }, []);

  useEffect(() => {
    drawImage(imgBgRef.current, bgImg, { width, height });
  }, [bgImg]);

  function handleClick(e: React.MouseEvent) {
    try {
      const dom = e.currentTarget as HTMLElement;
      if (!dom) {
        throw new Error('Element not found');
      }
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
      const point = { i: points.length, t: Date.now(), x, y };
      setPoints([...points, point]);
      onClick?.(point);
      e.stopPropagation();
      e.preventDefault();
    } catch (error) {
      console.error('Error in handleClick:', error);
    }
  }

  async function handleRefresh() {
    handleReset();
    await onRefresh?.();
  }

  function handleReset() {
    setPoints([]);
  }

  useImperativeHandle(ref, () => ({
    clear: () => {
      handleReset();
    },
    getPoints: () => {
      return points;
    },
  }));

  return wrapSSR(
    <>
      <div className={classNames(`${prefixCls}-container`, hashId)}>
        <div className={classNames(`${prefixCls}`, hashId)}>
          {isPassed === undefined && (
            <div className={classNames(`${prefixCls}-actions`, hashId)}>
              <ActionButton
                title="刷新"
                onClick={handleRefresh}
                icon={<ReloadOutlined />}
                className={classNames(`${prefixCls}-action`, hashId)}
              />
              {actions.map(({ title, icon, onClick }, i) => (
                <ActionButton
                  key={i}
                  title={title}
                  onClick={onClick}
                  icon={icon}
                  className={classNames(`${prefixCls}-action`, hashId)}
                />
              ))}
            </div>
          )}
          <canvas ref={imgBgRef} onClick={handleClick} className={classNames(`${prefixCls}-img`, hashId)} />
          <div style={{ position: 'absolute', inset: 0 }}>
            {points?.map((point, index) => {
              return (
                <div
                  key={index}
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
        <div className={classNames(`${prefixCls}-tip`, hashId)}>
          {tipType === 'image' ? (
            <img src={tip} className={classNames(`${prefixCls}-tip-img`, hashId)} />
          ) : tipType === 'text' ? (
            <div className={classNames(`${prefixCls}-tip-text`, hashId)}>{`请依次点击【${tip}】`}</div>
          ) : undefined}
        </div>
      </div>
    </>,
  );
};

export default forwardRef(PointSelectionCaptcha);

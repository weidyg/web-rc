import { forwardRef, Ref, useImperativeHandle, useMemo, useState } from 'react';
import { useStyles } from './style';
import { Button, Card } from 'antd';

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
  height?: number | string;
  width?: number | string;
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
  const { captchaImage, height = 220, width = 300, paddingX = 12, paddingY = 16,
    onClick, onRefresh, onConfirm,
    hintImage, hintText, showConfirm,
    title,
    ...restProps } = props;

  const { prefixCls, wrapSSR, hashId, token } = useStyles();

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
    <Card
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
    >

      <div style={{
        position: 'relative',
        display: 'flex',
        width: '100%',
        overflow: 'hidden',
        borderRadius: token.borderRadius,
        padding: 0,
      }}>
        <img
          style={{
            width, height,
            position: 'relative',
            zIndex: 10,
          }}
          src={captchaImage}
          onClick={handleClick}
        />
        <div style={{ position: 'absolute', inset: 0 }}>
          {points?.map((point, index) => {
            return (
              <div key={index}
                style={{
                  top: `${point.y - POINT_OFFSET}px`,
                  left: `${point.x - POINT_OFFSET}px`,

                  color: token.colorBgElevated,
                  backgroundColor: token.colorPrimary,
                  borderColor: token.colorBgElevated,
                  borderRadius: '50%',
                  border: `2px solid ${token.colorBgElevated}`,

                  position: 'absolute',
                  zIndex: 20,
                  width: '1.25rem',
                  height: '1.25rem',
                  cursor: 'default',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {index + 1}
              </div>
            );
          })}
        </div>
      </div>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: '.5rem',
        padding: 0,
      }}>
        {hintImage
          ? (<img
            src={hintImage}
            className="border-border h-10 w-full rounded border"
            style={{
              border: `1px solid ${token.colorBorder}`,
              borderRadius: token.borderRadius,
              height: '2.5rem',
              width: '100%',
            }}
          />)
          : (hintText
            ? (<div
              style={{
                border: `1px solid ${token.colorBorder}`,
                borderRadius: token.borderRadius,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '2.5rem',
                width: '100%',
                objectFit: 'contain',
              }}
            >
              {`请依次点击【${hintText}】`}
            </div>)
            : undefined
          )
        }
      </div>

    </Card>

  </>);
});



export default PointSelectionCaptcha;

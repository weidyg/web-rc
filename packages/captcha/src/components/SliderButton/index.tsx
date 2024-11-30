import { CSSProperties, forwardRef, Ref, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { CheckOutlined, DoubleRightOutlined } from '@ant-design/icons';
import { classNames, useMergedState } from '@web-rc/biz-utils';
import { useStyles } from './style';
import { getOffset } from './_utils';

type DragEvent = React.MouseEvent<HTMLDivElement, MouseEvent> | React.TouchEvent<HTMLDivElement>;
export type SliderButtonCaptchaProps = {
  className?: string;
  wrapperStyle?: CSSProperties;
  barStyle?: CSSProperties;
  contentStyle?: CSSProperties;
  actionStyle?: CSSProperties;
  successText?: string;
  text?: string;
  onStart?: (event: DragEvent) => void;
  onMove?: (obj: { event: DragEvent, moveDistance: number, moveX: number }) => void;
  onEnd?: (event: DragEvent) => void;
};
export type SliderButtonCaptchaRef = {};
const SliderButtonCaptcha = forwardRef((props: SliderButtonCaptchaProps, ref: Ref<SliderButtonCaptchaRef>) => {
  const { className, wrapperStyle, barStyle, contentStyle, actionStyle,
    successText = '验证通过', text = '请按住滑块拖动',
    onStart, onMove, onEnd,
    ...restProps } = props;

  const { prefixCls, wrapSSR, hashId, token } = useStyles();

  useImperativeHandle(ref, () => ({}));

  const wrapperRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const actionRef = useRef<HTMLDivElement>(null);

  // const [toLeft, setToLeft] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const [isPassing, setIsPassing] = useState(false);
  const [moveDistance, setMoveDistance] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);

  const modelValue = useRef<boolean>(false);
  const isSlot = true;
  useEffect(() => {
    if (isPassing) {
      const time = (endTime - startTime) / 1000;
      // emit('success', { isPassing, time: time.toFixed(1) });
      modelValue.current = isPassing;
    }
  }, [isPassing]);

  function handleDragStart(event: DragEvent) {
    console.log('handleDragStart', event);
    if (isPassing) { return; }
    if (!actionRef.current) { return; }
    onStart?.(event);
    const eventPageX = getEventPageX(event);
    const actionLeft = Number.parseInt(actionRef.current.style.left.replace('px', '') || '0', 10,);
    setIsMoving(true);
    setStartTime(Date.now());
    setMoveDistance(eventPageX - actionLeft);
  }
  function handleDragMoving(event: DragEvent): void {
    if (isMoving) {
      const wrapperEl = wrapperRef?.current;
      const actionEl = actionRef?.current;
      const barEl = barRef?.current;
      if (!actionEl || !barEl || !wrapperEl) { return; }
      const { actionWidth, offset, wrapperWidth } = getOffset(wrapperEl, actionEl);
      const moveX = getEventPageX(event) - moveDistance;

      onMove?.({ event, moveDistance, moveX });
      if (moveX > 0 && moveX <= offset) {
        actionEl.style.left = `${moveX}px`;
        barEl.style.width = `${moveX + actionWidth / 2}px`;
      } else if (moveX > offset) {
        actionEl.style.left = `${wrapperWidth - actionWidth}px`;
        barEl.style.width = `${wrapperWidth - actionWidth / 2}px`;
        if (!isSlot) {
          checkPass();
        }
      }
    }
  }
  function handleDragOver(event: DragEvent): void {
    if (isMoving && !isPassing) {
      onEnd?.(event);
      
      const wrapperEl = wrapperRef?.current;
      const actionEl = actionRef?.current;
      const barEl = barRef?.current;
      if (!actionEl || !barEl || !wrapperEl) { return; }
      const { actionWidth, offset, wrapperWidth } = getOffset(wrapperEl, actionEl);
      const moveX = getEventPageX(event) - moveDistance;

      if (moveX < offset) {
        if (isSlot) {
          setTimeout(() => {
            if (modelValue.current) {
              const contentEl = contentRef?.current;
              if (contentEl) {
                contentEl.style.width = `${Number.parseInt(barEl.style.width)}px`;
              }
            } else {
              resume();
            }
          }, 0);
        } else {
          resume();
        }
      } else {
        actionEl.style.left = `${wrapperWidth - actionWidth}px`;
        barEl.style.width = `${wrapperWidth - actionWidth / 2}px`;
        checkPass();
      }
      setIsMoving(false);
    }
  }

  function checkPass() {
    if (isSlot) {
      resume();
      return;
    }
    setEndTime(Date.now());
    setIsPassing(true);
    setIsMoving(false);
  }


  function resume() {
    setIsMoving(false);
    setIsPassing(false);
    setMoveDistance(0);
    toggleTransitionCls(false);
    setStartTime(0);
    setEndTime(0);
    const actionEl = actionRef?.current;
    const barEl = barRef?.current;
    const contentEl = contentRef?.current;
    if (!actionEl || !barEl || !contentEl) { return; }
    contentEl.style.width = '100%';
    toggleTransitionCls(true);
    setTimeout(() => {
      toggleTransitionCls(false);
      actionEl.style.left = '0px';
      barEl.style.width = '0px';
    }, 500);
  }
  function toggleTransitionCls(value: boolean) {
    const actionEl = actionRef?.current;
    const barEl = barRef?.current;
    if (!actionEl || !barEl) { return; }
    actionEl.classList[value ? 'add' : 'remove'](`transition-left`);
    barEl.classList[value ? 'add' : 'remove'](`transition-width`);
  }

  function getEventPageX(e: DragEvent): number {
    if ('pageX' in e) {
      return e.pageX;
    } else if ('touches' in e && e.touches[0]) {
      return e.touches[0].pageX;
    }
    return 0;
  }

  return wrapSSR(<>
    startTime：{startTime}<br />
    endTime：{endTime}<br />
    moveDistance：{moveDistance}<br />
    isMoving：{isMoving + ''}<br />

    <div ref={wrapperRef}
      style={wrapperStyle}
      className={classNames(`${prefixCls}-wrapper`, prefixCls, className, hashId)}
      onMouseUp={handleDragOver}
      onMouseLeave={handleDragOver}
      onMouseMove={handleDragMoving}
      onTouchMove={handleDragMoving}
      onTouchEnd={handleDragOver}
    >
      <div
        ref={barRef}
        style={barStyle}
        className={classNames(`${prefixCls}-bar`, hashId)} />

      <div ref={contentRef}
        style={contentStyle}
        className={classNames(`${prefixCls}-content`, hashId, {
          [`isPassing`]: isPassing,
        })}>
        <div className={classNames(`${prefixCls}-content-text`, hashId)}>
          {isPassing ? successText : text}
        </div>
      </div>

      <div
        ref={actionRef}
        style={actionStyle}
        className={classNames(`${prefixCls}-action`, hashId, {
          [`dragging`]: true,
        })}
        onMouseDown={handleDragStart}
        onTouchStart={handleDragStart}
      >
        {isPassing ? <CheckOutlined /> : <DoubleRightOutlined />}
      </div>

    </div>
  </>);
});
export default SliderButtonCaptcha;

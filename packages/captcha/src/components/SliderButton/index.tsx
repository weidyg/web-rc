import { CSSProperties, forwardRef, Ref, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { CheckOutlined, CloseOutlined, DoubleRightOutlined, LoadingOutlined } from '@ant-design/icons';
import { classNames } from '@web-rc/biz-utils';
import { useStyles } from './style';
import { getEventPageCoordinate, getOffset } from './_utils';

export type SliderCaptchaData = {};
export type SliderEvent = React.MouseEvent<HTMLDivElement, MouseEvent> | React.TouchEvent<HTMLDivElement>;
export type SliderButtonCaptchaProps = {
  className?: string;
  wrapperStyle?: CSSProperties;
  barStyle?: CSSProperties;
  contentStyle?: CSSProperties;
  actionStyle?: CSSProperties;
  successText?: string;
  text?: string;
  onStart?: (event: SliderEvent) => void;
  onMove?: (obj: { event: SliderEvent, moveDistance: number, moveX: number }) => void;
  onEnd?: (event: SliderEvent) => void;

  /**
 * @zh 滑动结束回调
 * @en Slider End Callback
 */
  onVerify: (data: SliderCaptchaData) => boolean | Promise<boolean>;
};
export type SliderButtonCaptchaRef = {};
const SliderButtonCaptcha = forwardRef((props: SliderButtonCaptchaProps, ref: Ref<SliderButtonCaptchaRef>) => {
  const { className, wrapperStyle, barStyle, contentStyle, actionStyle,
    successText = '验证通过', text = '请按住滑块拖动',
    onStart, onMove, onEnd, onVerify,
    ...restProps } = props;

  const { prefixCls, wrapSSR, hashId, token } = useStyles();

  const wrapperRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const actionRef = useRef<HTMLDivElement>(null);
  const isSlideToTheEnd = useRef<boolean>(false);
  const [isMoving, setIsMoving] = useState<boolean | undefined>(undefined);
  const [verifying, setVerifying] = useState<boolean | undefined>(undefined);
  const [isPassed, setIsPassed] = useState<boolean | undefined>(undefined);
  const [moveDistance, setMoveDistance] = useState(0);

  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [tracks, setTracks] = useState<any[]>([]);

  const onlySliderButton = false;
  function handleDragStart(event: SliderEvent) {
    if (isPassed) { return; }
    if (!actionRef.current) { return; }
    onStart?.(event);
    const [eventPageX, _] = getEventPageCoordinate(event);
    const actionLeft = Number.parseInt(actionRef.current.style.left.replace('px', '') || '0', 10,);
    setIsMoving(true);
    setStartTime(Date.now());
    setMoveDistance(eventPageX - actionLeft);
  }
  function handleDragMoving(event: SliderEvent): void {
    if (isMoving) {
      const wrapperEl = wrapperRef?.current;
      const actionEl = actionRef?.current;
      const barEl = barRef?.current;
      if (!actionEl || !barEl || !wrapperEl) { return; }
      const { actionWidth, offset, wrapperWidth } = getOffset(wrapperEl, actionEl);
      const [eventPageX, _] = getEventPageCoordinate(event);
      const moveX = eventPageX - moveDistance;
      onMove?.({ event, moveDistance, moveX });
      isSlideToTheEnd.current = false;
      if (moveX > 0 && moveX <= offset) {
        actionEl.style.left = `${moveX}px`;
        barEl.style.width = `${moveX + actionWidth / 2}px`;
      } else if (moveX > offset) {
        actionEl.style.left = `${wrapperWidth - actionWidth}px`;
        barEl.style.width = `${wrapperWidth - actionWidth / 2}px`;
        isSlideToTheEnd.current = true;
      }
    }
  }
  async function handleDragOver(event: SliderEvent): Promise<void> {
    if (isMoving && isPassed === undefined) {
      setIsMoving(false);
      setVerifying(true);
      setEndTime(Date.now());
      onEnd?.(event);
      let isPassed = false;
      try {
        const isReset = onlySliderButton && !isSlideToTheEnd?.current;
        if (isReset) { reset(); return; }
        const data: SliderCaptchaData = {};
        isPassed = await onVerify(data);
      } catch (error) {
        console.error(error);
      } finally {
        setVerifying(false);
      }
      if (!isPassed) { setTimeout(() => { handleRefresh(); }, 300); }
      setIsPassed(isPassed);
    }
  }

  function handleRefresh() {
    reset();
    // setStatus('loading');
    // try {
    //   const data = await onGetData();
    //   setImages(data);
    //   setStatus('loaded');
    // } catch (error) {
    //   setStatus('loadfail');
    //   console.log(error);
    // }
  }

  function reset() {
    setStartTime(0);
    setEndTime(0);
    setMoveDistance(0);
    setIsMoving(undefined);
    setVerifying(undefined);
    setIsPassed(undefined);
    isSlideToTheEnd.current = false;
    const actionEl = actionRef?.current;
    const barEl = barRef?.current;
    const contentEl = contentRef?.current;
    if (!actionEl || !barEl || !contentEl) { return; }
    contentEl.style.width = '100%';
    toggleTransitionCls(actionEl, barEl, true);
    setTimeout(() => {
      toggleTransitionCls(actionEl, barEl, false);
      actionEl.style.left = '0px';
      barEl.style.width = '0px';
    }, 500);
  }
  function toggleTransitionCls(
    actionEl: HTMLDivElement | null,
    barEl: HTMLDivElement | null,
    value: boolean) {
    actionEl?.classList[value ? 'add' : 'remove'](`transition-left`);
    barEl?.classList[value ? 'add' : 'remove'](`transition-width`);
  }

  useImperativeHandle(ref, () => ({}));

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
      <div ref={contentRef}
        style={contentStyle}
        className={classNames(`${prefixCls}-content`, hashId, {
          [`isPassing`]: isPassed,
        })}>
        <div className={classNames(`${prefixCls}-content-text`, hashId)}>
          {isPassed ? successText : text}
        </div>
      </div>

      <div
        ref={barRef}
        style={barStyle}
        className={classNames(`${prefixCls}-bar`, hashId)}
      />

      <div
        ref={actionRef}
        style={actionStyle}
        className={classNames(`${prefixCls}-action`, hashId, {
          [`dragging`]: true,
        })}
        onMouseDown={handleDragStart}
        onTouchStart={handleDragStart}
      >
        {verifying
          ? <LoadingOutlined />
          : isPassed === true
            ? <CheckOutlined />
            : isPassed === false
              ? <CloseOutlined />
              : <DoubleRightOutlined />
        }
      </div>

    </div>
  </>);
});
export default SliderButtonCaptcha;

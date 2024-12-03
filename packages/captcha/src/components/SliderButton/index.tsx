import { CSSProperties, forwardRef, Ref, useImperativeHandle, useRef, useState } from 'react';
import { CheckOutlined, CloseOutlined, DoubleRightOutlined, LoadingOutlined } from '@ant-design/icons';
import { classNames } from '@web-rc/biz-utils';
import { useStyles } from './style';
import { getSliderEvent, getOffset } from './_utils';

export type MouseOrTouchEvent<T = HTMLDivElement> = React.MouseEvent<T, MouseEvent> | React.TouchEvent<T>;
export type SliderEvent = {
  target: EventTarget;
  screenX: number; screenY: number;
  clientX: number; clientY: number;
  pageX: number; pageY: number;
};
export type SliderButtonCaptchaProps = {
  className?: string;
  style?: CSSProperties;
  styles?: {
    bar?: CSSProperties;
    action?: CSSProperties;
    content?: CSSProperties;
  }
  successText?: string;
  text?: string;
  onlySliderButton?: boolean;
  failedResetTimeout?: number;
  onStart?: (event: SliderEvent) => void;
  onMove?: (event: SliderEvent, data: { moveDistance: number, moveX: number }) => void;
  onEnd?: (event: SliderEvent) => void;
  onVerify: () => boolean | Promise<boolean>;
};
export type SliderButtonCaptchaRef = {
  reset: () => void
};
const SliderButtonCaptcha = forwardRef((props: SliderButtonCaptchaProps, ref: Ref<SliderButtonCaptchaRef>) => {
  const { className, style, styles, onlySliderButton = true,
    successText = '验证通过', text = '请按住滑块拖动',
    onStart, onMove, onEnd, onVerify,
    failedResetTimeout = 300, ...restProps } = props;

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

  function handleDragStart(event: MouseOrTouchEvent) {
    if (isPassed) { return; }
    const actionEl = actionRef?.current;
    if (!actionEl) { return; }
    const ev = getSliderEvent(event);
    onStart?.(ev);
    setIsMoving(true);
    const actionLeft = Number.parseInt(actionEl.style.left.replace('px', '') || '0', 10);
    setMoveDistance(ev.pageX - actionLeft);
  }
  function handleDragMoving(event: MouseOrTouchEvent): void {
    if (isMoving) {
      const wrapperEl = wrapperRef?.current;
      const actionEl = actionRef?.current;
      const barEl = barRef?.current;
      if (!actionEl || !barEl || !wrapperEl) { return; }
      const ev = getSliderEvent(event);
      const moveX = ev.pageX - moveDistance;
      onMove?.(ev, { moveDistance, moveX });
      const { actionWidth, offset, wrapperWidth } = getOffset(wrapperEl, actionEl);
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
  async function handleDragOver(event: MouseOrTouchEvent): Promise<void> {
    if (isMoving && isPassed === undefined) {
      setIsMoving(false);
      setVerifying(true);
      const ev = getSliderEvent(event);
      onEnd?.(ev);
      let isPassed = false;
      try {
        const isReset = onlySliderButton && !isSlideToTheEnd?.current;
        if (isReset) { reset(); return; }
        isPassed = await onVerify();
      } catch (error) {
        console.error(error);
      } finally {
        setVerifying(false);
      }
      if (!isPassed) {
        setTimeout(() => {
          handleRefresh();
        }, failedResetTimeout);
      }
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
    // setStartTime(0);
    // setEndTime(0);
    // setTracks([]);
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

  useImperativeHandle(ref, () => ({
    reset,
  }));

  return wrapSSR(<>
    <div ref={wrapperRef}
      style={style}
      className={classNames(`${prefixCls}-wrapper`, prefixCls, className, hashId)}
      onMouseUp={handleDragOver}
      onMouseLeave={handleDragOver}
      onMouseMove={handleDragMoving}
      onTouchMove={handleDragMoving}
      onTouchEnd={handleDragOver}
    >
      <div ref={contentRef}
        style={styles?.content}
        className={classNames(`${prefixCls}-content`, hashId, {
          // [`isPassing`]: isPassed,
        })}>
        {!isMoving && !verifying && isPassed === undefined &&
          <div className={classNames(`${prefixCls}-content-text`, hashId)}>
            {isPassed ? successText : text}
          </div>
        }
      </div>

      <div
        ref={barRef}
        style={{
          ...styles?.bar,
          backgroundColor: isPassed === false
            ? token.colorErrorBgHover
            : token.colorSuccessBgHover
        }}
        className={classNames(`${prefixCls}-bar`, hashId)}
      />

      <div
        ref={actionRef}
        style={{
          ...styles?.action,
          cursor: isMoving ? 'move' : 'pointer',
          color: isPassed === undefined
            ? token.colorText
            : token.colorBgElevated,
          backgroundColor: isPassed === false
            ? token.colorError
            : isPassed === true
              ? token.colorSuccess
              : undefined
        }}
        className={classNames(`${prefixCls}-action`, hashId)}
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

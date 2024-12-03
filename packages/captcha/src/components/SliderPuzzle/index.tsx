import { CSSProperties, forwardRef, Ref, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { classNames } from '@web-rc/biz-utils';
import { useStyles } from './style';
import SliderButton, { SliderButtonCaptchaRef, SliderEvent } from '../SliderButton';
import { drawImage } from './_utils';
import { setAlpha } from '@web-rc/biz-provider';

export type SliderPuzzleCaptchaProps = {
  defaultTip?: string;


  bgImg?: string;
  width?: number;
  height?: number;
  jpImg?: string;
  onStart?: (event: SliderEvent) => void;
  onMove?: (event: SliderEvent) => void;
  onEnd?: (event: SliderEvent) => void;
  onVerify: () => boolean | Promise<boolean>;
  onRefresh?: () => void | Promise<void>;
};
export type SliderPuzzleCaptchaRef = {};
const SliderPuzzleCaptcha = forwardRef((props: SliderPuzzleCaptchaProps, ref: Ref<SliderPuzzleCaptchaRef>) => {
  const {
    defaultTip,
    bgImg, width = 300, height = 200,
    jpImg,
    onStart, onMove, onEnd, onVerify, onRefresh, ...restProps } = props;
  const { prefixCls, wrapSSR, hashId, token } = useStyles();


  const bgImgRef = useRef<HTMLCanvasElement>(null);
  const jpImgRef = useRef<HTMLCanvasElement>(null);
  const slideBarRef = useRef<SliderButtonCaptchaRef>(null);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [isPassed, setIsPassed] = useState<boolean | undefined>();
  const [dragging, setDragging] = useState<boolean>(false);

  useEffect(() => {
    reset();
  }, []);

  function handleStart(ev: SliderEvent) {
    setIsPassed(undefined);
    setDragging(true);
    setStartTime(Date.now());
    onStart?.(ev);
  }
  function handleDragBarMove(ev: SliderEvent, data: { moveDistance: number, moveX: number }) {
    if (jpImgRef.current) {
      jpImgRef.current.style.left = `${ev.pageX - data.moveDistance}px`;
    }
    onMove?.(ev);
  }
  function handleDragEnd(ev: SliderEvent) {
    setEndTime(Date.now());
    onEnd?.(ev);
  }
  async function handleVerify() {
    const isPassed = await onVerify();
    if (isPassed) {
      setIsPassed(true);
    } else {
      setIsPassed(false);
      toggleTransitionCls(true);
      setTimeout(() => {
        toggleTransitionCls(false);
        setIsPassed(undefined);
      }, 300);
    }
    setDragging(false);
    return isPassed;
  }

  async function reset() {
    setIsPassed(undefined);
    slideBarRef?.current?.reset();
    await onRefresh?.();
  }

  useEffect(() => {
    drawImage(bgImgRef.current, bgImg, { width, height });
  }, [bgImg]);

  useEffect(() => {
    drawImage(jpImgRef.current, jpImg, { width: 52, height });
  }, [jpImg]);

  function toggleTransitionCls(value: boolean) {
    jpImgRef?.current?.classList[value ? 'add' : 'remove'](`transition-width`);
  }

  useImperativeHandle(ref, () => ({}));

  return wrapSSR(<>
    <div className={classNames(prefixCls, hashId)}>
      <div
        style={{
          height: `${height}px`,
          width: `${width}px`,

          background: 'rgba(0, 0, 0, 0.08)',
          position: 'relative',
          // margin: '8px 0',
          // borderRadius: '5px',
          overflow: 'hidden'
        }}
        className={classNames(`${prefixCls}-img-wrapper`, hashId)}

      >
        <canvas ref={bgImgRef}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            margin: '0 auto',
            userSelect: 'none',
            msUserSelect: 'none',
            WebkitUserSelect: 'none',
            MozUserSelect: 'none',
            WebkitTouchCallout: 'none',
          }}
        />
        <canvas ref={jpImgRef}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            margin: '0 auto',
            userSelect: 'none',
            msUserSelect: 'none',
            WebkitUserSelect: 'none',
            MozUserSelect: 'none',
            WebkitTouchCallout: 'none',
          }}
        />
        <div className={classNames(`${prefixCls}-img-tip`, hashId)}>
          {(isPassed !== undefined || !dragging) && (
            <div style={{
              background: isPassed !== undefined
                ? setAlpha(isPassed ? token.colorSuccess : token.colorError, 0.45)
                : token.colorBgMask,
            }}
            >
              {isPassed !== undefined ? (
                isPassed
                  ? `验证成功，耗时${((endTime - startTime) / 1000).toFixed(1)}秒`
                  : `验证失败`
              ) : (
                defaultTip || '点击图片可刷新'
              )}
            </div>
          )}
        </div>
      </div >
      <SliderButton
        ref={slideBarRef}
        onlySliderButton={false}
        onStart={handleStart}
        onMove={handleDragBarMove}
        onEnd={handleDragEnd}
        onVerify={handleVerify}
        style={{ width: `${width}px`, marginTop: '1.25rem' }}
      />
    </div>
  </>);
});
export default SliderPuzzleCaptcha;

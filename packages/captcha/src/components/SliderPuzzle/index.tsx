import { CSSProperties, forwardRef, Ref, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { classNames } from '@web-rc/biz-utils';
import { useStyles } from './style';
import SliderButton, { MoveingData, SliderButtonCaptchaRef, SliderEvent } from '../SliderButton';
import { drawImage } from './_utils';
import { setAlpha } from '@web-rc/biz-provider';
import { console } from 'inspector';

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
    bgImg,
    jpImg,
    onStart, onMove, onEnd, onVerify, onRefresh, ...restProps } = props;
  const { prefixCls, wrapSSR, hashId, token } = useStyles();

  const [width, setWidth] = useState(props.width);
  const [height, setHeight] = useState(props.height);

  const imgWapRef = useRef<HTMLDivElement>(null);
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
  function handleDragBarMove(ev: SliderEvent, data: MoveingData) {
    if (jpImgRef.current && !data.isTheEnd) {
      jpImgRef.current.style.left = `${data.moveX}px`;
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
  function handleReset() {
    setIsPassed(undefined);
    const jpImgEl = jpImgRef?.current;
    if (!jpImgEl) { return; }
    toggleTransitionCls(true);
    setTimeout(() => {
      toggleTransitionCls(false);
      jpImgEl.style.left = '0px';
    }, 300);
  }

  async function reset() {
    slideBarRef?.current?.reset();
    await onRefresh?.();
  }

  useEffect(() => {
    init();
  }, [props.width, props.height, bgImg, jpImg]);


  const init = async () => {
    const { width, height } = await drawImage();
    setWidth(width);
    setHeight(height);
  }

  const drawImage = (pixel?: { width?: number, height?: number }) => {
    return new Promise<{ width?: number, height?: number }>((resolve) => {
      const bgCanvas = bgImgRef.current;
      const jpCanvas = jpImgRef.current;
      if (bgCanvas && jpCanvas && bgImg && jpImg) {
        const bgEl = new Image(pixel?.width, pixel?.height);
        bgEl.src = bgImg;
        bgEl.onload = function () {
          bgEl.width = bgEl.width > 0 ? bgEl.width : bgEl.naturalWidth;
          bgEl.height = bgEl.height > 0 ? bgEl.height : bgEl.naturalHeight;
          bgCanvas.width = pixel?.width ? bgEl.width : bgEl.width * (bgEl.height / bgEl.naturalHeight);;
          bgCanvas.height = pixel?.height ? bgEl.height : bgEl.height * (bgEl.width / bgEl.naturalWidth);
          bgCanvas.getContext("2d")?.drawImage(bgEl, 0, 0, bgCanvas.width, bgCanvas.height);

          const jpEl = new Image();
          jpEl.src = jpImg;
          jpEl.onload = function () {
            jpCanvas.width = jpEl.naturalWidth * (bgCanvas.width / bgEl.naturalWidth);
            jpCanvas.height = jpEl.naturalHeight * (bgCanvas.height / bgEl.naturalHeight);
            jpCanvas.getContext("2d")?.drawImage(jpEl, 0, 0, jpCanvas.width, jpCanvas.height);
          }
          const { width, height } = bgCanvas;
          resolve({ width, height });
        }
      }
    });
  }

  function toggleTransitionCls(value: boolean) {
    jpImgRef?.current?.classList[value ? 'add' : 'remove'](`transition-left`);
  }

  useImperativeHandle(ref, () => ({}));



  return wrapSSR(<>
    <div
      style={{ width: `${width}px` }}
      className={classNames(prefixCls, hashId)}
    // ref={imgWapRef}
    >
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
        onReset={handleReset}
        style={{ width: `${width}px`, marginTop: '1.25rem' }}
      />
    </div>
  </>);
});
export default SliderPuzzleCaptcha;

import { CSSProperties, forwardRef, Ref, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { classNames } from '@web-rc/biz-utils';
import { useStyles } from './style';
import SliderButton, { SliderButtonCaptchaRef, SliderEvent } from '../SliderButton';
import { drawImage } from './_utils';
import { setAlpha } from '@web-rc/biz-provider';
import { time } from 'console';

export interface SliderRotateVerifyPassingData {
  event: MouseEvent | TouchEvent;
  moveDistance: number;
  moveX: number;
}
export type SliderRotateCaptchaProps = {
  // diffDegree?: number;
  maxDegree?: number;
  minDegree?: number;
  defaultTip?: string;
  src?: string;
  imageSize?: number;
  imageWrapperStyle?: CSSProperties;

  onStart?: (event: SliderEvent) => void;
  onMove?: (event: SliderEvent, data: { currentRotate: number }) => void;
  onEnd?: (event: SliderEvent) => void;
  onVerify: () => boolean | Promise<boolean>;
  onRefresh?: () => void | Promise<void>;
};
export type SliderRotateCaptchaRef = {};
const SliderRotateCaptcha = forwardRef((props: SliderRotateCaptchaProps, ref: Ref<SliderRotateCaptchaRef>) => {
  const {
    // diffDegree = 20,
    maxDegree = 300, minDegree = 120,
    src, imageSize = 260, imageWrapperStyle, defaultTip,
    onStart, onMove, onEnd, onVerify, onRefresh, ...restProps } = props;
  const { prefixCls, wrapSSR, hashId, token } = useStyles();

  const getFactorRef = useMemo(() => {
    if (minDegree > maxDegree) {
      console.warn('minDegree should not be greater than maxDegree');
    }
    if (minDegree === maxDegree) {
      return Math.floor(1 + Math.random() * 1) / 10 + 1;
    }
    return 1;
  }, [minDegree, maxDegree]);

  const imgRef = useRef<HTMLCanvasElement>(null);
  const slideBarRef = useRef<SliderButtonCaptchaRef>(null);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [isPassed, setIsPassed] = useState<boolean | undefined>();
  // const [showTip, setShowTip] = useState<boolean>(false);
  const [dragging, setDragging] = useState<boolean>(false);
  // const [randomRotate, setRandomRotate] = useState<number>(0);
  // const [currentRotate, setCurrentRotate] = useState<number>(0);
  const [imgRotate, setImgRotate] = useState<number>(0);

  useEffect(() => {
    reset();
  }, []);


  // function handleImgOnLoad() {
  //   const ranRotate = Math.floor(minDegree + Math.random() * (maxDegree - minDegree)); // 生成随机角度
  //   setRandomRotate(ranRotate);
  //   setImgRotate(ranRotate);
  // }

  const randomRotate = 0;
  function handleStart(ev: SliderEvent) {
    setIsPassed(undefined);
    setDragging(true);
    setStartTime(Date.now());
    onStart?.(ev);
  }
  function handleDragBarMove(ev: SliderEvent, data: { moveDistance: number, moveX: number }) {
    const { moveX } = data;
    const denominator = imageSize;
    if (denominator === 0) { return; }
    const currentRotate = Math.ceil((moveX / denominator) * 1.5 * maxDegree * getFactorRef);
    setImgRotate(randomRotate - currentRotate);
    onMove?.(ev, { currentRotate });
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
      setImgRotate(randomRotate);
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
    drawImage(
      imgRef.current,
      src,
      {
        width: imageSize,
        height: imageSize
      });
  }, [src]);

  function toggleTransitionCls(value: boolean) {
    imgRef?.current?.classList[value ? 'add' : 'remove'](`transition-transform`);
  }

  useImperativeHandle(ref, () => ({}));

  return wrapSSR(<>
    <div className={classNames(prefixCls, hashId)}>
      <div className={classNames(`${prefixCls}-img-wrapper`, hashId)}
        style={{
          height: `${imageSize}px`,
          width: `${imageSize}px`,
          ...imageWrapperStyle,
        }}>
        <canvas
          ref={imgRef}
          onClick={reset}
          style={{ transform: `rotateZ(${imgRotate}deg)`, }}
          className={classNames(`${prefixCls}-img`, hashId)}
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
        style={{ width: `${imageSize}px`, marginTop: '1.25rem' }}
      />
    </div>
  </>);
});
export default SliderRotateCaptcha;

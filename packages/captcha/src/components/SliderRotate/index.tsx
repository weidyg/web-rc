import { CSSProperties, forwardRef, Ref, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { classNames } from '@web-rc/biz-utils';
import { useStyles } from './style';
import SliderButton, { SliderButtonCaptchaRef, SliderEvent } from '../SliderButton';

export interface SliderRotateVerifyPassingData {
  event: MouseEvent | TouchEvent;
  moveDistance: number;
  moveX: number;
}
export type SliderRotateCaptchaProps = {
  diffDegree?: number;
  maxDegree?: number;
  minDegree?: number;
  defaultTip?: string;
  src?: string;
  imageSize?: number;
  imageWrapperStyle?: CSSProperties;
};
export type SliderRotateCaptchaRef = {};
const SliderRotateCaptcha = forwardRef((props: SliderRotateCaptchaProps, ref: Ref<SliderRotateCaptchaRef>) => {
  const { diffDegree = 20, maxDegree = 300, minDegree = 120,
    src, imageSize = 260, imageWrapperStyle, defaultTip, ...restProps } = props;
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

  const imgRef = useRef<HTMLImageElement>(null);
  const slideBarRef = useRef<SliderButtonCaptchaRef>(null);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [isPassing, setIsPassing] = useState<boolean>(false);
  const [showTip, setShowTip] = useState<boolean>(false);
  const [dragging, setDragging] = useState<boolean>(false);
  const [randomRotate, setRandomRotate] = useState<number>(0);
  const [currentRotate, setCurrentRotate] = useState<number>(0);
  const [imgRotate, setImgRotate] = useState<number>(0);

  useEffect(() => {
    reset();
  }, []);

  const verifyTip = useMemo(() => {
    return isPassing
      ? `验证成功，耗时${((endTime - startTime) / 1000).toFixed(1)}秒`
      : `验证失败`;
  }, [isPassing, endTime, startTime]);



  function handleImgOnLoad() {
    const ranRotate = Math.floor(minDegree + Math.random() * (maxDegree - minDegree)); // 生成随机角度
    setRandomRotate(ranRotate);
    setImgRotate(ranRotate);
  }

  function handleStart(ev: SliderEvent) {
    setStartTime(Date.now());
  }
  function handleDragBarMove(ev: SliderEvent, data: { moveDistance: number, moveX: number }) {
    setDragging(true);
    const { moveX } = data;
    const denominator = imageSize;
    if (denominator === 0) { return; }
    const currentRotate = Math.ceil((moveX / denominator) * 1.5 * maxDegree * getFactorRef);
    setCurrentRotate(currentRotate);
    setImgRotate(randomRotate - currentRotate);
  }
  function handleDragEnd(ev: SliderEvent) {

  }
  function handleVerify() {
    let isPassed = false;
    if (Math.abs(randomRotate - currentRotate) >= diffDegree) {
      setImgRotate(randomRotate);
      toggleTransitionCls(true);
      setTimeout(() => {
        toggleTransitionCls(false);
        setShowTip(true);
      }, 300);
    } else {
      isPassed = true;
      setIsPassing(isPassed);
      setEndTime(Date.now());
    }
    setShowTip(true);
    setDragging(false);
    return isPassed;
  }

  function reset() {
    setShowTip(false);
    setIsPassing(false);
    slideBarRef?.current?.reset();
    handleImgOnLoad();
  }
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
        <img
          ref={imgRef}
          src={src}
          style={{
            transform: `rotateZ(${imgRotate}deg)`,
          }}
          onClick={reset}
          onLoad={handleImgOnLoad}
          className={classNames(`${prefixCls}-img`, hashId)}
        />
        <div className={classNames(`${prefixCls}-img-tip`, hashId)}>
          {showTip && (
            <div style={{
              background: isPassing ? token.colorSuccess : token.colorError,
            }}
            >
              {verifyTip}
            </div>
          )}
          {(!dragging) && (
            <div style={{
              background: token.colorBgMask,
            }}>
              {defaultTip || '点击图片可刷新'}
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

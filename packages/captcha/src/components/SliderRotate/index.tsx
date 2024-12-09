import { CSSProperties, forwardRef, Ref, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { setAlpha } from '@web-rc/biz-provider';
import { classNames } from '@web-rc/biz-utils';
import { useStyles } from './style';
import SliderButton, { MoveingData, SliderButtonCaptchaRef, SliderEvent } from '../SliderButton';
import { drawImage, toggleTransitionDuration } from '../../utils';

const startRotate = 0;
export type SliderRotateCaptchaProps = {
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
    maxDegree = 300, minDegree = 120,
    src, imageSize = 260, imageWrapperStyle, defaultTip,
    onStart, onMove, onEnd, onVerify, onRefresh, ...restProps } = props;
  const { prefixCls, wrapSSR, hashId, token } = useStyles();

  const imgRef = useRef<HTMLCanvasElement>(null);
  const slideBarRef = useRef<SliderButtonCaptchaRef>(null);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [isPassed, setIsPassed] = useState<boolean | undefined>();
  const [dragging, setDragging] = useState<boolean>(false);
  const [imgRotate, setImgRotate] = useState<number>(0);
  const [denominator, setDenominator] = useState<number>(1);

  useEffect(() => {
    handleRefresh();
  }, []);

  useEffect(() => {
    drawBgImage();
  }, [src]);

  const getDegreeFactor = useMemo(() => {
    if (minDegree > maxDegree) {
      console.warn('minDegree should not be greater than maxDegree');
    }
    if (minDegree === maxDegree) {
      return Math.floor(1 + Math.random() * 1) / 10 + 1;
    }
    return 1;
  }, [minDegree, maxDegree]);

  function handleStart(ev: SliderEvent) {
    setIsPassed(undefined);
    setDragging(true);
    setStartTime(Date.now());
    onStart?.(ev);
  }
  function handleDragBarMove(ev: SliderEvent, data: MoveingData) {
    const { moveX } = data;
    if (denominator === 0) { return; }
    const currentRotate = Math.ceil((moveX / denominator) * 1.5 * maxDegree * getDegreeFactor);
    setImgRotate(startRotate - currentRotate);
    onMove?.(ev, { currentRotate });
  }
  function handleDragEnd(ev: SliderEvent) {
    setEndTime(Date.now());
    onEnd?.(ev);
  }
  async function handleVerify() {
    const isPassed = await onVerify();
    setIsPassed(isPassed);
    return isPassed;
  }
  function handleReset() {
    setDragging(false);
    setStartTime(0);
    setEndTime(0);
    setImgRotate(startRotate);
    toggleTransitionDuration(0.3, imgRef.current);
    setTimeout(() => {
      setIsPassed(undefined);
    }, 0.3 * 1000);
  }
  async function handleRefresh() {
    slideBarRef?.current?.reset();
    await onRefresh?.();
  }

  const drawBgImage = async () => {
    const { canvas } = await drawImage(imgRef.current, src, { width: imageSize, height: imageSize });
    setDenominator(Math.max(canvas?.width ?? 0, 1));
  }

  useImperativeHandle(ref, () => ({}));

  return wrapSSR(<>
    <div className={classNames(prefixCls, hashId)}>
      <div className={classNames(`${prefixCls}-img`, hashId)}
        style={{
          height: `${imageSize}px`,
          width: `${imageSize}px`,
          ...imageWrapperStyle,
        }}>
        <canvas
          ref={imgRef}
          onClick={handleRefresh}
          style={{ transform: `rotateZ(${imgRotate}deg)`, }}
          className={classNames(`${prefixCls}-img-bg`, hashId)}
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
        style={{ marginTop: token.margin }}
      />
    </div>
  </>);
});
export default SliderRotateCaptcha;

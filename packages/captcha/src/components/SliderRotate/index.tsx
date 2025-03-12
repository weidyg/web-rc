import { CSSProperties, forwardRef, Ref, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { setAlpha } from '@web-rc/biz-provider';
import { classNames } from '@web-rc/biz-utils';
import { useStyles } from './style';
import SliderButton, { MoveingData, SliderButtonCaptchaRef, SliderEvent } from '../SliderButton';
import { drawImage, toggleTransitionDuration } from '../../utils';

const startRotate = 0;
export type SliderRotateCaptchaData = { img: string, degree: { min: number, max: number } }
export type SliderRotateCaptchaProps = {
  // maxDegree?: number;
  // minDegree?: number;
  imageSize?: number;
  defaultTip?: string;
  imageWrapperStyle?: CSSProperties;

  onStart?: (event: SliderEvent) => void;
  onMove?: (event: SliderEvent, data: { currentRotate: number }) => void;
  onEnd?: (event: SliderEvent) => void;

  onLoad?: () => SliderRotateCaptchaData | Promise<SliderRotateCaptchaData>;
  onVerify: (currentRotate: number) => boolean | Promise<boolean>;
};
export type SliderRotateCaptchaRef = {};
const SliderRotateCaptcha = (props: SliderRotateCaptchaProps, ref: Ref<SliderRotateCaptchaRef>) => {
  const {
    // maxDegree = 300,
    // minDegree = 120,
    imageSize = 260,
    imageWrapperStyle,
    defaultTip,
    onStart,
    onMove,
    onEnd,
    onLoad,
    onVerify,
    ...restProps
  } = props;
  const { prefixCls, wrapSSR, hashId, token } = useStyles();

  const imgRef = useRef<HTMLCanvasElement>(null);
  const slideBarRef = useRef<SliderButtonCaptchaRef>(null);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [isPassed, setIsPassed] = useState<boolean | undefined>();
  const [dragging, setDragging] = useState<boolean>(false);
  const [denominator, setDenominator] = useState<number>(1);

  const [currentRotate, setCurrentRotate] = useState<number>(0);
  const [degree, setDegree] = useState<{ min: number, max: number }>({ min: 120, max: 300 });

  useEffect(() => {
    handleRefresh();
  }, []);

  const getDegreeFactor = useMemo(() => {
    if (degree?.max > degree?.max) {
      console.warn('minDegree should not be greater than maxDegree');
    }
    if (degree?.max === degree?.max) {
      return Math.floor(1 + Math.random() * 1) / 10 + 1;
    }
    return 1;
  }, [degree]);

  function handleStart(ev: SliderEvent) {
    setIsPassed(undefined);
    setDragging(true);
    setStartTime(Date.now());
    onStart?.(ev);
  }
  function handleDragBarMove(ev: SliderEvent, data: MoveingData) {
    const { moveX } = data;
    if (denominator === 0) { return; }
    const currentRotate = Math.ceil((moveX / denominator) * 1.5 * degree?.max * getDegreeFactor);
    setCurrentRotate(currentRotate);
    onMove?.(ev, { currentRotate });
  }
  function handleDragEnd(ev: SliderEvent) {
    setEndTime(Date.now());
    onEnd?.(ev);
  }
  async function handleVerify() {
    const isPassed = await onVerify(currentRotate);
    setIsPassed(isPassed);
    return isPassed;
  }

  async function handleRefresh() {
    slideBarRef?.current?.reset();
    const data = await onLoad?.();
    setDegree(data?.degree ?? { min: 120, max: 300 });
    drawBgImage(data?.img ?? '');
  }

  function handleReset() {
    setDragging(false);
    setStartTime(0);
    setEndTime(0);
    setCurrentRotate(0);
    toggleTransitionDuration(0.3, imgRef.current);
    setTimeout(() => {
      setIsPassed(undefined);
    }, 0.3 * 1000);
  }

  const drawBgImage = async (src: string) => {
    const { canvas } = await drawImage(imgRef.current, src, { width: imageSize, height: imageSize });
    setDenominator(Math.max(canvas?.width ?? 0, 1));
  };

  useImperativeHandle(ref, () => ({}));

  return wrapSSR(<>
    <div className={classNames(prefixCls, hashId)}>
      <div
        className={classNames(`${prefixCls}-img`, hashId)}
        style={{
          height: `${imageSize}px`,
          width: `${imageSize}px`,
          ...imageWrapperStyle,
        }}
      >
        <canvas
          ref={imgRef}
          onClick={handleRefresh}
          style={{ transform: `rotateZ(${startRotate - currentRotate}deg)` }}
          className={classNames(`${prefixCls}-img-bg`, hashId)}
        />
        <div className={classNames(`${prefixCls}-img-tip`, hashId)}>
          {(isPassed !== undefined || !dragging) && (
            <div
              style={{
                background:
                  isPassed !== undefined
                    ? setAlpha(isPassed ? token.colorSuccess : token.colorError, 0.45)
                    : token.colorBgMask,
              }}
            >
              {isPassed !== undefined
                ? isPassed
                  ? `验证成功，耗时${((endTime - startTime) / 1000).toFixed(1)}秒`
                  : `验证失败`
                : defaultTip || '点击图片可刷新'}
            </div>
          )}
        </div>
      </div>
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
};
export default forwardRef(SliderRotateCaptcha);

import { forwardRef, Ref, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { setAlpha } from '@web-rc/biz-provider';
import { classNames } from '@web-rc/biz-utils';
import { useStyles } from './style';
import SliderButton, { MoveingData, SliderButtonCaptchaRef, SliderEvent } from '../SliderButton';
import { drawImage, toggleTransitionDuration } from '../../utils';

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

  const bgImgRef = useRef<HTMLCanvasElement>(null);
  const jpImgRef = useRef<HTMLCanvasElement>(null);
  const slideBarRef = useRef<SliderButtonCaptchaRef>(null);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [isPassed, setIsPassed] = useState<boolean | undefined>();
  const [dragging, setDragging] = useState<boolean>(false);

  useEffect(() => {
    handleRefresh();
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
      handleReset();
    }
    setDragging(false);
    return isPassed;
  }

  async function handleRefresh() {
    slideBarRef?.current?.reset();
    await onRefresh?.();
  }

  function handleReset() {
    const jpImgEl = jpImgRef?.current;
    if (!jpImgEl) { return; }
    jpImgEl.style.left = '0px';
    toggleTransitionDuration(0.3, jpImgEl);
    setTimeout(() => {
      setIsPassed(undefined);
    }, 0.3 * 1000);
  }

  useEffect(() => {
    init();
  }, [props.width, props.height, bgImg, jpImg]);

  const init = async () => {
    const bgPix = await drawImage(bgImgRef.current, bgImg, { width, height });
    await drawImage(jpImgRef.current, jpImg, {
      width: (jpEl) => jpEl.naturalWidth * ((bgPix?.width ?? 0) / (bgPix?.naturalWidth ?? 1)),
      height: (jpEl) => jpEl.naturalHeight * ((bgPix?.height ?? 0) / (bgPix?.naturalHeight ?? 1)),
    });
    setWidth(bgPix?.width);
    setHeight(bgPix?.height);
  }

  useImperativeHandle(ref, () => ({}));

  return wrapSSR(<>
    <div
      style={{ width: `${width}px` }}
      className={classNames(prefixCls, hashId)}
    >
      <div
        style={{
          height: `${height}px`,
          width: `${width}px`,
        }}
        className={classNames(`${prefixCls}-img-wrapper`, hashId)}
      >
        <canvas ref={bgImgRef}
          className={classNames(`${prefixCls}-img-bg`, hashId)}
        />
        <canvas ref={jpImgRef}
          className={classNames(`${prefixCls}-img-jp`, hashId)}
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
export default SliderPuzzleCaptcha;

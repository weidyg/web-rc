import { forwardRef, ReactNode, Ref, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { ReloadOutlined } from '@ant-design/icons';
import { classNames } from '@web-rc/biz-utils';
import { useStyles } from './style';
import SliderButton, { MoveingData, SliderButtonCaptchaRef, SliderEvent } from '../SliderButton';
import { drawImage, toggleTransitionDuration } from '../../utils';
import ActionButton, { ActionButtonProps } from '../ActionButton';
import { setAlpha } from '@web-rc/biz-provider';

export type SliderPuzzleCaptchaData = {
  bgImg: string;
  jpImg: string;
};

export type SliderPuzzleCaptchaVerifyData = {
  startTime: number;
  endTime: number;
  width: number;
  height: number;
  tracks: { t: number; x: number; y: number }[]
};
export type SliderPuzzleCaptchaProps = {
  tip?: string;
  width?: number;
  height?: number;
  onStart?: (event: SliderEvent) => void;
  onMove?: (event: SliderEvent) => void;
  onEnd?: (event: SliderEvent) => void;

  onLoad?: () => SliderPuzzleCaptchaData | Promise<SliderPuzzleCaptchaData>;
  onVerify: (data: SliderPuzzleCaptchaVerifyData) => boolean | Promise<boolean>;
  actions?: ActionButtonProps[];
};
export type SliderPuzzleCaptchaRef = {};
const SliderPuzzleCaptcha = (props: SliderPuzzleCaptchaProps, ref: Ref<SliderPuzzleCaptchaRef>) => {
  const {
    tip,
    width = 300,
    height = 200,
    onStart,
    onMove,
    onEnd,
    onLoad,
    onVerify,
    actions = [],
    ...restProps
  } = props;
  const { prefixCls, wrapSSR, hashId, token } = useStyles();

  const bgImgRef = useRef<HTMLCanvasElement>(null);
  const jpImgRef = useRef<HTMLCanvasElement>(null);
  const slideBarRef = useRef<SliderButtonCaptchaRef>(null);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [isPassed, setIsPassed] = useState<boolean | undefined>();
  const [size, setSize] = useState({ width, height });
  const [tracks, setTracks] = useState<SliderPuzzleCaptchaVerifyData['tracks']>([]);

  useEffect(() => {
    handleRefresh();
  }, []);

  // useEffect(() => {
  //   drawBgAndJpImage();
  // }, [propWidth, propHeight, bgImg, jpImg]);

  function handleStart(ev: SliderEvent) {
    setIsPassed(undefined);
    setStartTime(Date.now());
    onStart?.(ev);
  }
  function handleDragBarMove(ev: SliderEvent, data: MoveingData) {
    if (jpImgRef.current && !data.isTheEnd) {
      jpImgRef.current.style.left = `${data.moveX}px`;
    }
    setTracks([...tracks, { t: Date.now(), x: ev.pageX, y: ev.pageY }]);
    onMove?.(ev);
  }
  function handleDragEnd(ev: SliderEvent) {
    setEndTime(Date.now());
    onEnd?.(ev);
  }
  async function handleVerify() {
    let _isPassed = false;
    try {
      const vd = { tracks, startTime, endTime, width: size?.width, height: size?.height, }
      _isPassed = await onVerify(vd);
    } catch (error) {
      throw error;
    } finally {
      setIsPassed(_isPassed);
      return _isPassed;
    }
  }

  function handleReset() {
    const jpImgEl = jpImgRef?.current;
    if (!jpImgEl) {
      return;
    }
    jpImgEl.style.left = '0px';
    toggleTransitionDuration(0.3, jpImgEl);
    setTimeout(() => {
      setIsPassed(undefined);
      setStartTime(0);
      setEndTime(0);
    }, 0.3 * 1000);
  }

  async function handleRefresh() {
    try {
      slideBarRef?.current?.reset();
      const data = await onLoad?.();
      drawBgAndJpImage(data?.bgImg, data?.jpImg);
    } catch (error) {
      console.error(error);
    } finally {
      // setLoading(false);
    }
  }

  const drawBgAndJpImage = async (bgImg?: string, jpImg?: string,) => {
    const { canvas, image } = await drawImage(bgImgRef.current, bgImg, {
      width: size?.width,
      height: size?.height
    });
    const cw = canvas?.width ?? 0;
    const ch = canvas?.height ?? 0;
    await drawImage(jpImgRef.current, jpImg, {
      width: (jpEl) => jpEl.naturalWidth * (cw / (image?.naturalWidth ?? 1)),
      height: (jpEl) => jpEl.naturalHeight * (ch / (image?.naturalHeight ?? 1)),
    });
    setSize({ width: cw, height: ch });
  };

  useImperativeHandle(ref, () => ({}));

  return wrapSSR(
    <>
      <div className={classNames(prefixCls, hashId)}>
        <div
          style={{
            height: `${size?.height}px`,
            width: `${size?.width}px`,
          }}
          className={classNames(`${prefixCls}-img`, hashId)}
        >
          {isPassed === undefined && (
            <div className={classNames(`${prefixCls}-actions`, hashId)}>
              <ActionButton
                title="刷新"
                onClick={handleRefresh}
                icon={<ReloadOutlined />}
                className={classNames(`${prefixCls}-action`, hashId)}
              />
              {actions.map(({ title, icon, onClick }, i) => (
                <ActionButton
                  key={i}
                  title={title}
                  onClick={onClick}
                  icon={icon}
                  className={classNames(`${prefixCls}-action`, hashId)}
                />
              ))}
            </div>
          )}
          <canvas ref={bgImgRef} className={classNames(`${prefixCls}-img-bg`, hashId)} />
          <canvas ref={jpImgRef} className={classNames(`${prefixCls}-img-jp`, hashId)} />
          <div className={classNames(`${prefixCls}-img-tip`, hashId)}>
            {isPassed !== undefined && (
              <div
                style={{
                  background: setAlpha(isPassed ? token.colorSuccess : token.colorError, 0.45),
                }}
              >
                {isPassed ? `验证成功，耗时${((endTime - startTime) / 1000).toFixed(1)}秒` : `验证失败`}
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
    </>,
  );
};
export default forwardRef(SliderPuzzleCaptcha);

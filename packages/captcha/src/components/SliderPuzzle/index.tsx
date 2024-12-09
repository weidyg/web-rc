import { forwardRef, ReactNode, Ref, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { setAlpha } from '@web-rc/biz-provider';
import { classNames } from '@web-rc/biz-utils';
import { useStyles } from './style';
import SliderButton, { MoveingData, SliderButtonCaptchaRef, SliderEvent } from '../SliderButton';
import { drawImage, toggleTransitionDuration } from '../../utils';
import { ReloadOutlined } from '@ant-design/icons';
import { Button } from 'antd';

export type SliderPuzzleCaptchaProps = {
  tip?: string;
  jpImg?: string;
  bgImg?: string;
  width?: number;
  height?: number;
  onStart?: (event: SliderEvent) => void;
  onMove?: (event: SliderEvent) => void;
  onEnd?: (event: SliderEvent) => void;
  onVerify: () => boolean | Promise<boolean>;
  onRefresh?: () => void | Promise<void>;
  actions?: { icon: ReactNode, onClick: () => void | Promise<void>, }[]
};
export type SliderPuzzleCaptchaRef = {};
const SliderPuzzleCaptcha = forwardRef((props: SliderPuzzleCaptchaProps, ref: Ref<SliderPuzzleCaptchaRef>) => {
  const { tip, bgImg, jpImg, width: propWidth, height: propHeight,
    onStart, onMove, onEnd, onVerify, onRefresh, actions = [], ...restProps } = props;
  const { prefixCls, wrapSSR, hashId, token } = useStyles();

  const bgImgRef = useRef<HTMLCanvasElement>(null);
  const jpImgRef = useRef<HTMLCanvasElement>(null);
  const slideBarRef = useRef<SliderButtonCaptchaRef>(null);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [isPassed, setIsPassed] = useState<boolean | undefined>();
  // const [dragging, setDragging] = useState<boolean>(false);
  const [width, setWidth] = useState(propWidth);
  const [height, setHeight] = useState(propHeight);
  // const [loading, setLoading] = useState(false);

  useEffect(() => {
    handleRefresh();
  }, []);

  useEffect(() => {
    drawBgAndJpImage();
  }, [propWidth, propHeight, bgImg, jpImg]);

  function handleStart(ev: SliderEvent) {
    setIsPassed(undefined);
    // setDragging(true);
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
    let _isPassed = false;
    try {
      _isPassed = await onVerify();
    } catch (error) {
      throw error;
    } finally {
      setIsPassed(_isPassed);
      return _isPassed;
    }
  }

  function handleReset() {
    const jpImgEl = jpImgRef?.current;
    if (!jpImgEl) { return; }
    jpImgEl.style.left = '0px';
    toggleTransitionDuration(0.3, jpImgEl);
    setTimeout(() => {
      setIsPassed(undefined);
      setStartTime(0);
      setEndTime(0);
    }, 0.3 * 1000);
  }

  async function handleRefresh() {
    // setLoading(true);
    try {
      slideBarRef?.current?.reset();
      await onRefresh?.();
    } catch (error) {
      console.error(error);
    } finally {
      // setLoading(false);
    }
  }

  const drawBgAndJpImage = async () => {
    const { canvas, image } = await drawImage(bgImgRef.current, bgImg, { width, height });
    await drawImage(jpImgRef.current, jpImg, {
      width: (jpEl) => jpEl.naturalWidth * ((canvas?.width ?? 0) / (image?.naturalWidth ?? 1)),
      height: (jpEl) => jpEl.naturalHeight * ((canvas?.height ?? 0) / (image?.naturalHeight ?? 1)),
    });
    setWidth(canvas?.width);
    setHeight(canvas?.height);
  }

  useImperativeHandle(ref, () => ({}));

  const Action = (props: {
    children?: React.ReactNode | ((loading: boolean) => React.ReactNode),
    onClick: () => void | Promise<void>,
  }) => {
    const { children, onClick } = props;
    const [loading, setLoading] = useState(false);
    async function handleClick(): Promise<void> {
      try {
        if (loading) { return; }
        setLoading(true);
        await onClick?.();
      } catch (error) {

      } finally {
        setLoading(false);
      }
    }
    return (
      <Button
        type='link'
        size='small'
        disabled={loading}
        onClick={handleClick}
        className={classNames(`${prefixCls}-action`, hashId)}
      >
        {typeof children === 'function' ? children(loading) : children}
      </Button>
    )
  }

  return wrapSSR(<>
    <div
      className={classNames(prefixCls, hashId)}
    >
      <div
        style={{
          height: `${height}px`,
          width: `${width}px`,
        }}
        className={classNames(`${prefixCls}-img`, hashId)}
      >
        {isPassed === undefined && (
          <div className={classNames(`${prefixCls}-actions`, hashId)}>
            <Action onClick={handleRefresh} >
              {(loading) => <ReloadOutlined spin={loading} />}
            </Action>
            {actions.map((action, i) => (
              <Action key={i} onClick={action.onClick} >
                {action.icon}
              </Action>
            ))}
          </div >
        )}

        <canvas ref={bgImgRef}
          className={classNames(`${prefixCls}-img-bg`, hashId)}
        />
        <canvas ref={jpImgRef}
          className={classNames(`${prefixCls}-img-jp`, hashId)}
        />
        <div className={classNames(`${prefixCls}-img-tip`, hashId)}>
          {(isPassed !== undefined) && (
            <div style={{
              background: setAlpha(isPassed ? token.colorSuccess : token.colorError, 0.45)
            }}>
              {isPassed
                ? `验证成功，耗时${((endTime - startTime) / 1000).toFixed(1)}秒`
                : `验证失败`
              }
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

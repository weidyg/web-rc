import { CSSProperties, forwardRef, Ref, useImperativeHandle, useMemo, useState } from 'react';
import { useStyles } from './style';
import classNames from 'classnames';
import { Slider } from 'antd';

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
    defaultTip, src, imageSize = 260, imageWrapperStyle,
    ...restProps } = props;
  const { prefixCls, wrapSSR, hashId, token } = useStyles();

  const [state, setState] = useState<any>({
    currentRotate: 0,
    dragging: false,
    endTime: 0,
    isPassing: false,
    randomRotate: 0,
    showTip: false,
    startTime: 0,
    toOrigin: false,

    imgStyle: {},
  });

  // watch(
  //   () => state.isPassing,
  //   (isPassing) => {
  //     if (isPassing) {
  //       const { endTime, startTime } = state;
  //       const time = (endTime - startTime) / 1000;
  //       emit('success', { isPassing, time: time.toFixed(1) });
  //     }
  //     modalValue.value = isPassing;
  //   },
  // );

  function handleImgOnLoad() {
    const { maxDegree, minDegree } = props;
    const ranRotate = Math.floor(
      minDegree! + Math.random() * (maxDegree! - minDegree!),
    ); // 生成随机角度
    state.randomRotate = ranRotate;
    setImgRotate(ranRotate);
  }
  function handleStart() {
    state.startTime = Date.now();
  }
  const getFactorRef = useMemo(() => {
    if (minDegree > maxDegree) {
      console.warn('minDegree should not be greater than maxDegree');
    }
    if (minDegree === maxDegree) {
      return Math.floor(1 + Math.random() * 1) / 10 + 1;
    }
    return 1;
  }, [minDegree, maxDegree]);
  function handleDragBarMove(data: SliderRotateVerifyPassingData) {
    state.dragging = true;
    const { moveX } = data;
    const denominator = imageSize!;
    if (denominator === 0) {
      return;
    }
    const currentRotate = Math.ceil(
      (moveX / denominator) * 1.5 * maxDegree! * getFactorRef,
    );
    state.currentRotate = currentRotate;
    setImgRotate(state.randomRotate - currentRotate);
  }
  function handleDragEnd() {
    const { currentRotate, randomRotate } = state;
    const { diffDegree } = props;
    if (Math.abs(randomRotate - currentRotate) >= (diffDegree || 20)) {
      setImgRotate(randomRotate);
      state.toOrigin = true;
      // useTimeoutFn(() => {
      //   state.toOrigin = false;
      //   state.showTip = true;
      //   //  时间与动画时间保持一致
      // }, 300);
    } else {
      checkPass();
    }
    state.showTip = true;
    state.dragging = false;
  }
  function checkPass() {
    state.isPassing = true;
    state.endTime = Date.now();
  }
  const verifyTip = useMemo(() => {
    return state.isPassing
      ? `验证成功，耗时${((state.endTime - state.startTime) / 1000).toFixed(1)}秒`
      : `验证失败`;
  }, [state.isPassing, state.endTime, state.startTime]);

  const [imgRotate, setImgRotate] = useState<number>();
  useImperativeHandle(ref, () => ({}));
  function resume() {
    // state.showTip = false;
    // // const basicEl = unref(slideBarRef);
    // if (!basicEl) {
    //   return;
    // }
    // state.isPassing = false;

    // basicEl.resume();
    handleImgOnLoad();
  }

  return wrapSSR(<>
    <div style={{
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <div style={{
        height: `${imageSize}px`,
        width: `${imageSize}px`,
        ...imageWrapperStyle,

        position: 'relative',
        cursor: 'pointer',
        overflow: 'hidden',
        borderRadius: '50%',
        border: `1px solid ${token.colorBorder}`,
        boxShadow: `0 0 transparent,0 0 transparent,0 4px 6px -1px rgba(0,0,0,.1),0 2px 4px -2px rgba(0,0,0,.1)`,
      }}>
        <img
          className={classNames(
            {
              ['transition-transform duration-300']: state.toOrigin,
            })
          }
          src={src}
          style={{
            width: '100%',
            borderRadius: '50%',
            transform: `rotateZ(${imgRotate}deg)`,
          }}//
          alt="verify"
          onClick={resume}
          onLoad={handleImgOnLoad}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '.75rem',
            left: 0,
            zIndex: 10,
            display: 'block',
            height: '1.75rem',
            width: '100%',
            textAlign: 'center',
            fontSize: '0.75rem',
            lineHeight: '30px',
            color: token.colorWhite
          }}
        >
          {state.showTip && (
            <div style={{
              background: state.isPassing ? token.colorSuccessBg : token.colorErrorBg,
            }}
            >
              {verifyTip}
            </div>
          )}
          {(!state.dragging) && (
            <div style={{
              background: token.colorBgMask,
            }}>
              {defaultTip || '点击图片可刷新'}
            </div>
          )}
        </div>
      </div >

      <div>

        <Slider onChange={() => {

        }} />

      </div>
    </div>
  </>);
});
export default SliderRotateCaptcha;

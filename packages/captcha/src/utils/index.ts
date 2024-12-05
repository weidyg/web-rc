export function toggleTransitionDuration(
  second: number,
  ...elements: (HTMLElement | null)[]
) {
  elements.forEach((el) => {
    if (!el) { return; }
    el.style.transitionDuration = `${second}s`;
  });
  setTimeout(() => {
    elements.forEach((el) => {
      if (!el) { return; }
      el.style.transitionDuration = `0s`;
    });
  }, second * 1000);
}

export function drawImage(
  element?: HTMLCanvasElement | null,
  imgSrc?: string,
  pixel?: {
    width?: number | ((el: HTMLImageElement) => number),
    height?: number | ((el: HTMLImageElement) => number),
  }
) {
  return new Promise<{
    width?: number,
    height?: number,
    naturalWidth?: number,
    naturalHeight?: number,
  }>((resolve) => {
    if (!element || !imgSrc) { return; };
    const imgEle = new Image();
    imgEle.src = imgSrc;
    imgEle.onload = function () {
      const _width = typeof pixel?.width === 'function' ? pixel?.width(imgEle) : pixel?.width;
      const _height = typeof pixel?.height === 'function' ? pixel?.height(imgEle) : pixel?.height;
      imgEle.width = _width ? _width : imgEle.naturalWidth;
      imgEle.height = _height ? _height : imgEle.naturalHeight;
      element.width = _width ? imgEle.width : imgEle.width * (imgEle.height / imgEle.naturalHeight);;
      element.height = _height ? imgEle.height : imgEle.height * (imgEle.width / imgEle.naturalWidth);
      element.getContext("2d")?.drawImage(imgEle, 0, 0, element.width, element.height);
      const data = {
        width: element.width,
        height: element.height,
        naturalWidth: imgEle.naturalWidth,
        naturalHeight: imgEle.naturalHeight,
      };
      console.log('drawImage', { _width, _height }, data);
      resolve(data);
    }
  });
}

export function getElementPosition(element: HTMLElement) {
  const rect = element.getBoundingClientRect();
  return {
    x: rect.left + window.scrollX,
    y: rect.top + window.scrollY,
  };
}
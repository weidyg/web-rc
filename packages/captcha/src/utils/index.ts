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

export function getElementPosition(element: HTMLElement) {
  const rect = element.getBoundingClientRect();
  return {
    x: rect.left + window.scrollX,
    y: rect.top + window.scrollY,
  };
}


export function drawImage(
  canvas?: HTMLCanvasElement | null,
  imgSrc?: string,
  pixel?: {
    width?: number | ((el: HTMLImageElement) => number),
    height?: number | ((el: HTMLImageElement) => number),
  }
) {
  return new Promise<{
    canvas?: HTMLCanvasElement | null,
    image?: HTMLImageElement | null,
  }>((resolve) => {
    // if (!canvas) { canvas = new HTMLCanvasElement(); };
    if (!canvas || !imgSrc) { return; };
    const image = new Image();
    image.src = imgSrc;
    image.onload = function () {
      const _width = typeof pixel?.width === 'function' ? pixel?.width(image) : pixel?.width;
      const _height = typeof pixel?.height === 'function' ? pixel?.height(image) : pixel?.height;
      image.width = _width ? _width : image.naturalWidth;
      image.height = _height ? _height : image.naturalHeight;
      canvas.width = _width ? image.width : image.width * (image.height / image.naturalHeight);;
      canvas.height = _height ? image.height : image.height * (image.width / image.naturalWidth);
      canvas.getContext("2d")?.drawImage(image, 0, 0, canvas.width, canvas.height);
      resolve({ canvas, image });
    }
  });
}

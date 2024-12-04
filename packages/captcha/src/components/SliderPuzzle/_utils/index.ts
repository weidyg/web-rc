export function drawImage(
  element?: HTMLCanvasElement | null,
  imgSrc?: string,
  pixel?: { width?: number, height?: number }
) {
  const { width, height } = pixel || {};
  if (element && imgSrc) {
    const img = new Image(width, height);
    img.src = imgSrc;
    img.onload = function () {
      element.width = width ? img.width : img.width * (img.height / img.naturalHeight);;
      element.height = height ? img.height : img.height * (img.width / img.naturalWidth);
      element.getContext("2d")?.drawImage(img, 0, 0, element.width, element.height);
    }
  }
}
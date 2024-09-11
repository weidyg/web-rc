export const cropImage = (
  file: Blob,
  pixelCrop: {
    width: number;
    height: number;
    x: number;
    y: number;
  },
  rotation = 0,
): Promise<Blob> => {
  return new Promise<Blob>((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const img = document.createElement('img');
      img.src = reader.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');

        const imageSize = 2 * ((Math.max(img.width, img.height) / 2) * Math.sqrt(2));
        canvas.width = imageSize;
        canvas.height = imageSize;

        const ctx = canvas.getContext('2d')!;
        if (rotation) {
          ctx.translate(imageSize / 2, imageSize / 2);
          ctx.rotate((rotation * Math.PI) / 180);
          ctx.translate(-imageSize / 2, -imageSize / 2);
        }
        ctx.drawImage(img, imageSize / 2 - img.width / 2, imageSize / 2 - img.height / 2);
        const data = ctx.getImageData(0, 0, imageSize, imageSize);
        canvas.width = pixelCrop.width || img.width;
        canvas.height = pixelCrop.height || img.height;
        ctx.putImageData(
          data,
          Math.round(0 - imageSize / 2 + img.width * 0.5 - (pixelCrop.x || 0)),
          Math.round(0 - imageSize / 2 + img.height * 0.5 - (pixelCrop.y || 0)),
        );
        canvas.toBlob((blob) => resolve(blob as any));
      };
    };
  });
};

export const loadImage = (file: Blob | string): Promise<HTMLImageElement> => {
  return new Promise<HTMLImageElement>((resolve) => {
    const loadImgByUrl = (url: string) => {
      const img = document.createElement('img');
      img.src = url;
      img.onload = () => {
        resolve(img);
      };
    };
    if (typeof file == 'string') {
      loadImgByUrl(file);
    } else {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        loadImgByUrl(reader.result as string);
      };
    }
  });
};

export const drawImage = async (
  file: File,
  pixel?: {
    width?: number;
    height?: number;
  },
  aspectRatio?: boolean,
  quality?: number,
): Promise<File> => {
  const { width, height } = pixel || {};
  if (!width && !height) {
    return Promise.resolve(file);
  }
  const img = await loadImage(file);

  const targetWidth = width || (aspectRatio && height ? img.width * (height / img.height) : img.width);
  const targetHeight = height || (aspectRatio && width ? img.height * (width / img.width) : img.height);

  const { name: fileName, type: fileType } = file;
  return new Promise<File>((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    canvas.width = targetWidth;
    canvas.height = targetHeight;
    ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

    // ctx.fillStyle = 'red';
    // ctx.textBaseline = 'middle';
    // ctx.font = '33px Arial';
    // ctx.fillText(text, 20, 20);

    canvas.toBlob((blob) => resolve(new File([blob!], fileName, { type: fileType })), fileType, quality);
  });
};

export const getBase64Image = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
}

export const isImageFileType = (type: string): boolean => type.indexOf('image/') === 0;

export const previewImage = (file: File | Blob, measureSize?: number): Promise<string> => {
  measureSize = measureSize ?? 200;
  return new Promise<string>((resolve) => {
    if (!file.type || !isImageFileType(file.type)) {
      resolve('');
      return;
    }
    const canvas = document.createElement('canvas');
    canvas.width = measureSize;
    canvas.height = measureSize;
    canvas.style.cssText = `position: fixed; left: 0; top: 0; width: ${measureSize}px; height: ${measureSize}px; z-index: 9999; display: none;`;
    document.body.appendChild<HTMLCanvasElement>(canvas);
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.onload = () => {
      const { width, height } = img;

      let drawWidth = measureSize;
      let drawHeight = measureSize;
      let offsetX = 0;
      let offsetY = 0;

      if (width > height) {
        drawHeight = height * (measureSize / width);
        offsetY = -(drawHeight - drawWidth) / 2;
      } else {
        drawWidth = width * (measureSize / height);
        offsetX = -(drawWidth - drawHeight) / 2;
      }

      ctx!.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      const dataURL = canvas.toDataURL();
      document.body.removeChild(canvas);
      window.URL.revokeObjectURL(img.src);
      resolve(dataURL);
    };
    img.crossOrigin = 'anonymous';
    if (file.type.startsWith('image/svg+xml')) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result && typeof reader.result === 'string') {
          img.src = reader.result;
        }
      };
      reader.readAsDataURL(file);
    } else if (file.type.startsWith('image/gif')) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          resolve(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    } else {
      img.src = window.URL.createObjectURL(file);
    }
  });
}

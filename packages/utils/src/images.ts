const crop = (
    file: Blob,
    pixelCrop: {
        width: number;
        height: number;
        x: number;
        y: number;
    }, rotation = 0
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
                canvas.width = pixelCrop.width;
                canvas.height = pixelCrop.height;
                ctx.putImageData(data,
                    Math.round(0 - imageSize / 2 + img.width * 0.5 - pixelCrop.x),
                    Math.round(0 - imageSize / 2 + img.height * 0.5 - pixelCrop.y)
                );
                canvas.toBlob((blob) => resolve(blob as any));
            };
        };
    });
}
const watermark = (file: Blob, text: string): Promise<Blob> => {
    return new Promise<Blob>((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const img = document.createElement('img');
            img.src = reader.result as string;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = img.naturalWidth;
                canvas.height = img.naturalHeight;
                const ctx = canvas.getContext('2d')!;
                ctx.drawImage(img, 0, 0);
                ctx.fillStyle = 'red';
                ctx.textBaseline = 'middle';
                ctx.font = '33px Arial';
                ctx.fillText(text, 20, 20);
                canvas.toBlob((result) => resolve(result as any));
            };
        };
    });
}




const loadImg = (file: Blob | string): Promise<HTMLImageElement> => {
    return new Promise<HTMLImageElement>((resolve) => {
        const loadImgByUrl = (url: string) => {
            const img = document.createElement('img');
            img.src = url;
            img.onload = () => {
                resolve(img);
            };
        }
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
}



export const resizeImgSize = async (
    file: File,
    size: {
        width?: number,
        height?: number
    }
): Promise<File> => {
    const { width, height } = size || {};
    if (!width && !height) { return Promise.resolve(file); }
    const img = await loadImg(file);
    const widthRatio = (width || img.width) / img.width;
    const heightRatio = (height || img.height) / img.height;
    return new Promise<File>((resolve) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d')!;
        canvas.width = img.width * widthRatio;
        canvas.height = img.height * heightRatio;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        canvas.toBlob((blob) => resolve(new File([blob!], file.name, { type: file.type })));
    });
}

export const compressImage = async (file: File, quality: number): Promise<File> => {
    const img = await loadImg(file);
    return new Promise<File>((resolve) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d')!;
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        canvas.toBlob((blob) => {
            if (blob) {
                const compressedFile = new File([blob], file.name, { type: file.type });
                resolve(compressedFile);
            }
        }, file.type, quality);
    });
}
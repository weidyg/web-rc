import { DirType, ImageFile } from '@web-rc/biz-components';

export const dirs: DirType[] = Array.from({ length: 10 }, (_, i) => ({
  value: `${i}`,
  label: i == 0 ? '全部图片' : `目录${i}`,
  children:
    i >= 0 && i % 3 == 0
      ? [
          {
            value: `sub${i}`,
            label: `子目录${i}`,
            children: [],
          },
        ]
      : [],
}));

export const files: ImageFile[] = Array.from({ length: 100 }, (_, i) => ({
  id: i,
  name: `图片${i}`,
  size: 8000,
  pixel: '220*220',
  fullUrl: `https://picsum.photos/id/${i}/220/220`,
}));

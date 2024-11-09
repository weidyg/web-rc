/**
 * iframe: true
 * title: 基本使用
 * description: 图片上传器
 */
import { ImageUploader, DirType } from '@web-react/biz-components';

const dirs: DirType[] = Array.from({ length: 10 }, (_, i) => ({
  value: `${i}`,
  label: i == 0 ? '全部图片' : `目录${i}`,
  children:
    i / 3 == 0
      ? [
          {
            value: `sub${i}`,
            label: `子目录${i}`,
            children: [],
          },
        ]
      : [],
}));

export default () => {
  return (
    <div style={{ height: '100vh' }}>
      <ImageUploader
        defaultFolder={'0'}
        folders={dirs}
        upload={{
          action: '/',
          normalize: {
            uploadResponse: (res) => {
              const error = res.Error;
              const result = res.Result || {};
              return { ...result, error };
            },
          },
        }}
      />
    </div>
  );
};

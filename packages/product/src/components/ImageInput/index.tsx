import { forwardRef, Key, Ref, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { Button, Dropdown, Flex, Image, MenuProps, Popover, Space } from 'antd';
import { EyeOutlined, PictureOutlined } from '@ant-design/icons';
import { classNames, useMergedState } from '@web-react/biz-utils';
import { useStyle } from './style';
import { FolderProps, ImageFile, ImageSpace, ImageSpaceProps, ImageSpaceRef, ImageUploader, ImageUploaderProps } from '@web-react/biz-components';


type ImageInputProps = {
  /** 类名 */
  className?: string;
  /** 样式 */
  style?: React.CSSProperties;
  /** 自定义样式前缀 */
  prefixCls?: string;
  placeholder?: string;
  defaultValue?: string;
  value?: string;
  onChange?: (value?: string) => void;
  menus?: MenuProps['items'];

  defaultFolder: FolderProps['defaultValue'];
  folders: FolderProps['data'];
  upload: ImageUploaderProps['upload'];
  fetchData: ImageSpaceProps['fetchData'];
  // imageSpaceProps?: Omit<ImageSpaceProps, 'mutiple'>;
  // imageUploaderProps?: Omit<ImageUploaderProps, 'mutiple'>;
  actions: React.ReactNode[];
};
type ImageInputRef = {
  onOpen: () => void;
  refresh(): void | Promise<void>;
}

const ImageInput = forwardRef<ImageInputRef, ImageInputProps>((
  props: ImageInputProps,
  ref: Ref<ImageInputRef>
) => {
  const { className, style, placeholder, menus,
    defaultFolder, folders, upload, fetchData, actions
  } = props;
  const { prefixCls, wrapSSR, hashId, token } = useStyle(props.prefixCls);
  const [imgUrl, setImgUrl] = useMergedState(undefined, {
    defaultValue: props?.defaultValue,
    value: props?.value,
    onChange: props?.onChange
  });

  useImperativeHandle(ref, () => ({
    onOpen() {
      handleOpen(true);
    },
    refresh() {
      return _imageSpaceRef?.current?.refresh();
    },
  }));

  const handleOpen = (open: boolean) => {
    setIsOpen(open);
    setTimeout(() => {
      setIsUpload(false);
      _imageSpaceRef?.current?.clearSelected();
    }, 500);
  }

  const [isOpen, setIsOpen] = useState(false);
  const [isUpload, setIsUpload] = useState(false);
  const _imageSpaceRef = useRef<ImageSpaceRef>(null);
  const imagePopover = <div style={{ width: '680px', height: '400px', }}>
    <ImageSpace
      ref={_imageSpaceRef}
      style={{ display: !isUpload ? '' : 'none' }}
      actionsRender={(dom) => {
        return <Flex style={{ width: '100%' }}
          align='flex-start' justify='space-between'>
          <Space wrap>
            {dom}
            {actions}
          </Space>
          <Button onClick={() => { setIsUpload(true); }}>上传</Button>
        </Flex>
      }}
      fetchData={fetchData}
      defaultFolder={defaultFolder}
      folders={folders}
      mutiple={false}
      onChange={(ids: Key[], files: ImageFile[]) => {
        if (files?.length > 0) {
          handleOpen(false);
          setImgUrl(files[0]?.fullUrl);
        }
      }}
    />
    <ImageUploader
      style={{ display: isUpload ? '' : 'none' }}
      configRender={(dom) => (
        <Flex style={{ width: '100%' }} align='center' justify='space-between'>
          {dom}
          <Button onClick={() => { setIsUpload(false); }}>
            取消上传
          </Button>
        </Flex>
      )}
      defaultFolder={defaultFolder}
      folders={folders}
      upload={upload}
      onUploaDone={() => {
        setTimeout(() => {
          setIsUpload(false);
        }, 1000);
      }}
    />
  </div>
  return wrapSSR(
    <div style={style} className={classNames(`${prefixCls}-wrap`,
      className, { [`${prefixCls}-empty`]: !!!imgUrl }, hashId)
    }>
      <Popover
        title='选择图片'
        trigger={'click'}
        arrow={false}
        content={imagePopover}
        open={isOpen}
        destroyTooltipOnHide={false}
        onOpenChange={(open, e) => {
          if (!imgUrl || (imgUrl && !open)) {
            handleOpen?.(open);
          }
        }}>
        {imgUrl ? (
          <Dropdown menu={{ items: menus }} arrow={false} placement='bottom'>
            <Image src={imgUrl} preview={{
              mask: <div className={`${prefixCls}-mask-info`}>
                <EyeOutlined />
              </div>
            }}
              wrapperClassName={classNames(`${prefixCls}-content`, hashId)}
              className={classNames(`${prefixCls}-img`, hashId)}
            />
          </Dropdown>
        ) : (
          <div className={classNames(`${prefixCls}-placeholder`, hashId)}>
            <PictureOutlined className={classNames(`${prefixCls}-placeholder-icon`, hashId)} />
            {placeholder &&
              <span className={classNames(`${prefixCls}-placeholder-text`, hashId)}>{placeholder}</span>
            }
          </div>
        )}
      </Popover>
    </div >
  );
});

export type { ImageInputProps, ImageInputRef };
export default ImageInput;

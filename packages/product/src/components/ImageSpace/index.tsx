import { CSSProperties, forwardRef, Key, ReactNode, Ref, useEffect, useImperativeHandle, useMemo, useState } from 'react';
import { Button, message, Modal, ModalProps, Popover, PopoverProps, Typography, UploadFile } from 'antd';
import { classNames, useMergedState } from '@web-react/biz-utils';
import PicUploader, { DisplayPanelType, FolderType, PicUploaderProps, UploadResponseBody } from './Uploader';
import FolderTree, { FolderTreeType } from './FolderTree';
import PicPanel, { ImageFile } from './PicPanel';
import { useStyle } from './style';
import React from 'react';

type BaseRequestParam = {
  page: number,
  size: number,
  folderId?: Key
}

type ImageSpaceProps<
  RequestParamType extends BaseRequestParam = BaseRequestParam,
  UploadResponseBodyType extends UploadResponseBody = UploadResponseBody,
> = {
  /** 类名 */
  className?: string;
  /** 样式 */
  style?: CSSProperties;
  /** 自定义样式前缀 */
  prefixCls?: string;

  pageSize?: number;
  defaultFolder?: FolderTreeType;
  fetchFolders?: () => Promise<FolderTreeType[]>;
  fetchData: (param: RequestParamType) => Promise<{ items: ImageFile[], total: number, }>;
  defaultValue?: Key[];
  value?: Key[];
  onChange?: (ids: Key[], files: ImageFile[]) => void | Promise<void>;
  actions?: { left?: ReactNode },
  footer?: {
    left?: ReactNode,
    right?: ReactNode,
  },
  upload?: PicUploaderProps<UploadResponseBodyType>['upload'],
  display?: DisplayPanelType;
  onDisplayChange?: (display: DisplayPanelType) => void;
};

interface ImageSpaceRef {
  onRefresh: () => void | Promise<void>;
}

const InternalImageSpace = forwardRef<ImageSpaceRef, ImageSpaceProps<BaseRequestParam, UploadResponseBody>>(<
  UploadResponseBodyType extends UploadResponseBody = UploadResponseBody,
  RequestParamType extends BaseRequestParam = BaseRequestParam
>(
  props: ImageSpaceProps<RequestParamType, UploadResponseBodyType>,
  ref: Ref<ImageSpaceRef>
) => {
  const { style, className, defaultFolder, pageSize = 20,
    fetchData, fetchFolders, onChange,
    actions, footer, upload
  } = props;
  const { prefixCls, wrapSSR, hashId, token } = useStyle(props.prefixCls);
  const classString = classNames(prefixCls, className, hashId, {});
  const [displayPanel, setDisplayPanel] = useMergedState<DisplayPanelType>('none', {
    value: props.display,
    onChange: props.onDisplayChange
  });

  const [selectKeys, setSelectKeys] = useMergedState<Key[]>([], {
    defaultValue: props.defaultValue,
    value: props.value,
    onChange: async (value) => {
      const selectFiles = imageFiles.filter((item) => value.includes(item.id));
      await onChange?.(value, selectFiles);
    }
  });

  const [loading, setLoading] = useState(false);
  const [curPage, setCurPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [imageFiles, setImageFiles] = useState<ImageFile[]>([]);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [folderId, setFolderId] = useState<Key>(defaultFolder?.value || '');
  const [folders, setFolders] = useState<FolderTreeType[]>(defaultFolder ? [defaultFolder] : []);

  useEffect(() => {
    loadDirs();
    loadData({ page: curPage + 1, fist: true });
  }, []);

  useEffect(() => {
    if (folderId) { loadData({ page: 1 }); }
  }, [folderId]);

  useImperativeHandle(ref, () => ({
    onRefresh: () => {
      return loadData({ page: 1 });
    }
  }))

  const loadDirs = async () => {
    const data = await fetchFolders?.() || [];
    const folders = defaultFolder && !data.some(s => s.value === defaultFolder.value)
      ? [defaultFolder, ...data]
      : data;
    setFolders(folders);
  };

  const loadData = async (param: { page: number, fist?: boolean, [key: string]: any }) => {
    const { page, fist, ...rest } = param;
    const totalPage = fist ? 1 : Math.ceil(totalCount / pageSize);
    if (page > totalPage) { return; }
    setLoading(true);
    try {
      const param: RequestParamType = { ...rest, page, size: pageSize, folderId } as any;
      const data = await fetchData?.(param) || { items: [], total: 0 };
      const newData = data?.items || [];
      const newImageFiles = page > 1
        ? [...imageFiles, ...newData]
        : newData;
      setCurPage(page);
      setTotalCount(data.total || 0);
      setImageFiles(newImageFiles);
    } catch (error: any) {
      message.error(error?.message || '加载失败');
    } finally {
      setLoading(false);
    }
  };

  return wrapSSR(
    <div className={classString} style={style}>
      <div style={{ display: displayPanel === 'uploader' ? 'none' : '' }}
        className={classNames(`${prefixCls}-body`, hashId)}>
        <div className={classNames(`${prefixCls}-content`, hashId)}>
          <div className={classNames(`${prefixCls}-aside`, hashId)}>
            <div className={classNames(`${prefixCls}-treeDom`, hashId)} >
              <FolderTree
                data={folders}
                value={folderId}
                onChange={(val) => {
                  setFolderId(val);
                }} />
            </div>
          </div>
          <PicPanel
            selectKeys={selectKeys}
            onSelect={(keys) => {
              setSelectKeys(keys);
            }}
            actions={{
              left: actions?.left,
              right: <Button
                type="primary"
                onClick={() => {
                  setDisplayPanel('uploader')
                }}
              >
                上传图片
              </Button>,
            }}
            data={imageFiles}
            loading={loading}
            hasMore={curPage * pageSize >= totalCount}
            onLoadMore={() => loadData({ page: curPage + 1 })}
            onRefresh={() => loadData({ page: 1 })}
          />
        </div>
        <div className={classNames(`${prefixCls}-footer`, hashId)}>
          <div className={classNames(`${prefixCls}-footer-left`, hashId)}>
            {footer?.left}
          </div>
          <div className={classNames(`${prefixCls}-footer-right`, hashId)}>
            {footer?.right}
          </div>
        </div>
      </div>
      <PicUploader<UploadResponseBodyType>
        display={displayPanel}
        onDisplayChange={(val) => {
          setDisplayPanel(val)
        }}
        defaultFolderValue={folderId as any}
        folders={folders as FolderType[]}
        fileList={fileList}
        onChange={(values) => {
          if (values?.length > 0 &&
            values.every((m) => m.status === 'done')
          ) {
            loadData({ page: 1 });
            setDisplayPanel('none');
            setFileList([]);
          } else {
            setFileList(values);
          }
        }}
        upload={upload}
        config={{
          right: <Button style={{ marginLeft: 'auto' }}
            onClick={() => { setDisplayPanel('none') }}
          >
            取消上传
          </Button>
        }}
      />
    </div>
  );
}
);

type ImageSpacePopoverProps<
  RequestParamType extends BaseRequestParam = BaseRequestParam,
  UploadResponseBodyType extends UploadResponseBody = UploadResponseBody,
> = ImageSpaceProps<BaseRequestParam, UploadResponseBody> & {
  popoverProps?: Omit<PopoverProps, 'content' | 'children'>;
  children?: React.ReactNode;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const ImageSpacePopover = forwardRef<ImageSpaceRef, ImageSpacePopoverProps<BaseRequestParam, UploadResponseBody>>(<
  UploadResponseBodyType extends UploadResponseBody = UploadResponseBody,
  RequestParamType extends BaseRequestParam = BaseRequestParam
>(
  props: ImageSpacePopoverProps<RequestParamType, UploadResponseBodyType>,
  ref: Ref<ImageSpaceRef>
) => {
  const {
    defaultOpen = false, open: isOpen, onOpenChange,
    popoverProps, children, style, ...rest
  } = props;
  const { ...restPopoverProps } = popoverProps || {};
  const [displayPanel, setDisplayPanel] = useMergedState<DisplayPanelType>('none', {
    value: props.display,
    onChange: props.onDisplayChange
  });
  const [open, setOpen] = useMergedState<boolean>(defaultOpen, {
    value: isOpen,
    onChange: onOpenChange
  });

  const content = (
    <InternalImageSpace
      ref={ref}
      {...rest}

      display={displayPanel}
      onDisplayChange={(val) => {
        setDisplayPanel(val);
      }}
      style={{
        width: '880px',
        height: '600px',
        ...style
      }}
    />
  );

  return (
    <Popover
      trigger={'click'}
      arrow={false}
      {...restPopoverProps}
      content={content}
      open={open}
      onOpenChange={(open, e) => {
        if (open) { setDisplayPanel('none'); }
        setOpen?.(open);
      }}>
      {children}
    </Popover>
  )
});

type ImageSpaceModalProps<
  RequestParamType extends BaseRequestParam = BaseRequestParam,
  UploadResponseBodyType extends UploadResponseBody = UploadResponseBody,
> = ImageSpaceProps<BaseRequestParam, UploadResponseBody> & {
  modalProps?: Omit<ModalProps, 'children' | 'footer' | 'open'>;
  children?: React.ReactNode;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const ImageSpaceModal = forwardRef<ImageSpaceRef, ImageSpaceModalProps<BaseRequestParam, UploadResponseBody>>(<
  UploadResponseBodyType extends UploadResponseBody = UploadResponseBody,
  RequestParamType extends BaseRequestParam = BaseRequestParam
>(
  props: ImageSpaceModalProps<RequestParamType, UploadResponseBodyType>,
  ref: Ref<ImageSpaceRef>
) => {
  const {
    defaultOpen = false, open: isModalOpen, onOpenChange,
    modalProps, children, style, ...rest
  } = props;
  const { onCancel, styles, title, ...restModalProps } = modalProps || {};
  const [displayPanel, setDisplayPanel] = useMergedState<DisplayPanelType>('none', {
    value: props.display,
    onChange: props.onDisplayChange
  });
  const [open, setOpen] = useMergedState<boolean>(defaultOpen, {
    value: isModalOpen,
    onChange: onOpenChange
  });

  const content = (
    <InternalImageSpace
      ref={ref}
      display={displayPanel}
      onDisplayChange={(val) => {
        setDisplayPanel(val);
      }}
      {...rest}
      style={{
        width: '880px',
        height: '600px',
        ...style
      }} />
  );

  return (
    <Modal
      title={title}
      width={'fit-content'}
      closable={!!title}
      {...restModalProps}
      styles={{
        ...styles,
        content: {
          width: 'fit-content',
          ...styles?.content,
        }
      }}
      footer={null}
      open={open}
      onCancel={(e) => {
        setDisplayPanel('none');
        onCancel?.(e);
        setOpen(false);
      }}
    >
      {content}
    </Modal>
  )
});
type CompoundedComponent = typeof InternalImageSpace & {
  Popover: typeof ImageSpacePopover;
  Modal: typeof ImageSpaceModal;
};
const ImageSpace = InternalImageSpace as CompoundedComponent;
ImageSpace.Popover = ImageSpacePopover;
ImageSpace.Modal = ImageSpaceModal;

export type { ImageFile, FolderTreeType, ImageSpaceRef, BaseRequestParam };
export default ImageSpace;
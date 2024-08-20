import { CSSProperties, Key, ReactNode, Ref, useEffect, useImperativeHandle, useMemo, useState } from 'react';
import { Button, message, Typography, UploadFile } from 'antd';
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
};

interface ImageSpaceRef {
  onRefresh: () => void | Promise<void>;
}

const InternalImageSpace = <
  UploadResponseBodyType extends UploadResponseBody = UploadResponseBody,
  RequestParamType extends BaseRequestParam = BaseRequestParam,
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
  const [displayPanel, setDisplayPanel] = useState<DisplayPanelType>('none');

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
      <div className={classNames(`${prefixCls}-body`, hashId)}>
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
      <div className={classNames(`${prefixCls}-footer`, hashId)}>
        <div className={classNames(`${prefixCls}-footer-left`, hashId)}>
          {footer?.left}
        </div>
        <div className={classNames(`${prefixCls}-footer-right`, hashId)}>
          {footer?.right}
        </div>
      </div>
    </div>
  );
}

const ImageSpace = React.forwardRef<ImageSpaceRef, ImageSpaceProps<BaseRequestParam, UploadResponseBody>>(InternalImageSpace);
export type { ImageFile, FolderTreeType, ImageSpaceRef, BaseRequestParam };
export default ImageSpace;


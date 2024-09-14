import { CSSProperties, forwardRef, Key, ReactNode, Ref, useEffect, useImperativeHandle, useState } from 'react';
import { Button, message, Segmented, Space, Spin } from 'antd';
import { classNames } from '@web-react/biz-utils';
import { useStyle } from './style';

import FolderTree, { FolderTreeType } from './FolderTree';
import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons';

type RequestParam = {
  page: number,
  size: number,
  folderId?: Key
}
type ImageFile = {
  id: Key;
  name?: string;
  size?: number;
  pixel?: string;
  fullUrl?: string;
  isRef?: boolean;
}

type ImageSpaceProps = {
  className?: string;
  style?: CSSProperties;
  actionsRender?: (dom: ReactNode) => ReactNode;
  defaultFolder?: FolderTreeType;
  fetchFolders?: () => Promise<FolderTreeType[]>;
  pageSize?: number;
  fetchData?: (param: RequestParam) => Promise<{ items: ImageFile[], total: number, }>;
};

interface ImageSpaceRef {
  refresh: () => void | Promise<void>;
}

const InternalImageSpace = forwardRef<ImageSpaceRef, ImageSpaceProps>((
  props: ImageSpaceProps,
  ref: Ref<ImageSpaceRef>
) => {
  const { defaultFolder, fetchFolders, fetchData, pageSize = 20, actionsRender } = props;
  const { prefixCls, wrapSSR, hashId, token } = useStyle();
  const [loading, setLoading] = useState(false);
  const [curPage, setCurPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [dirloading, setDirLoading] = useState(false);
  const [folderId, setFolderId] = useState<Key>(defaultFolder?.value || '');
  const [folders, setFolders] = useState<FolderTreeType[]>(defaultFolder ? [defaultFolder] : []);
  const [imageFiles, setImageFiles] = useState<ImageFile[]>([]);
  const [showType, setShowType] = useState<'list' | 'table'>('list');

  useImperativeHandle(ref, () => ({
    refresh: () => {
      return handleRefresh();
    },
  }));

  useEffect(() => {
    loadDirs();
    loadData({ page: curPage + 1, fist: true });
  }, []);

  useEffect(() => {
    if (folderId) { handleRefresh(); }
  }, [folderId]);

  const handleRefresh = async () => {
    await loadData({ page: 1 });
  }

  const loadDirs = async () => {
    setDirLoading(true);
    try {
      const data = await fetchFolders?.() || [];
      const folders = defaultFolder && !data.some(s => s.value === defaultFolder.value)
        ? [defaultFolder, ...data]
        : data;
      setFolders(folders);
    } catch (error: any) {
      message.error(error?.message || '加载失败');
    } finally {
      setDirLoading(false);
    }
  };

  const loadData = async (param: { page: number, fist?: boolean, [key: string]: any }) => {
    const { page, fist, ...rest } = param;
    const totalPage = fist ? 1 : Math.ceil(totalCount / pageSize);
    if (page > totalPage) { return; }
    setLoading(true);
    try {
      const param: RequestParam = { ...rest, page, size: pageSize, folderId } as any;
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

  const defaultactions = (
    <Space>
      <Segmented
        defaultValue={showType}
        options={[
          { value: 'list', icon: <AppstoreOutlined /> },
          { value: 'table', icon: <BarsOutlined /> },
        ]}
        onChange={(value: any) => {
          setShowType(value)
        }}
      />
      <Button disabled={loading}
        onClick={handleRefresh}>
        刷新
      </Button>
    </Space>
  )

  return wrapSSR(
    <div className={classNames(`${prefixCls}`, hashId)}>
      {/* <div className={classNames(`${prefixCls}-header`, hashId)}>

      </div> */}
      <div className={classNames(`${prefixCls}-body`, hashId)}>
        <div className={classNames(`${prefixCls}-aside`, hashId)}>
          <div className={classNames(`${prefixCls}-treeDom`, hashId)} >
            <Spin spinning={dirloading}
              wrapperClassName={classNames(`${prefixCls}-spin`, hashId)}>
              <FolderTree
                data={folders}
                value={folderId}
                onChange={(val) => {
                  setFolderId(val);
                }} />
            </Spin>
          </div>
        </div>
        <div className={classNames(`${prefixCls}-container`, hashId)}>
          <div className={classNames(`${prefixCls}-container-top`, hashId)}>
            {actionsRender?.(defaultactions) || defaultactions}
          </div>
          <div className={classNames(`${prefixCls}-container-list`, hashId)}>
            <Spin spinning={loading}
              wrapperClassName={classNames(`${prefixCls}-spin`, hashId)}>
              <div style={{ height: '1000px', }}>
                123456789
              </div>
            </Spin>
          </div>
        </div>
      </div>
      <div className={classNames(`${prefixCls}-footer`, hashId)}>

      </div>
    </div>
  );
}
);


type CompoundedComponent = typeof InternalImageSpace & {

};
const ImageSpace = InternalImageSpace as CompoundedComponent;

export default ImageSpace;
export type {
  ImageSpaceProps,
  ImageSpaceRef,
  ImageFile
};
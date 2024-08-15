import { Key, useEffect, useMemo, useState } from 'react';
import { Button, message, Typography } from 'antd';
import { classNames } from '@web-react/biz-utils';
import PicUploader, { DisplayPanelType, FolderType } from './Uploader';
import FolderTree, { FolderTreeType } from './folderTree';
import PicPanel, { ImageFile } from './picPanel';
import { useStyle } from './style';

type BaseRequestParam = {
  page: number,
  size: number,
  folderId?: Key
}
type ImageSpaceProps<RequestParamType extends BaseRequestParam> = {
  /** 类名 */
  className?: string;
  /** 样式 */
  style?: React.CSSProperties;
  /** 自定义样式前缀 */
  prefixCls?: string;

  pageSize?: number;
  defaultFolder?: FolderTreeType;
  fetchFolders?: () => Promise<FolderTreeType[]>;
  fetchData: (param: RequestParamType) => Promise<{ items: ImageFile[], total: number, }>;
  onOk?: (ids: Key[], files: ImageFile[]) => void | Promise<void>;
};
const ImageSpace = <
  RequestParamType extends BaseRequestParam = BaseRequestParam
>(
  props: ImageSpaceProps<RequestParamType>
) => {
  const { style, className, defaultFolder, pageSize = 20, fetchData, fetchFolders, onOk } = props;
  const { prefixCls, wrapSSR, hashId, token } = useStyle(props.prefixCls);
  const classString = classNames(prefixCls, className, hashId, {});
  const [displayPanel, setDisplayPanel] = useState<DisplayPanelType>('none');
  const [selectKeys, setSelectKeys] = useState<Key[]>([]);

  const [folderId, setFolderId] = useState<Key>(defaultFolder?.value || '');
  const [folders, setFolders] = useState<FolderTreeType[]>(defaultFolder ? [defaultFolder] : []);

  const [loading, setLoading] = useState(false);
  const [curPage, setCurPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [imageFiles, setImageFiles] = useState<ImageFile[]>([]);

  useEffect(() => {
    loadDirs();
    loadData(curPage + 1, true);
  }, []);

  useEffect(() => {
    if (folderId) { loadData(1); }
  }, [folderId]);

  const loadDirs = async () => {
    const data = await fetchFolders?.() || [];
    const folders = defaultFolder ? [defaultFolder, ...data] : data;
    setFolders(folders);
  };
  const loadData = async (page: number, fist?: boolean) => {
    const totalPage = fist ? 1 : Math.ceil(totalCount / pageSize);
    if (page > totalPage) { return; }
    setLoading(true);
    try {
      const param: RequestParamType = { page, size: pageSize, folderId } as any;
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

  const handleOk = async (e: any) => {
    const selectFiles = imageFiles.filter((item) => selectKeys.includes(item.id));
    await onOk?.(selectKeys, selectFiles);
    setSelectKeys([]);
  };

  const selectCount = useMemo(() => {
    return selectKeys?.length || 0;
  }, [selectKeys])

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
            // left: <SearchForm />,
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
          onLoadMore={() => loadData(curPage + 1)}
          onRefresh={() => loadData(1)}
        />
        <PicUploader
          // folders={folders}
          display={displayPanel}
          onDisplayChange={(val) => {
            setDisplayPanel(val)
          }}
        />
      </div>
      <div className={classNames(`${prefixCls}-footer`, hashId)}>
        <div className={classNames(`${prefixCls}-footer-left`, hashId)}>
          <Typography.Link target="_blank">
            进入图片空间
          </Typography.Link>
        </div>
        <div className={classNames(`${prefixCls}-footer-right`, hashId)}>
          <Button
            type="primary"
            disabled={selectKeys?.length == 0}
            onClick={handleOk}
          >
            确定{selectCount > 0 && `（${selectCount}）`}
          </Button>
        </div>
      </div>
    </div>
  );
};

export type { ImageSpaceProps, ImageFile, FolderType };
export default ImageSpace;

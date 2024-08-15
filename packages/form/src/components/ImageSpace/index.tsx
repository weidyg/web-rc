import { Key, useEffect, useMemo, useState } from 'react';
import { Button, Input, Select, Space, Typography } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
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
  fetchFolders?: () => Promise<FolderTreeType[]>;
  fetchData: (param: RequestParamType) => Promise<{ items: ImageFile[], total: number, }>;
};
const ImageSpace = <
  RequestParamType extends BaseRequestParam = BaseRequestParam
>(
  props: ImageSpaceProps<RequestParamType>
) => {
  const { style, className, pageSize = 20, fetchData, fetchFolders } = props;
  const { prefixCls, wrapSSR, hashId, token } = useStyle(props.prefixCls);
  const classString = classNames(prefixCls, className, hashId, {});
  const [displayPanel, setDisplayPanel] = useState<DisplayPanelType>('none');
  const [selectKeys, setSelectKeys] = useState<(string | number)[]>([]);

  const [folders, setFolders] = useState<FolderTreeType[]>([]);
  const [folderId, setFolderId] = useState<Key>();


  // const [loading, setLoading] = useState(false);
  // const [curPage, setCurPage] = useState(0);
  // const [totalCount, setTotalCount] = useState(0);
  // const [imageFiles, setImageFiles] = useState<ImageFile[]>([]);
  // useEffect(() => {
  //     fetchData(curPage + 1, true);
  // }, [])

  // const fetchData = async (page: number, fist?: boolean) => {
  //     const totalPage = fist ? 1 : Math.ceil(totalCount / pageSize);
  //     if (page > totalPage) { return; }
  //     setLoading(true);
  //     try {
  //         const data = await loadData(page, pageSize);
  //         const newData = data?.items || [];
  //         const newImageFiles = page > 1
  //             ? [...imageFiles, ...newData]
  //             : newData;
  //         setCurPage(page);
  //         setTotalCount(data.total || 0);
  //         setImageFiles(newImageFiles);
  //     } catch (error: any) {
  //         message.error(error?.message || '加载失败');
  //     } finally {
  //         setLoading(false);
  //     }
  // };



  useEffect(() => {
    loadDirs();
  }, [])
  const loadDirs = async () => {
    const data = await fetchFolders?.() || [];
    setFolders(data);
  };

  const loadData = async (page: number, size: number) => {
    const param: RequestParamType = { page, size, folderId } as any;
    const data = await fetchData?.(param) || { items: [], total: 0 };
    return data;
  };

  const handleOk = (e: any) => {

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
              defaultActiveFirstOption
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
          pageSize={pageSize}
          loadData={loadData}
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

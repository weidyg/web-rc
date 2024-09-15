import { CSSProperties, forwardRef, Key, ReactNode, Ref, useEffect, useImperativeHandle, useState } from 'react';
import { Image, Button, Checkbox, Divider, message, Radio, Segmented, Space, Spin, Table } from 'antd';
import { classNames, convertByteUnit, useMergedState } from '@web-react/biz-utils';
import { useStyle } from './style';

import FolderTree, { FolderTreeType } from './FolderTree';
import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons';
import PicCard from './PicCard';
import { ColumnsType } from 'antd/es/table';

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
  mutiple?: boolean,
  pageSize?: number;
  actionsRender?: (dom: ReactNode) => ReactNode;
  defaultFolder?: FolderTreeType;
  fetchFolders?: () => Promise<FolderTreeType[]>;
  defaultValue?: Key[];
  value?: Key[];
  onChange?: (ids: Key[], files: ImageFile[]) => void | Promise<void>;
  fetchData?: (param: RequestParam) => Promise<{ items: ImageFile[], total: number, }>;
};

interface ImageSpaceRef {
  refresh: () => void | Promise<void>;
}

const InternalImageSpace = forwardRef<ImageSpaceRef, ImageSpaceProps>((
  props: ImageSpaceProps,
  ref: Ref<ImageSpaceRef>
) => {
  const { defaultFolder, fetchFolders, fetchData, actionsRender, pageSize = 20, mutiple = true } = props;
  const { prefixCls, wrapSSR, hashId, token } = useStyle();
  const [loading, setLoading] = useState(false);
  const [curPage, setCurPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [dirloading, setDirLoading] = useState(false);
  const [folderId, setFolderId] = useState<Key>(defaultFolder?.value || '');
  const [folders, setFolders] = useState<FolderTreeType[]>(defaultFolder ? [defaultFolder] : []);
  const [imageFiles, setImageFiles] = useState<ImageFile[]>([]);
  const [showType, setShowType] = useState<'list' | 'table'>('table');

  const [selectKeys, setSelectKeys] = useMergedState<Key[]>([], {
    defaultValue: props?.defaultValue,
    value: props?.value,
    onChange: (value) => {
      const selectFiles = imageFiles.filter((item) => value.includes(item.id));
      props?.onChange?.(value, selectFiles);
    },
  });

  useImperativeHandle(ref, () => ({
    refresh: () => {
      return handleRefresh();
    },
  }));

  useEffect(() => {
    loadDirs();
    handleLoadMore(true);
  }, []);

  useEffect(() => {
    if (folderId) { handleRefresh(); }
  }, [folderId]);

  const handleRefresh = async () => {
    await loadData({ page: 1 });
  }
  const handleLoadMore = async (fist?: boolean) => {
    loadData({ page: curPage + 1, fist: fist });
  }
  const handleScroll = async (event: React.SyntheticEvent<HTMLDivElement>) => {
    const { scrollTop, clientHeight, scrollHeight } = event.target as HTMLDivElement;
    if (scrollTop + clientHeight >= scrollHeight) {
      if (!loading) { await handleLoadMore?.(); }
    }
  };
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


  const isChecked = (id: Key): boolean => {
    return selectKeys?.includes(id) ?? false;
  };
  const checkChange = (id: Key, checked: boolean) => {
    const keys = !mutiple
      ? (checked ? [id] : [])
      : (selectKeys.includes(id)
        ? (checked ? selectKeys : selectKeys.filter(k => k !== id))
        : (checked ? [...selectKeys, id] : selectKeys));
    setSelectKeys(keys);
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

  const LoadMore = (props: { wrapper?: (node: React.ReactNode) => React.ReactNode }) => {
    const hasMore = curPage * pageSize >= totalCount;
    if (loading || hasMore) { return <></> }
    const node = <Divider dashed={true}>
      <span
        style={{
          cursor: 'pointer',
          fontSize: token.fontSize,
          color: token.colorTextTertiary,
        }}
        onClick={() => {
          handleLoadMore?.();
        }}>
        加载更多...
      </span>
    </Divider>
    return props?.wrapper?.(node) || node;
  }

  const columns: ColumnsType<ImageFile> = [
    {
      dataIndex: 'name', title: '文件',
      render: (_, record) => (<RenderFileName file={record} />),
    },
    { dataIndex: 'pixel', title: '尺寸' },
    {
      dataIndex: 'size', title: '大小',
      render: (value) => convertByteUnit(value)
    },
    // { dataIndex: 'status', title: '状态' },
    // { dataIndex: 'gmtModified', title: '修改时间' },
  ]
  const RenderFileName = (props: { file: ImageFile, mutiple?: boolean, }) => {
    const { file, mutiple = true } = props;
    const [preview, setPreview] = useState(false);
    const checked = isChecked(file.id);
    const Selectbox = mutiple ? Checkbox : Radio;
    return <div className={classNames(`${prefixCls}-fileName`, hashId)}>
      <div className={classNames(`${prefixCls}-fileName-checkbox`, hashId)}>
        <Selectbox
          checked={checked}
          onChange={(e) => {
            checkChange(file.id, e.target.checked);
          }}
        />
      </div>
      <div className={classNames(`${prefixCls}-fileName-img`, hashId)}>
        <Image
          src={file?.fullUrl}
          onClick={() => { setPreview(true); }}
          preview={{
            visible: preview,
            maskStyle: { backgroundColor: 'rgba(0, 0, 0, 0.65)' },
            src: file?.fullUrl,
            mask: undefined,
            onVisibleChange: (value: boolean, prevValue: boolean) => {
              if (value == false && prevValue == true) {
                setPreview(value);
              }
            },
          }} />
      </div>
      <div className={classNames(`${prefixCls}-fileName-title`, hashId)} >
        <p>{file?.name}</p>
      </div>
    </div>
  }
  const BodyWrapper = (props: any) => {
    const { children, ...restProps } = props;
    return <tbody   {...restProps}>
      <>
        {children}
        <LoadMore wrapper={(node) => (<tr>
          <td colSpan={columns?.length || 1}>
            {node}
          </td>
        </tr>)} />
      </>
    </tbody>;
  };
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
          {showType == 'list' &&
            <div className={classNames(`${prefixCls}-container-list`, hashId)}
              onScroll={handleScroll}>
              <Spin spinning={loading}
                wrapperClassName={classNames(`${prefixCls}-spin`, hashId)}>
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                  margin: '8px 8px 0 8px'
                }}>
                  {imageFiles.map((item, index) => (
                    <PicCard
                      mutiple={mutiple}
                      key={index}
                      id={item.id}
                      name={item.name}
                      fullUrl={item.fullUrl}
                      pixel={item.pixel}
                      isRef={item.isRef}
                      checked={isChecked(item.id)}
                      onChange={(value: boolean) => {
                        checkChange(item.id, value);
                      }}
                    />
                  ))}
                  {Array.from({ length: 10 }).map((_, index) => (<PicCard.Empty key={index} />))}
                  <LoadMore />
                </div>
              </Spin>
            </div>
          }
          {showType == 'table' &&
            <div className={classNames(`${prefixCls}-container-table`, hashId)}>
              {/* <div style={{ height: '1000px' }}>123</div> */}
              <div className={classNames(`${prefixCls}-container-table-header`, hashId)}>
              header
              </div>
              <div className={classNames(`${prefixCls}-container-table-body`, hashId)}>
                <div style={{ height: '1000px' }}>123</div>
              </div>
            </div>
          }
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
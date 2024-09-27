import { CSSProperties, forwardRef, Key, ReactNode, Ref, useEffect, useImperativeHandle, useState } from 'react';
import { Image, Button, Checkbox, Divider, message, Radio, Segmented, Space, Spin, Empty } from 'antd';
import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons';
import { classNames, convertByteUnit, useMergedState } from '@web-react/biz-utils';
import { useStyle } from './style';

import PicCard from './PicCard';
import { Folder, FolderProps } from '@web-react/biz-components';

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
  actionsRender?: (dom?: ReactNode) => ReactNode;
  footerRender?: (dom?: ReactNode) => ReactNode;
  defaultFolder?: FolderProps['defaultValue'];
  folders?: FolderProps['data'];
  defaultValue?: Key[];
  value?: Key[];
  onChange?: (ids: Key[], files: ImageFile[]) => void | Promise<void>;
  fetchData?: (param: RequestParam) => Promise<{ items: ImageFile[], total: number, }>;
};

interface ImageSpaceRef {
  refresh: () => void | Promise<void>;
  clearSelected: () => void;
}

const InternalImageSpace = forwardRef<ImageSpaceRef, ImageSpaceProps>((
  props: ImageSpaceProps,
  ref: Ref<ImageSpaceRef>
) => {
  const { className, style, pageSize = 20, mutiple = true,
    defaultFolder, folders,
    fetchData, actionsRender, footerRender
  } = props;
  const { prefixCls, wrapSSR, hashId, token } = useStyle();
  const [loading, setLoading] = useState(false);
  const [curPage, setCurPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [folderId, setFolderId] = useState(defaultFolder);
  const [imageFiles, setImageFiles] = useState<ImageFile[]>([]);
  const [showType, setShowType] = useState<'list' | 'table'>('list');

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
    clearSelected: () => {
      return setSelectKeys([]);
    },
  }));

  useEffect(() => {
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
    // console.log("handleScroll", scrollTop + clientHeight - scrollHeight);
    if (scrollTop + clientHeight + 2 >= scrollHeight) {
      if (!loading) { await handleLoadMore?.(); }
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
  return wrapSSR(
    <div style={style} className={classNames(`${prefixCls}`, className, hashId)}>
      {/* <div className={classNames(`${prefixCls}-header`, hashId)}>
        选择图片（最小宽度375，最小高度500，大小不超过5M）
      </div> */}
      <div className={classNames(`${prefixCls}-body`, hashId)}>
        <div className={classNames(`${prefixCls}-aside`, hashId)}>
          <Folder
            data={folders}
            value={folderId}
            onChange={(val) => {
              setFolderId(val);
            }} />
        </div>
        <div className={classNames(`${prefixCls}-container`, hashId)}>
          <div className={classNames(`${prefixCls}-container-top`, hashId)}>
            {actionsRender?.(defaultactions) || defaultactions}
          </div>
          {showType == 'list' &&
            <Spin spinning={loading}
              wrapperClassName={classNames(`${prefixCls}-spin`, hashId)}>
              <div onScroll={handleScroll}
                className={classNames(`${prefixCls}-list-container`, hashId)}>
                {imageFiles?.length == 0 ? (
                  <div className={classNames(`${prefixCls}-empty`, hashId)} >
                    <Empty />
                  </div>
                ) : (
                  <div className={classNames(`${prefixCls}-list`, hashId)}>
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
                )}
              </div>
            </Spin>
          }
          {showType == 'table' &&
            <Spin spinning={loading}
              wrapperClassName={classNames(`${prefixCls}-spin`, hashId)}>
              <div className={classNames(`${prefixCls}-table-container`, hashId)}>
                <div className={classNames(`${prefixCls}-table-header`, hashId)}>
                  <table >
                    <thead>
                      <tr>
                        <th style={{ paddingLeft: '28px' }}>文件</th>
                        <th style={{ width: 120 }}>尺寸</th>
                        <th style={{ width: 120 }}>大小</th>
                      </tr>
                    </thead>
                  </table>
                </div>
                <div onScroll={handleScroll}
                  className={classNames(`${prefixCls}-table-body`, hashId)}>
                  {imageFiles?.length == 0 ? (
                    <div className={classNames(`${prefixCls}-empty`, hashId)} >
                      <Empty />
                    </div>
                  ) : (
                    <table>
                      <tbody>
                        {imageFiles.map((record, index) => (
                          <tr key={index}>
                            <td><RenderFileName file={record} /></td>
                            <td style={{ width: 120 }}>{record.pixel}</td>
                            <td style={{ width: 120 }}>{convertByteUnit(record.size || 0)}</td>
                          </tr>
                        ))}
                        <tr>
                          <td colSpan={3}><LoadMore /></td>
                        </tr>
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </Spin>
          }
        </div>
      </div >
      {/* {footerRender && */}
      <div className={classNames(`${prefixCls}-footer`, hashId)}>
        {footerRender?.()}
      </div>
      {/* } */}
    </div >
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
import { CSSProperties, forwardRef, Key, ReactNode, Ref, useEffect, useImperativeHandle, useState } from 'react';
import { Image, Button, Checkbox, Divider, message, Radio, Segmented, Space, Spin, Empty } from 'antd';
import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons';
import { classNames, convertByteUnit, useMergedState } from '@web-rc/biz-utils';
import { useStyles } from './style';
import { debounce } from 'lodash';

import PicCard from './PicCard';
import Folder, { FolderProps } from '../Folder';

type RequestParam = {
  page: number;
  size: number;
  folderId?: Key;
};
type ImageFile = {
  id: Key;
  name?: string;
  size?: number;
  pixel?: string;
  fullUrl?: string;
  isRef?: boolean;
};
type DataType = {
  curPage: number,
  totalCount: number,
  imageFiles: ImageFile[]
};

type ImageSpaceProps = {
  className?: string;
  style?: CSSProperties;
  mutiple?: boolean;
  pageSize?: number;
  actionsRender?: (dom?: ReactNode) => ReactNode;
  footerRender?: (dom?: ReactNode) => ReactNode;
  folderLoading?: boolean;
  defaultFolder?: FolderProps['defaultValue'];
  folders?: FolderProps['data'];
  defaultValue?: Key[];
  value?: Key[];
  onChange?: (value: { ids: Key[]; files: ImageFile[] }) => void | Promise<void>;
  fetchData?: (param: RequestParam) => Promise<{ items: ImageFile[]; total: number }>;
  /** @name request防抖动时间 默认10 单位ms */
  debounceTime?: number;
};

interface ImageSpaceRef {
  refresh: () => void | Promise<void>;
  clearSelected: () => void;
}

const InternalImageSpace = forwardRef((props: ImageSpaceProps, ref: Ref<ImageSpaceRef>) => {
  const {
    className,
    style,
    debounceTime = 10,
    pageSize = 20,
    mutiple = true,
    folderLoading,
    defaultFolder,
    folders,
    fetchData,
    actionsRender,
    footerRender,
  } = props;
  const { prefixCls, wrapSSR, hashId, token } = useStyles();
  const [loading, setLoading] = useState(false);
  const [folderId, setFolderId] = useState(defaultFolder);
  const [data, setData] = useState<DataType>({ curPage: 0, totalCount: 0, imageFiles: [] });

  // const [curPage, setCurPage] = useState(0);
  // const [totalCount, setTotalCount] = useState(0);
  // const [imageFiles, setImageFiles] = useState<ImageFile[]>([]);
  const [showType, setShowType] = useState<'list' | 'table'>('list');

  const [selectKeys, setSelectKeys] = useMergedState<Key[]>([], {
    defaultValue: props?.defaultValue,
    value: props?.value,
    onChange: (value) => {
      const selectFiles = data?.imageFiles.filter((item) => value.includes(item.id));
      props?.onChange?.({ ids: value, files: selectFiles });
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
    setData({ curPage: 1, totalCount: 0, imageFiles: [] });
    handleRefresh();
  }, [folderId]);

  const handleRefresh = async () => {
    await loadData({ page: 1 });
  };
  const handleLoadMore = async () => {
    await loadData({ page: data.curPage + 1 });
  };
  const handleScroll = async (event: React.SyntheticEvent<HTMLDivElement>) => {
    const { scrollTop, clientHeight, scrollHeight } = event.target as HTMLDivElement;
    if (scrollTop + clientHeight + 2 >= scrollHeight) {
      if (!loading) {
        await handleLoadMore?.();
      }
    }
  };

  const loadData = debounce(async (param: { page: number;[key: string]: any }) => {
    const { page, ...rest } = param;
    const totalPage = page == 1 ? 1 : Math.ceil(data.totalCount / pageSize);
    if (page > totalPage) {
      return;
    }
    setLoading(true);
    try {
      const param: RequestParam = { ...rest, page, size: pageSize, folderId } as any;
      const { items = [], total } = (await fetchData?.(param)) || { items: [], total: 0 };
      const newImageFiles = page > 1 ? [...data.imageFiles, ...items] : items;
      setData({ curPage: page, totalCount: total, imageFiles: newImageFiles });
      // console.log("loadData1", param, page, data.total);
    } catch (error: any) {
      message.error(error?.message || '加载失败');
    } finally {
      setLoading(false);
    }
  }, debounceTime);

  const isChecked = (id: Key): boolean => {
    return selectKeys?.includes(id) ?? false;
  };
  const checkChange = (id: Key, checked: boolean) => {
    const keys = !mutiple
      ? checked
        ? [id]
        : []
      : selectKeys.includes(id)
        ? checked
          ? selectKeys
          : selectKeys.filter((k) => k !== id)
        : checked
          ? [...selectKeys, id]
          : selectKeys;
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
          setShowType(value);
        }}
      />
      <Button disabled={loading} onClick={handleRefresh}>
        刷新
      </Button>
    </Space>
  );

  const LoadMore = (props: { wrapper?: (node: React.ReactNode) => React.ReactNode }) => {
    const hasMore = data.curPage * pageSize >= data.totalCount;
    if (loading || hasMore) {
      return <></>;
    }
    const node = (
      <Divider dashed={true}>
        <span
          style={{
            cursor: 'pointer',
            fontSize: token.fontSize,
            color: token.colorTextTertiary,
          }}
          onClick={() => {
            handleLoadMore?.();
          }}
        >
          加载更多...
        </span>
      </Divider>
    );
    return props?.wrapper?.(node) || node;
  };

  const RenderFileName = (props: { file: ImageFile; mutiple?: boolean }) => {
    const { file, mutiple = true } = props;
    const [preview, setPreview] = useState(false);
    const checked = isChecked(file.id);
    const Selectbox = mutiple ? Checkbox : Radio;
    return (
      <div className={classNames(`${prefixCls}-fileName`, hashId)}>
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
            onClick={() => {
              setPreview(true);
            }}
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
            }}
          />
        </div>
        <div className={classNames(`${prefixCls}-fileName-title`, hashId)}>
          <p>{file?.name}</p>
        </div>
      </div>
    );
  };
  return wrapSSR(
    <div style={style} className={classNames(`${prefixCls}`, className, hashId)}>
      {/* <div className={classNames(`${prefixCls}-header`, hashId)}>
        选择图片（最小宽度375，最小高度500，大小不超过5M）
      </div> */}
      <div className={classNames(`${prefixCls}-body`, hashId)}>
        <div className={classNames(`${prefixCls}-aside`, hashId)}>
          <Folder
            loading={folderLoading}
            data={folders}
            value={folderId}
            onChange={(val) => {
              setFolderId(val);
            }}
          />
        </div>
        <div className={classNames(`${prefixCls}-container`, hashId)}>
          <div className={classNames(`${prefixCls}-container-top`, hashId)}>
            {actionsRender?.(defaultactions) || defaultactions}
          </div>
          {showType == 'list' && (
            <Spin spinning={loading} wrapperClassName={classNames(`${prefixCls}-spin`, hashId)}>
              <div onScroll={handleScroll} className={classNames(`${prefixCls}-list-container`, hashId)}>
                {data?.imageFiles?.length == 0 ? (
                  <div className={classNames(`${prefixCls}-empty`, hashId)}>
                    <Empty description={loading ? `加载中...` : '暂无图片'} />
                  </div>
                ) : (
                  <div className={classNames(`${prefixCls}-list`, hashId)}>
                    {data.imageFiles.map((item, index) => (
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
                    {Array.from({ length: 10 }).map((_, index) => (
                      <PicCard.Empty key={index} />
                    ))}
                    <LoadMore />
                  </div>
                )}
              </div>
            </Spin>
          )}
          {showType == 'table' && (
            <Spin spinning={loading} wrapperClassName={classNames(`${prefixCls}-spin`, hashId)}>
              <div className={classNames(`${prefixCls}-table-container`, hashId)}>
                <div className={classNames(`${prefixCls}-table-header`, hashId)}>
                  <table>
                    <thead>
                      <tr>
                        <th style={{ paddingLeft: '28px' }}>文件</th>
                        <th style={{ width: 120 }}>尺寸</th>
                        <th style={{ width: 120 }}>大小</th>
                      </tr>
                    </thead>
                  </table>
                </div>
                <div onScroll={handleScroll} className={classNames(`${prefixCls}-table-body`, hashId)}>
                  {data.imageFiles?.length == 0 ? (
                    <div className={classNames(`${prefixCls}-empty`, hashId)}>
                      <Empty />
                    </div>
                  ) : (
                    <table>
                      <tbody>
                        {data.imageFiles.map((record, index) => (
                          <tr key={index}>
                            <td>
                              <RenderFileName file={record} />
                            </td>
                            <td style={{ width: 120 }}>{record.pixel}</td>
                            <td style={{ width: 120 }}>{convertByteUnit(record.size || 0)}</td>
                          </tr>
                        ))}
                        <tr>
                          <td colSpan={3} style={{ padding: 0, borderBottom: 'none' }}>
                            <LoadMore />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </Spin>
          )}
        </div>
      </div>
      {footerRender && <div className={classNames(`${prefixCls}-footer`, hashId)}>{footerRender?.()}</div>}
    </div>,
  );
});

type CompoundedComponent = typeof InternalImageSpace & {};
const ImageSpace = InternalImageSpace as CompoundedComponent;

export default ImageSpace;
export type { ImageSpaceProps, ImageSpaceRef, ImageFile };

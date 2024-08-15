import { useEffect, useRef, useState } from 'react';
import { Image, Button, Checkbox, Segmented, Space, Spin, Table, message, Divider } from 'antd';
import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons';
import { classNames, convertByteUnit, useMergedState } from '@web-react/biz-utils';
import { useStyle } from './style';
import { ColumnsType } from 'antd/es/table';
import PicCard from '../picCard';

type ImageFile = {
    id: string | number;
    name?: string;
    size?: number;
    pixel?: string;
    fullUrl?: string;
    isRef?: boolean;
}
type PicPanelProps = {
    prefixCls?: string;
    actions?: {
        left?: React.ReactNode;
        right?: React.ReactNode;
    },
    pageSize?: number;
    loadData: (page: number, size: number) => Promise<{
        items: ImageFile[];
        total: number;
    }>;
    defaultSelectKeys?: ImageFile['id'][],
    selectKeys?: ImageFile['id'][],
    onSelect?: (selectKeys: ImageFile['id'][]) => void,
};
const PicPanel: React.FC<PicPanelProps> = (props) => {
    const { actions, loadData, pageSize = 20 } = props;
    const { prefixCls, wrapSSR, hashId, token } = useStyle(props?.prefixCls);
    const [showType, setShowType] = useState<'list' | 'table'>('list');
    const [selectKeys, setSelectKeys] = useMergedState<(string | number)[]>(props?.defaultSelectKeys || [], {
        value: props?.selectKeys,
        onChange: props?.onSelect,
    });

    const [loading, setLoading] = useState(false);
    const [curPage, setCurPage] = useState(0);
    const [totalCount, setTotalCount] = useState(0);
    const [imageFiles, setImageFiles] = useState<ImageFile[]>([]);
    useEffect(() => {
        fetchData(curPage + 1, true);
    }, [])

    const fetchData = async (page: number, fist?: boolean) => {
        const totalPage = fist ? 1 : Math.ceil(totalCount / pageSize);
        if (page > totalPage) { return; }
        setLoading(true);
        try {
            const data = await loadData(page, pageSize);
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

    const handleScroll = async (event: React.SyntheticEvent<HTMLDivElement>) => {
        const { scrollTop, clientHeight, scrollHeight } = event.target as HTMLDivElement;
        if (scrollTop + clientHeight >= scrollHeight) {
            if (!loading) { fetchData(curPage + 1); }
        }
    };
    const handleRefresh = () => {
        fetchData(1);
    }

    const isChecked = (id: string | number): boolean => {
        return selectKeys?.includes(id) ?? false;
    };
    const checkChange = (id: string | number, checked: boolean) => {
        setSelectKeys(keys => {
            return keys.includes(id)
                ? (checked ? keys : keys.filter(k => k !== id))
                : (checked ? [...keys, id] : keys);
        });
    };

    const LoadMore = (props: { wrapper?: (node: React.ReactNode) => React.ReactNode }) => {
        const { wrapper } = props;
        if (loading || (curPage * pageSize >= totalCount)) { return <></> }
        const node = <Divider dashed={true}>
            <span
                style={{
                    cursor: 'pointer',
                    fontSize: token.fontSize,
                    color: token.colorTextTertiary,
                }}
                onClick={() => {
                    fetchData(curPage + 1);
                }}>
                加载更多...
            </span>
        </Divider>
        return wrapper?.(node) || node;
    }
    const RenderFileName = ({ file }: { file: ImageFile }) => {
        const [preview, setPreview] = useState(false);
        return <div className={classNames(`${prefixCls}-fileName`, hashId)}>
            <div className={classNames(`${prefixCls}-fileName-checkbox`, hashId)}>
                <Checkbox
                    checked={isChecked(file.id)}
                    onChange={(e) => {
                        checkChange(file.id, e.target.checked);
                    }}
                />
            </div>
            <div className={classNames(`${prefixCls}-fileName-img`, hashId)}>
                <img src={file?.fullUrl} />
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

    const dashboardRef = useRef<HTMLDivElement>(null);
    return wrapSSR(
        <div ref={dashboardRef}
            className={classNames(`${prefixCls}`, hashId)}>
            {loading &&
                <div className={classNames(`${prefixCls}-mask`, hashId)}>
                    <Spin size='large' spinning={true} />
                </div>
            }
            <div className={classNames(`${prefixCls}-header`, hashId)}>
                <div className={classNames(`${prefixCls}-header-actions`, hashId)}>
                    <div className={classNames(`${prefixCls}-header-actions-left`, hashId)}>
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
                            {actions?.left}
                        </Space>
                    </div>
                    <div className={classNames(`${prefixCls}-header-actions-right`, hashId)}>
                        {actions?.right}
                    </div>
                </div>
            </div>
            {showType == 'list' &&// display: showType == 'list' ? 'block' : 'none' 
                <div
                    onScroll={handleScroll}
                    style={{ overflowY: 'auto', }}
                    className={classNames(`${prefixCls}-list`, hashId)}
                >
                    <div className={classNames(`${prefixCls}-list-document`, hashId)}>
                        {imageFiles.map((item, index) => (
                            <PicCard
                                key={index}
                                id={item.id}
                                name={item.name}
                                fullUrl={item.fullUrl}
                                pixel={item.pixel}
                                isRef={item.isRef}
                                checked={isChecked(item.id)}
                                onAiEdit={() => { }}
                                onChange={(value: boolean, prevValue: boolean) => {
                                    checkChange(item.id, value);
                                }}
                            />
                        ))}
                        {Array.from({ length: 10 }).map((_, index) => (<PicCard.Empty key={index} />))}
                        <LoadMore />
                    </div>
                </div>
            }
            {showType == 'table' &&
                <div // style={{ display: showType == 'table' ? 'block' : 'none' }}
                    className={classNames(`${prefixCls}-table`, hashId)}>
                    <Table
                        rowKey={'id'}
                        size="middle"
                        scroll={{ y: 'calc(-180px + 100vh)' }}
                        pagination={false}
                        onScroll={handleScroll}
                        columns={columns}
                        dataSource={imageFiles}
                        components={{
                            body: {
                                wrapper: BodyWrapper,
                            },
                        }}
                    />
                </div>
            }
        </div >
    )
};
export type { PicPanelProps, ImageFile };
export default PicPanel;

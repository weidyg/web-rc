import { useEffect, useState } from 'react';
import { Image, Button, Checkbox, Segmented, Space, Spin, Table, message } from 'antd';
import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons';
import { classNames, convertByteUnit, useMergedState } from '@web-react/biz-utils';
import { useStyle } from './style';
import PicCard from './PicCard';

type ImageFile = {
    id: string | number;
    name?: string;
    size?: number;
    pixel?: string;
    fullUrl?: string;
    isRef?: boolean;
}
type PicDashboardProps = {
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
const PicDashboard: React.FC<PicDashboardProps> = (props) => {
    const { actions, loadData, pageSize = 20 } = props;
    const { prefixCls, wrapSSR, hashId, token } = useStyle(props?.prefixCls);
    const [showType, setShowType] = useState<'list' | 'table'>('list');
    const [loading, setLoading] = useState(false);
    const [current, setCurrent] = useState(0);
    const [totalPage, setTotalPage] = useState(1);
    const [imageFiles, setImageFiles] = useState<ImageFile[]>([]);
    const [selectKeys, setSelectKeys] = useMergedState<(string | number)[]>(props?.defaultSelectKeys || [], {
        value: props?.selectKeys,
        onChange: props?.onSelect,
    });



    useEffect(() => {
        fetchData(current + 1);
    }, [])

    const handleScroll = async (event: React.SyntheticEvent<HTMLDivElement>) => {
        const { scrollTop, clientHeight, scrollHeight } = event.target as HTMLDivElement;
        if (scrollTop + clientHeight >= scrollHeight) {
            console.log('滚动到底部');
            if (!loading) {
                fetchData(current + 1);
            }
        }
    };

    const fetchData = async (current: number) => {
        if (current > totalPage) { return; }
        setLoading(true);
        try {
            const data = await loadData(current, pageSize);
            const newData = data?.items || [];
            const newImageFiles = current > 1
                ? [...imageFiles, ...newData]
                : newData;
            const newtalPage = Math.ceil((data.total || 0) / pageSize);
            setCurrent(current);
            setTotalPage(newtalPage);
            setImageFiles(newImageFiles);
        } catch (error: any) {
            message.error(error?.message || '加载失败');
        } finally {
            setLoading(false);
        }
    };

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
    return wrapSSR(
        <div className={classNames(`${prefixCls}-dashboard`, hashId)}>
            {loading &&
                <div className={classNames(`${prefixCls}-mask`, hashId)}>
                    <Spin size='large' spinning={true} />
                </div>
            }
            <div className={classNames(`${prefixCls}-dashboard-header`, hashId)}>
                <div className={classNames(`${prefixCls}-dashboard-header-actions`, hashId)}>
                    <div className={classNames(`${prefixCls}-dashboard-header-actions-left`, hashId)}>
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
                            <Button>刷新</Button>
                            {actions?.left}
                        </Space>
                    </div>
                    <div className={classNames(`${prefixCls}-dashboard-header-actions-right`, hashId)}>
                        {actions?.right}
                    </div>
                </div>
            </div>
            {showType == 'list' &&// display: showType == 'list' ? 'block' : 'none' 
                <div
                    onScroll={handleScroll}
                    style={{ overflowY: 'auto', }}
                    className={classNames(`${prefixCls}-dashboard-list`, hashId)}
                >
                    <div className={classNames(`${prefixCls}-dashboard-list-document`, hashId)}>
                        {imageFiles.map((item, index) => (
                            <PicCard
                                key={index}
                                id={item.id}
                                name={item.name}
                                fullUrl={item.fullUrl}
                                pixel={item.pixel}
                                isRef={item.isRef}
                                checked={isChecked(item.id)}
                                onChange={(value: boolean, prevValue: boolean) => {
                                    console.log('PicCard onChange', value, prevValue);
                                    checkChange(item.id, value);
                                }}
                            />
                        ))}
                        {Array.from({ length: 10 }).map((item, index) => (
                            <i key={index} className={classNames(`${prefixCls}-picCard`, `${prefixCls}-picCard-empty`, hashId)} />
                        ))}
                    </div>
                </div>
            }
            {showType == 'table' &&
                <div // style={{ display: showType == 'table' ? 'block' : 'none' }}
                    className={classNames(`${prefixCls}-dashboard-table`, hashId)}>
                    <Table
                        tableLayout='auto'
                        size="middle"
                        scroll={{ y: 'calc(-180px + 100vh)' }}
                        pagination={false}
                        onScroll={handleScroll}
                        columns={[
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
                        ]}
                        rowKey={'id'}
                        dataSource={imageFiles}
                    />
                </div>
            }
        </div>
    )
};
export type { PicDashboardProps, ImageFile };
export default PicDashboard;

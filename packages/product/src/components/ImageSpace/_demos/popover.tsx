import { Key, useEffect, useMemo, useRef, useState } from 'react';
import { Button, Input, Select, Space, Typography } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { ImageSpace, ImageFile, FolderTreeType, ImageSpaceRef, BaseRequestParam } from '@web-react/biz-components';

import dataJson from './_data.json';
export default () => {
    const _ref = useRef<ImageSpaceRef>(null);
    const [selectKeys, setSelectKeys] = useState<Key[]>([]);
    const [selectFiles, setSelectFiles] = useState<ImageFile[]>([]);
    const [searchParam, setSearchParam] = useState({ type: 'picture', value: '', order: 'timeDes', });

    useEffect(() => {
        handleRefresh();
    }, [searchParam.order]);

    const handleRefresh = () => {
        _ref?.current?.onRefresh();
    }

    const selectCount = useMemo(() => {
        return selectKeys?.length || 0;
    }, [selectKeys]);

    return (
        <>
            <ImageSpace.Popover
                ref={_ref}
                actions={{
                    left: <Space>
                        <Space.Compact>
                            <Select
                                style={{ width: '100px' }}
                                popupMatchSelectWidth={false}
                                value={searchParam.type}
                                options={[
                                    { label: '图片', value: 'picture' },
                                    { label: '宝贝名称', value: 'name' },
                                    { label: '宝贝ID', value: 'id' },
                                ]}
                                onChange={(value) => {
                                    setSearchParam(data => ({ ...data, type: value }));
                                }}
                            />
                            <Input
                                allowClear
                                style={{ width: '180px' }}
                                suffix={<SearchOutlined />}
                                placeholder={'搜索'}
                                value={searchParam.value}
                                onChange={(e) => {
                                    setSearchParam(data => ({ ...data, value: e.target.value, }));
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        handleRefresh();
                                    }
                                }}
                            />
                        </Space.Compact>
                        <Select
                            options={[
                                { label: '文件名升序', value: 'nameAsc' },
                                { label: '文件名降序', value: 'nameDes' },
                                { label: '上传时间升序', value: 'timeAsc' },
                                { label: '上传时间降序', value: 'timeDes' },
                            ]}
                            value={searchParam.order}
                            onChange={(value) => {
                                setSearchParam(data => ({ ...data, order: value, }));
                            }}
                            style={{ width: '147px', }}
                        />
                    </Space>
                }}
                footer={{
                    left: (
                        <Typography.Link target="_blank">
                            进入图片空间
                        </Typography.Link>
                    ),
                    right: (
                        <Button
                            type="primary"
                            disabled={selectCount == 0}
                            onClick={() => {
                                setSelectKeys([]);
                                setSelectFiles([]);
                            }}
                        >
                            确定{selectCount > 0 && `（${selectCount}）`}
                        </Button>
                    )
                }}
                defaultFolder={{ value: '0', label: '全部图片', }}
                fetchFolders={() => {
                    return new Promise<FolderTreeType[]>((resolve, reject) => {
                        setTimeout(() => {
                            resolve(dataJson.dirs);
                        }, 1000);
                    })
                }}
                fetchData={(param) => {
                    const queryParam = { ...param, ...searchParam }
                    const { page, size } = queryParam;
                    return new Promise<{ items: ImageFile[], total: number, }>((resolve, reject) => {
                        setTimeout(() => {
                            const newData: ImageFile[] = dataJson.files
                                .slice((page - 1) * size, page * size)
                                .map((file) => ({ ...file, id: file.id + '_' + page, }));
                            resolve({ items: newData, total: dataJson.files.length, });
                        }, 1000);
                    })
                }}
                value={selectKeys}
                onChange={(data, files) => {
                    setSelectKeys(data);
                    setSelectFiles(files);
                }}
            >
                <Button type="primary">Click me</Button>
            </ImageSpace.Popover>
        </>
    );
};
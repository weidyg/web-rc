import React, { forwardRef, Ref, useEffect, useState } from "react";
import { Cascader, message, Select, Spin, Tree } from "antd";
import { classNames, useMergedState } from "@web-react/biz-utils";
import { useStyle } from './style';

type FlatDataType = {
    value: string;
    label: string;
    [key: string]: any;
};
function flatTreeHelper(list?: DirType[], pValues?: string[]): FlatDataType[] {
    if (!list || list.length === 0) { return []; }
    return list.flatMap(item => {
        const { children, ...rest } = item;
        const data: FlatDataType = { pValues, ...rest };
        return [data, ...flatTreeHelper(children, [...pValues || [], item.value])];
    });
}

type DirType = {
    value: string;
    label: string;
    children?: DirType[],
};

type FolderProps = {
    value?: string,
    defaultValue?: string,
    onChange?: (value: string) => void,
    data?: DirType[] | (() => Promise<DirType[]>),
    type?: 'defalut' | 'select';
}

interface FolderRef { }
const InternalFolder = forwardRef<FolderRef, FolderProps>((
    props: FolderProps,
    ref: Ref<FolderRef>
) => {
    const { data = [], type = 'defalut' } = props;
    const { prefixCls, wrapSSR, hashId, token } = useStyle();

    const [value, setValue] = useMergedState<string>('', {
        defaultValue: props?.defaultValue,
        value: props?.value,
        onChange: props?.onChange,
    });

    const [loading, setLoading] = useState(false);
    const [treeData, setTreeData] = useState<DirType[]>([]);
    const [flatData, setFlatData] = useState<FlatDataType[]>([]);
    const [selectKeys, setSelectKeys] = useState<string[]>([]);

    useEffect(() => {
        loadDirs();
    }, []);

    useEffect(() => {
        const opt = flatData.find(m => m.value === value);
        setSelectKeys([...opt?.pValues || [], value]);
    }, [value]);

    const loadDirs = async () => {
        setLoading(true);
        try {
            const fetchData = typeof data === 'function'
                ? (await data()) : data;
            setTreeData(fetchData);
            setFlatData(flatTreeHelper(fetchData));
        } catch (error: any) {
            message.error(error?.message || '加载失败');
        } finally {
            setLoading(false);
        }
    };

    return wrapSSR(<>
        {type == 'select' ? (
            <Cascader
                loading={loading}
                allowClear={false}
                style={{ width: '150px' }}
                changeOnSelect
                options={treeData}
                value={selectKeys}
                onChange={(value: string[]) => {
                    setValue(value?.pop() || '');
                }}
            />
        ) : (
            <Spin spinning={loading}
                wrapperClassName={classNames(`${prefixCls}-spin`, hashId)}>
                <div className={classNames(`${prefixCls}`, hashId)}>
                    <Select
                        showSearch
                        options={flatData}
                        value={value}
                        onChange={(val) => {
                            setValue(val);
                        }}
                        filterOption={(input, option) => {
                            const _label = option?.label?.toLowerCase() ?? '';
                            const _input = input?.toLowerCase() ?? '';
                            return _label.includes(_input)
                        }}
                        className={classNames(`${prefixCls}-select`, hashId)}
                    />
                    <Tree
                        blockNode
                        showIcon={true}
                        treeData={treeData as any}
                        expandedKeys={selectKeys}
                        onExpand={(keys) => {
                            setSelectKeys(keys as string[]);
                        }}
                        selectedKeys={[value]}
                        onSelect={(value) => {
                            setValue(value[0] as string)
                        }}
                        fieldNames={{
                            key: 'value',
                            title: 'label',
                            children: 'children'
                        }}
                        rootClassName={classNames(`${prefixCls}-tree`, hashId)}
                    />
                </div>
            </Spin>
        )}
    </>)
})

type CompoundedComponent = typeof InternalFolder & {

};
const Folder = InternalFolder as CompoundedComponent;
export { DirType, FolderProps }
export default Folder;
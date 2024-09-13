import React, { Key, ReactNode, useEffect, useState } from "react";
import { Select, Tree } from "antd";
import { useMergedState } from "@web-react/biz-utils";
function flatTreeHelper(list?: FolderTreeType[], pValues?: Key[]): FlatDataType[] {
    if (!list || list.length === 0) { return []; }
    return list.flatMap(item => {
        const { children, ...rest } = item;
        const data: FlatDataType = { ...rest, pValues };
        return [data, ...flatTreeHelper(children, [...pValues || [], item.value])];
    });
}
function geTreeData(list: FolderTreeType[]): TreeDataType[] {
    return list.map((item) => {
        const { value, label, children = [] } = item;
        return { key: value, title: label, children: geTreeData(children) };
    });
}

type FlatDataType = {
    value: Key;
    label: string;
    [key: string]: any;
};
type TreeDataType = {
    key: Key;
    title: ReactNode;
    children?: TreeDataType[],
};

export type FolderTreeType = {
    value: Key;
    label: string;
    children?: FolderTreeType[],
};
export type FolderTreeProps = {
    data?: FolderTreeType[];
    defaultValue?: Key;
    value?: Key;
    onChange?: (value: Key) => void;
}

const FolderTree = (props: FolderTreeProps) => {
    const { data = [] } = props;
    const [value, setValue] = useMergedState<Key>('', {
        defaultValue: props?.defaultValue,
        value: props?.value,
        onChange: props?.onChange,
    });

    const [options, setOptions] = useState<FlatDataType[]>([]);
    const [treeData, setTreeData] = useState<TreeDataType[]>([]);
    const [expandedKeys, setExpandedKeys] = useState<Key[]>([]);

    useEffect(() => {
        setOptions(flatTreeHelper(data));
        setTreeData(geTreeData(data));
    }, [data]);

    useEffect(() => {
        const opt = options.find(m => m.value === value);
        setExpandedKeys([...opt?.pValues || [], value]);
    }, [value]);

    return <>
        <Select
            showSearch
            options={options}
            value={value}
            onChange={(val) => {
                setValue(val);
            }}
            filterOption={(input, option) => {
                const _label = option?.label?.toLowerCase() ?? '';
                const _input = input?.toLowerCase() ?? '';
                return _label.includes(_input)
            }}
            style={{
                width: '100%',
                marginBottom: '4px'
            }}
        />
        <Tree
            rootStyle={{
                height: 'calc(100% - 40px)',
            }}
            blockNode
            showIcon={true}
            treeData={treeData}
            expandedKeys={expandedKeys}
            onExpand={(keys) => {
                setExpandedKeys(keys as Key[]);
            }}
            selectedKeys={[value]}
            onSelect={(value) => {
                setValue(value[0] as Key);
            }}
        />
    </>
}
export default FolderTree;
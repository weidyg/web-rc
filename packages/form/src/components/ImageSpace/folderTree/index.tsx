import { useMergedState } from "@web-react/biz-utils";
import { Select, Tree } from "antd";
import React, { Key, ReactNode, useEffect, useMemo, useState } from "react";

type FlatDataType = {
    value: Key;
    label: ReactNode;
    [key: string]: any;
};
type TreeDataType = {
    key: Key;
    title: ReactNode;
    children?: TreeDataType[],
};
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


export type FolderTreeType = {
    value: Key;
    label: ReactNode;
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
            style={{
                width: '100%',
                marginBottom: '4px'
            }}
            showSearch
            options={options}
            value={value}
            onChange={(val) => {
                setValue(val);
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
                setExpandedKeys(keys);
            }}
            selectedKeys={[value]}
            onSelect={(value) => {
                setValue(value[0] as Key);
            }}
        />
    </>
}
export default FolderTree;
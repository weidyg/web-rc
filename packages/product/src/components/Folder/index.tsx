import React, { forwardRef, Ref, useEffect, useMemo, useState } from 'react';
import { Cascader, Empty, message, Select, Spin, Tree } from 'antd';
import { classNames, useMergedState } from '@web-rc/biz-utils';
import { useStyles } from './style';

type FlatDataType = {
  value: string;
  label: string;
  [key: string]: any;
};
function flatTreeHelper(list?: DirType[], pValues?: string[]): FlatDataType[] {
  if (!list || list.length === 0) {
    return [];
  }
  return list.flatMap((item) => {
    const { children, ...rest } = item;
    const data: FlatDataType = { pValues, ...rest };
    return [data, ...flatTreeHelper(children, [...(pValues || []), item.value])];
  });
}

type DirType = {
  value: string;
  label: string;
  children?: DirType[];
};

type FolderProps = {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  loading?: boolean;
  data?: DirType[] | (() => Promise<DirType[]>) | (() => DirType[]);
  type?: 'defalut' | 'select';
};

interface FolderRef {}
const InternalFolder = forwardRef((props: FolderProps, ref: Ref<FolderRef>) => {
  const { data = [], type = 'defalut', loading: propLoading = false } = props;
  const { prefixCls, wrapSSR, hashId } = useStyles();

  const [value, setValue] = useMergedState<string>('', {
    defaultValue: props?.defaultValue,
    value: props?.value,
    onChange: props?.onChange,
  });

  const [loading, setLoading] = useState(false);
  const [treeData, setTreeData] = useState<DirType[]>([]);
  const [flatData, setFlatData] = useState<FlatDataType[]>([]);
  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);

  useEffect(() => {
    loadDirs();
  }, [data]);

  useEffect(() => {
    const pValues = flatData.find((m) => m.value == value)?.pValues || [];
    setExpandedKeys([...expandedKeys, ...pValues]);
  }, [value]);

  const loadDirs = async () => {
    setLoading(true);
    try {
      const fetchData = typeof data === 'function' ? await data() : data;
      setTreeData(fetchData);
      setFlatData(flatTreeHelper(fetchData));
    } catch (error: any) {
      message.error(error?.message || '加载失败');
    } finally {
      setLoading(false);
    }
  };

  const _loading = loading || propLoading;
  return wrapSSR(
    <>
      {type == 'select' ? (
        <Cascader
          loading={_loading}
          allowClear={false}
          style={{ minWidth: '148px' }}
          changeOnSelect
          options={treeData}
          value={[...expandedKeys, value]}
          onChange={(value: string[]) => {
            setValue(value?.pop() || '');
          }}
        />
      ) : (
        <Spin spinning={_loading} wrapperClassName={classNames(`${prefixCls}-spin`, hashId)}>
          <div className={classNames(`${prefixCls}`, hashId)}>
            <Select
              showSearch
              options={flatData}
              placeholder="请选择文件夹"
              value={_loading ? undefined : value}
              onChange={(val) => {
                setValue(val);
              }}
              filterOption={(input, option) => {
                const _label = option?.label?.toLowerCase() ?? '';
                const _input = input?.toLowerCase() ?? '';
                return _label.includes(_input);
              }}
              className={classNames(`${prefixCls}-select`, hashId)}
            />
            {treeData.length > 0 ? (
              <div className={classNames(`${prefixCls}-empty`, hashId)}>
                <Empty />
              </div>
            ) : (
              <Tree
                blockNode
                showIcon={true}
                treeData={treeData as any}
                autoExpandParent={true}
                expandedKeys={[...expandedKeys, value]}
                onExpand={(keys) => {
                  const newValue = keys.filter((f) => f !== value);
                  setExpandedKeys(newValue as string[]);
                }}
                selectedKeys={[value]}
                onSelect={(value) => {
                  if (value?.length > 0) {
                    setValue(value[0] as string);
                  }
                }}
                fieldNames={{
                  key: 'value',
                  title: 'label',
                  children: 'children',
                }}
                rootClassName={classNames(`${prefixCls}-tree`, hashId)}
              />
            )}
          </div>
        </Spin>
      )}
    </>,
  );
});

type CompoundedComponent = typeof InternalFolder & {};
const Folder = InternalFolder as CompoundedComponent;
export { DirType, FolderProps };
export default Folder;

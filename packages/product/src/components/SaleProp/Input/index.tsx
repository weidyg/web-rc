import { useCallback, useContext, useMemo, useState } from 'react';
import { Button, Input, Popover, Space } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { classNames, useMergedState } from '@web-react/biz-utils';
import { ImageInput } from '@web-react/biz-components';
import useSalePropOptions from '../_hooks/useSalePropOptions';
import StandardIcon from './icons/StandardIcon';
import { useStyle } from './style';
import { SalePropInputProps, SalePropSelectDataType, SalePropValueType, ValueType } from '../typing';
import { SalePropInputGroupConnext } from '../SaleProp';
import SalePropCard from '../Card';

const SalePropInput = (props: SalePropInputProps) => {
  const { className, style, extFields = ['img', 'remark'], allowCustom, onRemove } = props;
  const { prefixCls, wrapSSR, hashId } = useStyle(props.prefixCls);

  const context = useContext(SalePropInputGroupConnext);
  const uniqueGroup = context?.uniqueGroup;
  const options = context?.options || props?.options || [];

  const { flatOptions } = useSalePropOptions(options);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useMergedState(undefined, {
    defaultValue: props?.defaultValue,
    value: props?.value,
    onChange: props?.onChange,
  });

  const [data, setData] = useMergedState({}, {
    value: context?.data,
    onChange: context?.onSelectChange
  });

  const single = !!value?.value || !context;
  const current = { ...value, group: data?.group } as ValueType;
  const values = useMemo(() => {
    const _all = data?.value?.filter(f => f?.value)
      ?.map(({ text, value }) => ({ text, value, group: data?.group })) || [];
    return _all as ValueType[];
  }, [data]);

  function handleChange(value?: SalePropValueType): void {
    setValue(value);
  }
  function handleDataChange(value: SalePropSelectDataType & {
    adds?: SalePropValueType[]
  }): void {
    setData(value);
  }

  const content = <SalePropCard
    uniqueGroup={uniqueGroup}
    options={options}
    single={single}
    current={current}
    value={values}
    onOk={async ({ all, current, adds }) => {
      const { group, ...restCurrent } = current || {};
      if (restCurrent) {
        handleChange({ ...value, ...restCurrent, });
      }
      handleDataChange({
        group: group,
        value: all.map(({ text, value }) => ({ text, value })),
        adds: adds?.map(({ text, value }) => ({ text, value })),
      });
      setOpen(false);
    }}
    onCancel={() => {
      setOpen(false);
    }}
    style={{ maxWidth: 580 }}
  />;

  const hasOptions = options?.length > 1;
  const placeholder = {
    text: allowCustom ? `请${hasOptions ? '选择/' : ''}输入` : "请选择",
    remark: "备注"
  }

  const isStandard = flatOptions.some(f =>
    f.group?.value === data?.group?.value
    && f.value === value?.value
  );

  const getStandardOption = useCallback((text: string) => {
    return flatOptions.find(f =>
      f.group?.value === data?.group?.value &&
      f.label === text);
  }, [flatOptions]);

  const children = <Input allowClear
    placeholder={value?.text || placeholder.text}
    value={open ? undefined : value?.text}
    onFocus={(e) => {
      if (!allowCustom) {
        e.target.blur();
      }
    }}
    onChange={(e) => {
      let newVal;
      const text = e.target.value;
      const { img, remark } = value || {};
      if (text) {
        const id = getStandardOption(text)?.value || text;
        newVal = { img, remark, text, value: id };
        if (allowCustom && open) { setOpen(false); }
      } else {
        newVal = (img || remark) ? { img, remark } : undefined;
        const newVals = data?.value?.filter(f => f.value != value?.value);
        handleDataChange({ ...data, value: newVals, adds: undefined });
      }
      handleChange(newVal);
    }}
    style={{ width: '180px' }}
    suffix={isStandard ? <StandardIcon /> : ''}
  />;

  return wrapSSR(<>
    <Space style={style}
      className={classNames(`${prefixCls}`, className, hashId)}
    >
      {extFields.includes('img') &&
        <ImageInput
          value={value?.img}
          onChange={(img) => {
            handleChange({ ...value, img });
          }}
        />
      }
      <Space.Compact>
        {hasOptions
          ? (<Popover
            trigger={'click'}
            placement={'bottom'}
            content={content}
            open={open}
            onOpenChange={(open) => {
              if (allowCustom && value?.text && open) {
                return;
              }
              setOpen(open);
            }}
          >
            {children}
          </Popover>)
          : children
        }
        {extFields.includes('remark') && <Input allowClear
          placeholder={placeholder.remark}
          value={value?.remark}
          onChange={(e) => {
            const remark = e.target.value;
            handleChange({ ...value, remark });
          }}
          style={{ width: '98px' }}
        />}

      </Space.Compact>
      {onRemove &&
        <Button danger type='text' icon={<DeleteOutlined />} onClick={onRemove}
          className={classNames(`${prefixCls}-del`, hashId)}
        />
      }
    </Space>
  </>);
};
export default SalePropInput;
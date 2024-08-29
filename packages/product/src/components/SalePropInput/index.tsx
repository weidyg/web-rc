import { useState } from 'react';
import { Input, MenuProps, Popover, Space } from 'antd';
import { classNames, useMergedState } from '@web-react/biz-utils';
import { BaseOptionType, BaseValueType, GroupOptionType, ImageInput, SalePropCard, SalePropCardProps } from '@web-react/biz-components';
import { useStyle } from './style';

const StandardIcon: React.FC = () => {
  return <img style={{ width: '14px', }}
    src="data:image/png;base64,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"
  />
}

type SalePropValueType = {
  value?: string,
  text?: string,
  img?: string,
  remark?: string
};
type SalePropInputProps = Pick<SalePropCardProps, 'options' | 'uniqueGroup'> & {
  /** 类名 */
  className?: string;
  /** 样式 */
  style?: React.CSSProperties;
  /** 自定义样式前缀 */
  prefixCls?: string;

  defaultValue?: SalePropValueType;
  value?: SalePropValueType;
  onChange?: (value: SalePropValueType) => void;
};

const SalePropInput = (
  props: SalePropInputProps
) => {
  const { className, style, uniqueGroup, options = [] } = props;
  const { prefixCls, wrapSSR, hashId, token } = useStyle(props.prefixCls);
  const [open, setOpen] = useState(false);
  const [isStandard, setIsStandard] = useState(true);
  const [value, setValue] = useMergedState({}, {
    defaultValue: props?.defaultValue,
    value: props?.value,
    onChange: props?.onChange
  });

  const items: MenuProps['items'] = [
    {
      key: '1', label: '替换', onClick: () => {

      }
    },
    {
      key: '2', label: '删除', onClick: () => {
        setValue({ ...value, img: undefined });
      }
    },
    {
      key: '3', label: '裁剪', onClick: () => {

      }
    },
  ];

  const getValues = (
    value: BaseValueType,
    options: SalePropCardProps['options'],
  ): [string[], BaseOptionType[]] => {
    let values: string[] = [];
    let objs: BaseOptionType[] = [];
    if (Array.isArray(value)) {
      values = [...value];
      objs = options?.filter(f => values.includes(f.value)) || [];
      console.log('Array objs', values, objs);
    } else if (typeof value == 'object') {
      const keys = Object.keys(value);
      if (keys.length) {
        for (let i = 0; i < keys.length; i++) {
          const currKey = keys[i];
          const currValue = value[currKey];
          values = [...values, ...currValue];
          const currOptions = (options as GroupOptionType[])?.find(f => f.value == currKey)?.children || [];
          objs = [...objs, ...currOptions?.filter(f => currValue.includes(f.value)) || []];
        }
      }
      console.log('object objs', keys, values, objs);
    }
    return [values, objs];
  }

  const [values, setValues] = useState<any>();
  const content = <SalePropCard
    current={{ label: value?.text, value: value?.value }}
    uniqueGroup={uniqueGroup}
    options={options}
    value={values}
    onOk={(vals) => {
      const [values, objs] = getValues(vals, options);
      if (objs?.length) {
        const obj = objs.find(f => f.label == value?.text) || objs[0];
        setValue({ ...value, text: obj.label, value: obj.value });
        console.log('obj', obj);
      }
      setValues(vals);
      setOpen(false);
    }}
    onCancel={() => {
      setOpen(false);
    }}
    style={{ maxWidth: 580 }}
  />;

  const children = <Input allowClear
    placeholder={open ? value?.text : '请输入'}
    value={open ? undefined : value?.text}
    onChange={(e) => {
      const id = e.target.value;
      const text = e.target.value;
      setValue({ ...value, text, value: id });
    }}
    style={{ width: '180px' }}
    suffix={isStandard ? <StandardIcon /> : ''}
  />;
  return wrapSSR(
    <Space style={style}
      className={classNames(`${prefixCls}`, className, hashId)}
    >
      <ImageInput
        value={value?.img}
        onChange={(img) => {
          setValue({ ...value, img });
        }}
      />
      <Space.Compact>
        {(options?.length > 1) ?
          <Popover
            trigger={'click'}
            content={content}
            open={open}
            onOpenChange={setOpen}
          >
            {children}
          </Popover>
          : children
        }
        <Input allowClear
          value={value?.remark}
          onChange={(e) => {
            const remark = e.target.value;
            setValue({ ...value, remark });
          }}
          style={{ width: '98px' }}
        />
      </Space.Compact>
    </Space>
  );
};

export type { SalePropInputProps };
export default SalePropInput;

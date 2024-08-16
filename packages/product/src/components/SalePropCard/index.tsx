import { useEffect, useMemo, useState } from 'react';
import { Alert, Button, Card, Checkbox, Flex, Input, Menu, Modal, Select, Space, Switch, Tree, Typography } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { classNames, useMergedState } from '@web-react/biz-utils';
import { useStyle } from './style';


const getValues = (
  value?: string[] | GroupValueType,
  isGroup?: boolean,
  groupValue?: string
): string[] => {
  let values: string[] = [];
  if (isGroup && groupValue && typeof value == 'object') {
    values = (value as GroupValueType)?.[groupValue] || [];
  } else if (Array.isArray(value)) {
    values = value;
  }
  return values;
}
const getChildren = (item: any): BaseOptionType[] => {
  return item?.children || []
}


export type GroupValueType = { [key: string]: string[] };
export type BaseOptionType = { label: string; value: string; }
export type GroupOptionType = BaseOptionType & { children: BaseOptionType[] }
export type SalePropCardProps<ValueType extends string[] | GroupValueType = any> = {
  /** 类名 */
  className?: string;
  /** 样式 */
  style?: React.CSSProperties;
  /** 自定义样式前缀 */
  prefixCls?: string;
  uniqueGroup?: boolean;
  options: BaseOptionType[] | GroupOptionType[];
  current?: string;
  value?: ValueType;
  onOk?: (value?: ValueType) => Promise<void> | void,
  onCancel?: () => void,
};

const SalePropCard = <
  ValueType extends (string[] | GroupValueType) = any
>(
  props: SalePropCardProps<ValueType>
) => {
  const { style, className, options, uniqueGroup,
    current, value: propValue, onOk, onCancel
  } = props;
  const { prefixCls, wrapSSR, hashId, token } = useStyle(props.prefixCls);

  const [loading, setLoading] = useState(false);
  const [showChecked, setShowChecked] = useState(false);
  const [showKeyword, setShowKeyword] = useState<string>();
  const [initGroupValue, setInitGroupValue] = useState<string>();
  const [groupValue, setGroupValue] = useState<string>();
  const [value, setValue] = useState(propValue);

  const isGroup = useMemo(() => {
    return options?.some((item) => getChildren(item)?.length > 0);
  }, [options])

  const [itemOpts, itemValues] = useMemo(() => {
    const itemOpts: BaseOptionType[] = isGroup
      ? getChildren(options.find((f) => f.value === groupValue))
      : options;
    const itemValues: string[] = isGroup
      ? typeof value == 'object' && groupValue ? (value as any)?.[groupValue] : []
      : Array.isArray(value) ? value : [];
    return [itemOpts, itemValues];
  }, [isGroup, groupValue, value]);

  const selectedNum = useMemo(() => {
    if (Array.isArray(value)) {
      return value.length;
    } else if (typeof value == 'object') {
      return uniqueGroup
        ? (groupValue && value[groupValue]?.length) || 0
        : Object.values(value).reduce((pre, cur) => pre + (cur as any).length, 0);
    }
    return 0;
  }, [value, groupValue, uniqueGroup]);

  useEffect(() => {
    let _groupValue: string | undefined = undefined;
    if (isGroup && typeof value == 'object') {
      const keys = Object.keys(value);
      if (keys.length > 0) {
        _groupValue = keys[0];
      }
    }
    if (isGroup) {
      setInitGroupValue(_groupValue);
      setGroupValue(_groupValue || options[0].value);
    }
  }, [isGroup])

  function handleOk() {
    setLoading(true);
    setTimeout(async () => {
      let _value: ValueType;
      if (uniqueGroup && isGroup && groupValue) {
        let values = getValues(value, isGroup, groupValue);
        _value = { [groupValue]: values } as ValueType;
      } else {
        _value = value as ValueType;
      }
      if (uniqueGroup && groupValue != initGroupValue && initGroupValue) {
        const oldGroup = options?.find(f => f.value == initGroupValue)?.label || initGroupValue;
        const newGroup = options?.find(f => f.value == groupValue)?.label || groupValue;
        Modal.confirm({
          title: '操作确认',
          content: `“${oldGroup}”将更换成“${newGroup}”，${oldGroup}及sku数据将被清空，确认更换？`,
          onOk: async () => {
            await onOk?.(_value);
            setValue(_value);
            setLoading(false);
          },
          onCancel: () => {
            setLoading(false);
          }
        });
      } else {
        await onOk?.(_value);
        setValue(_value);
        setLoading(false);
      }
    }, 10);
  }
  function handleCancel(): void {
    onCancel?.();
  }
  function handleGroupChange(key: string): void {
    setGroupValue(key);
  }
  function handleValueChange(checkedValues: string[]): void {
    const newValue = isGroup
      ? {
        ...value,
        [groupValue!]: checkedValues
      }
      : checkedValues;
    setValue(newValue as ValueType);
  }
  function vaildDisabled(val: any) {
    let values = getValues(propValue, isGroup, groupValue);
    return val != current && values?.includes(val);
  }
  function vaildChecked(val: string) {
    let values = getValues(value, isGroup, groupValue);
    return values?.includes(val);
  }

  return wrapSSR(
    <Card className={classNames(prefixCls, className, hashId)}
      classNames={{
        header: classNames(`${prefixCls}-header`, hashId),
        body: classNames(`${prefixCls}-body`, hashId)
      }}
      style={{ ...style }}
      title={<Flex justify='space-between'>
        <Space>
          <span className={classNames(`${prefixCls}-header-selected`, hashId)}>
            已选 {selectedNum} 个
          </span>
          <Button type='primary' shape='round' size='small'
            loading={loading}
            onClick={handleOk}
          >
            确 认
          </Button>
          <Button shape='round' size='small'
            onClick={handleCancel}
          >
            取 消
          </Button>
          <Input allowClear
            placeholder='请输入搜索'
            style={{ width: '160px' }}
            suffix={<SearchOutlined />}
            value={showKeyword}
            onChange={(event) => {
              setShowKeyword(event?.target?.value);
            }}
          />
        </Space>
        <Space>
          <Switch
            checkedChildren='已选'
            unCheckedChildren='全部'
            checked={showChecked}
            onChange={(c) => { setShowChecked(c); }}
          />
        </Space>
      </Flex>}
    >
      <Flex style={{ marginTop: 1, height: 'calc(100% - 2px)' }}>
        {isGroup && (
          <div className={classNames(`${prefixCls}-group-wrapper`, hashId)}>
            <Menu className={classNames(`${prefixCls}-group-menu`, hashId)}
              selectedKeys={[groupValue || '']}
              onClick={(info) => handleGroupChange(info.key)}
              items={options?.map((item, _i) => ({
                key: item.value, label: item.label,
                className: classNames(`${prefixCls}-group-item`, hashId),
              }))}
            />
          </div>
        )}
        <div style={{ overflow: 'auto' }}>
          {isGroup && uniqueGroup && (
            <Alert banner type='info' message='切换分组会清空您已勾选尺码与SKU数据，请谨慎操作' />
          )}
          <div className={classNames(`${prefixCls}-checkbox-wrapper`, hashId)}>
            <Checkbox.Group
              value={itemValues}
              onChange={handleValueChange}>
              <Flex wrap gap="small" justify="space-around">
                {itemOpts?.map((item, i) => {
                  const { value: val, label: text = '' } = item;
                  const disabled = vaildDisabled(val);
                  const checked = vaildChecked(val);
                  const sk = !showKeyword || text.indexOf(showKeyword) != -1;
                  const sc = (showChecked && checked) || !showChecked;
                  return (
                    <Checkbox key={i}
                      value={val}
                      disabled={disabled}
                      className={classNames(`${prefixCls}-checkbox`, hashId, {
                        [`${prefixCls}-checkbox-hidden`]: !(sk && sc),
                        [`${prefixCls}-checkbox-action`]: !disabled && checked
                      })
                      }
                    >
                      <Typography.Text
                        className={classNames(`${prefixCls}-checkbox-text`, hashId)}
                        ellipsis={{ tooltip: text }}>
                        {text}
                      </Typography.Text>
                    </Checkbox>
                  );
                })}
                {Array.from({ length: 20 }, (_, i) => (
                  <div key={i} style={{ width: 100, height: 0 }} />
                ))}
              </Flex>
            </Checkbox.Group>
          </div>
        </div>
      </Flex>
    </Card>
  );
};

export default SalePropCard;

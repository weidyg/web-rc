import { useEffect, useMemo, useState } from 'react';
import { Alert, Button, Card, Checkbox, Flex, Input, Menu, Modal, Radio, Space, Switch, Typography } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { classNames, useMergedState } from '@web-react/biz-utils';
import { useStyle } from './style';
import useOptions from './hooks/useOptions';

const getValuesByGroup = (value?: BaseValueType, isGroup?: boolean, groupValue?: string): string[] => {
  const itemValues: string[] = isGroup
    ? typeof value == 'object' && groupValue ? ((value as any)?.[groupValue] || []) : []
    : Array.isArray(value) ? value : [];
  return itemValues;
}

export type OptionItemType = { label: string; value: string; }
export type OptionGroupType = OptionItemType & { children: OptionItemType[] }
export type BaseOptionsType = OptionGroupType[] | OptionItemType[];
export type BaseValueType = string[] | { [key: string]: string[] };
export type SalePropCardProps<ValueType extends BaseValueType = BaseValueType> = {
  /** 类名 */
  className?: string;
  /** 样式 */
  style?: React.CSSProperties;
  /** 自定义样式前缀 */
  prefixCls?: string;
  uniqueGroup?: boolean;
  options?: BaseOptionsType;
  current?: string;
  value?: ValueType;
  // dataSource?: BaseOptionsType;
  // currentValue?: { text: "165/80A", value: 7190522 },
  // value1?: {
  //   "group": {
  //     "text": "中国号型A",
  //     "value": "136553091-men_tops"
  //   },
  //   "value": [
  //     {
  //       "value": 7190522,
  //       "text": "165/80A"
  //     },
  //     {
  //       "text": "S",
  //       "value": -20010815
  //     }
  //   ]
  // },
  // value2?: [
  //   {
  //     "text": "乳白色",
  //     "value": 28321
  //   },
  //   {
  //     "text": "乳色",
  //     "value": -24820406
  //   },
  //   {
  //     "text": "米白色",
  //     "value": 4266701
  //   }
  // ]
  onOk?: (value?: ValueType) => Promise<void> | void,
  onCancel?: () => void,
};

const SalePropCard = <
  ValueType extends BaseValueType = BaseValueType
>(
  props: SalePropCardProps<ValueType>
) => {
  const { style, className, options = [], uniqueGroup,
    current, value: propValue, onOk, onCancel
  } = props;
  const { prefixCls, wrapSSR, hashId, token } = useStyle(props.prefixCls);
  const [loading, setLoading] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState<string>();
  const [onlyShowChecked, setOnlyShowChecked] = useState(false);

  const [initGroupValue, setInitGroupValue] = useState<string>();
  const [value, setValue] = useMergedState(propValue);


  const [currentGroupValue, setCurrentGroupValue] = useState<string>();
  const [isGroup, flattenOptions, getItemOptions] = useOptions(options);

  const itemOpts = useMemo(() => {
    return getItemOptions(currentGroupValue);
  }, [currentGroupValue]);

  const itemValues = useMemo(() => {
    return getValuesByGroup(value, isGroup, currentGroupValue);
  }, [currentGroupValue]);

  const selectedNum = useMemo(() => {
    if (Array.isArray(value)) {
      return value.length;
    } else if (typeof value == 'object') {
      return uniqueGroup
        ? (currentGroupValue && value[currentGroupValue]?.length) || 0
        : Object.values(value).reduce((pre, cur) => pre + cur.length, 0);
    }
    return 0;
  }, [value, currentGroupValue, uniqueGroup]);

  const initialValuesWithGroup = useMemo(() => {
    return getValuesByGroup(propValue, isGroup, currentGroupValue);
  }, [propValue, isGroup, currentGroupValue]);


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
      setCurrentGroupValue(_groupValue || options[0].value);
    }
  }, [isGroup])

  async function changeValue(value: ValueType) {
    if (onOk) {
      await onOk?.(value);
    } else {
      setValue(value);
    }
  }

  function handleOk() {
    setLoading(true);
    setTimeout(async () => {
      let _value: ValueType;
      if (uniqueGroup && isGroup && currentGroupValue) {
        _value = { [currentGroupValue]: itemValues } as ValueType;
      } else {
        _value = value as ValueType;
      }
      if (uniqueGroup && currentGroupValue != initGroupValue && initGroupValue) {
        const oldGroup = options?.find(f => f.value == initGroupValue)?.label || initGroupValue;
        const newGroup = options?.find(f => f.value == currentGroupValue)?.label || currentGroupValue;
        Modal.confirm({
          title: '操作确认',
          content: `“${oldGroup}”将更换成“${newGroup}”，${oldGroup}及sku数据将被清空，确认更换？`,
          onOk: async () => {
            changeValue(_value);
            setLoading(false);
          },
          onCancel: () => {
            setLoading(false);
          }
        });
      } else {
        await changeValue(_value);
        setLoading(false);
      }
    }, 10);
  }
  function handleCancel(): void {
    onCancel?.();
  }
  function handleGroupChange(key: string): void {
    setCurrentGroupValue(key);
  }

  function handleValueChange(checkedValues: string[]): void {
    const newValue = isGroup
      ? { ...value, [currentGroupValue!]: checkedValues }
      : checkedValues;
    setValue(newValue as ValueType);
  }

  function vaildDisabled(opt: OptionItemType) {
    if (opt?.value == current || opt?.label == current) { return false; }
    return initialValuesWithGroup?.includes(opt?.value);
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
            value={searchKeyword}
            onChange={(event) => {
              setSearchKeyword(event?.target?.value);
            }}
          />
        </Space>
        <Space>
          <Switch
            checkedChildren='已选'
            unCheckedChildren='全部'
            checked={onlyShowChecked}
            onChange={(checked) => {
              setOnlyShowChecked(checked);
            }}
          />
        </Space>
      </Flex>}
    >
      <Flex style={{ marginTop: 1, height: 'calc(100% - 2px)' }}>
        {isGroup && (
          <div className={classNames(`${prefixCls}-group-wrapper`, hashId)}>
            <Menu className={classNames(`${prefixCls}-group-menu`, hashId)}
              selectedKeys={[currentGroupValue || '']}
              onClick={({ key }) => { uniqueGroup ? handleGroupChange(key) : undefined; }}
              items={options?.map(({ value: key, label }, _i) => ({
                key, label, className: classNames(`${prefixCls}-group-item`, hashId),
                onMouseEnter: () => { !uniqueGroup ? handleGroupChange(key) : undefined; },
              }))}
            />
          </div>
        )}
        <div style={{ overflow: 'auto' }}>
          {isGroup && uniqueGroup && (
            <Alert banner type='info' message='切换分组会清空您已勾选尺码与SKU数据，请谨慎操作' />
          )}
          <div className={classNames(`${prefixCls}-item-wrapper`, hashId)}>
            <Flex wrap gap="small" justify="space-around">
              {itemOpts?.map((item, i) => {
                const { value: val, label: text = '' } = item;
                const disabled = vaildDisabled(item);
                const checked = itemValues?.includes(val);
                const hidden = searchKeyword && text.indexOf(searchKeyword) == -1;
                return (
                  <Radio key={i}
                    disabled={disabled}
                    checked={checked}
                    onChange={(e) => {
                      const _checked = e.target.checked;
                      if (_checked != checked) {
                        const newValues = _checked
                          ? [...itemValues.filter(f => initialValuesWithGroup.includes(f)), val]
                          : itemValues.filter(f => f != val);
                        handleValueChange(newValues);
                      }
                    }}
                    className={classNames(`${prefixCls}-item`, hashId, {
                      [`${prefixCls}-item-hidden`]: hidden || (!checked && onlyShowChecked),
                      [`${prefixCls}-item-action`]: checked && !disabled,
                    })}
                  >
                    <Typography.Text
                      className={classNames(`${prefixCls}-item-text`, hashId)}
                      ellipsis={{ tooltip: text }}>
                      {text}
                    </Typography.Text>
                  </Radio>
                );
              })}
              {Array.from({ length: 20 }, (_, i) => (
                <div key={i} className={classNames(`${prefixCls}-item-empty`, hashId)} />
              ))}
            </Flex>
          </div>
        </div>
      </Flex>
    </Card>
  );
};

export default SalePropCard;

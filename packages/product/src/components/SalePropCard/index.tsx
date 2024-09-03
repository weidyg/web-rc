import { useMemo, useState } from 'react';
import { Alert, Button, Card, Checkbox, Flex, Input, Menu, Modal, Radio, Space, Switch, Typography } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { classNames } from '@web-react/biz-utils';
import useSalePropOptions from './hooks/useSalePropOptions';
import useSalePropValue from './hooks/useSalePropValue';
import { useStyle } from './style';

export type SalePropValueType = { value: string; groupValue?: string; };
export type OptionItemType = { label: string; value: string; }
export type OptionGroupType = OptionItemType & { children: OptionItemType[] }
export type SalePropCardProps = {
  /** 类名 */
  className?: string;
  /** 样式 */
  style?: React.CSSProperties;
  /** 自定义样式前缀 */
  prefixCls?: string;
  uniqueGroup?: boolean;
  options?: OptionGroupType[] | OptionItemType[];
  current?: SalePropValueType;
  value?: SalePropValueType[];
  onOk?: (value?: SalePropValueType[], newValue?: SalePropValueType[]) => Promise<void> | void,
  onCancel?: () => void,
};

const SalePropCard = (props: SalePropCardProps) => {
  const { style, className, options = [], uniqueGroup,
    current, value: propValue, onOk, onCancel
  } = props;
  const { prefixCls, wrapSSR, hashId, token } = useStyle(props.prefixCls);
  const [loading, setLoading] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState<string>();
  const [onlyShowChecked, setOnlyShowChecked] = useState(false);

  const { isGroup, flattenOptions, getItemOptions } = useSalePropOptions(options);

  const { initGroupValue, initValues,
    currentGroupValue, currentValues,
    setCurrentGroupValue, setCurrentValues
  } = useSalePropValue(propValue, uniqueGroup, isGroup, flattenOptions);

  const itemOpts = useMemo(() => getItemOptions(currentGroupValue), [currentGroupValue]);

  async function changeValue() {
    const _value: SalePropValueType[] = uniqueGroup && currentGroupValue
      ? currentValues.filter(f => f.groupValue = currentGroupValue)
      : currentValues;
    const _newValue: SalePropValueType[] = _value.filter(f => !initValues.find(v => v.groupValue == f.groupValue && v.value == f.value)) || [];
    await onOk?.(_value, _newValue);
  }

  function handleGroupChange(groupValue: string): void {
    setCurrentGroupValue(groupValue);
  }
  function handleValueChange(checked: boolean, value: string): void {
    const newValues = checked
      ? [...(single ? [] : currentValues), { value, groupValue: currentGroupValue }]
      : [...(single ? [] : currentValues).filter(f => f.groupValue == currentGroupValue && f.value != value)];
    const newCurrentValues = [...disabledValues, ...newValues];
    setCurrentValues(newCurrentValues);
  }

  const disabledValues = useMemo(() => {
    if (!current) { return initValues; }
    return initValues.filter(f => !(
      f.groupValue == current?.groupValue
      && f.value == current?.value
    ));
  }, [initValues, current])

  function vaildDisabled(opt: OptionItemType) {
    for (const f of disabledValues) {
      if (f.groupValue == currentGroupValue && f.value == opt?.value) {
        return true;
      }
    }
    return false;
  }
  function vaildChecked(item: OptionItemType) {
    for (const f of currentValues) {
      if (f.groupValue == currentGroupValue && f.value == item?.value) {
        return true;
      }
    }
    return false;
  }


  const single = !!current?.value;
  const ItemComponent = single ? Radio : Checkbox;

  function handleOk() {
    setLoading(true);
    setTimeout(async () => {
      if (uniqueGroup && initGroupValue && currentGroupValue != initGroupValue) {
        const oldGroup = options?.find(f => f.value == initGroupValue)?.label || initGroupValue;
        const newGroup = options?.find(f => f.value == currentGroupValue)?.label || currentGroupValue;
        Modal.confirm({
          title: '操作确认',
          content: `“${oldGroup}”将更换成“${newGroup}”，${oldGroup}及sku数据将被清空，确认更换？`,
          onOk: async () => {
            await changeValue();
            setLoading(false);
          },
          onCancel: () => {
            setLoading(false);
          }
        });
      } else {
        await changeValue();
        setLoading(false);
      }
    }, 10);
  }
  function handleCancel(): void {
    onCancel?.();
  }
  return wrapSSR(<>
    <Card className={classNames(prefixCls, className, hashId)}
      classNames={{
        header: classNames(`${prefixCls}-header`, hashId),
        body: classNames(`${prefixCls}-body`, hashId)
      }}
      style={{ ...style }}
      title={<Flex justify='space-between'>
        <Space>
          <span className={classNames(`${prefixCls}-header-selected`, hashId)}>
            已选 {currentValues?.length || 0} 个
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
              onClick={({ key }) => {
                handleGroupChange(key);
                //  uniqueGroup ?  handleGroupChange(key) : undefined; 
              }}
              items={options?.map(({ value: key, label }, _i) => ({
                key, label, className: classNames(`${prefixCls}-group-item`, hashId),
                // onMouseEnter: () => { !uniqueGroup ? handleGroupChange(key) : undefined; },
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
                const checked = vaildChecked(item);
                const hidden = searchKeyword && text.indexOf(searchKeyword) == -1;
                return (
                  <ItemComponent key={i}
                    disabled={disabled}
                    checked={checked}
                    onChange={(e) => {
                      const _checked = e.target.checked;
                      if (_checked != checked) {
                        handleValueChange(_checked, val);
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
                  </ItemComponent>
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
  </>);
};

export default SalePropCard;

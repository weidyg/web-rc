import { CSSProperties, forwardRef, Ref, useMemo, useState } from 'react';
import { Alert, Button, Card, Checkbox, Flex, Input, Menu, Modal, Radio, Space, Switch } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { classNames } from '@web-rc/biz-utils';
import { useStyles } from './style';
import useSalePropValue from './_hooks/useSalePropValue';
import useSalePropOptions from './_hooks/useSalePropOptions';
import { compareValue } from './_utils';

export type OptionItemType = { label: string; value: string };
export type OptionGroupType = OptionItemType & { children: OptionItemType[] };
export type SalePropValueType = { value: string; text?: string; group?: { value: string; text?: string } };
export type SalePropValueFunType = { all: SalePropValueType[]; current?: SalePropValueType; adds?: SalePropValueType[], isGroupChanged?: boolean };
type SalePropCardProps = {
  /** 类名 */
  className?: string;
  /** 样式 */
  style?: CSSProperties;
  single?: boolean;
  uniqueGroup?: boolean;
  options?: OptionGroupType[] | OptionItemType[];
  current?: SalePropValueType;
  value?: SalePropValueType[];
  onOk?: (value: SalePropValueFunType) => Promise<void> | void;
  onCancel?: () => void;
};

type SalePropCardRef = {};

const SalePropCard = forwardRef<SalePropCardRef, SalePropCardProps>(
  (props: SalePropCardProps, ref: Ref<SalePropCardRef>) => {
    const { style, className, options = [], single, uniqueGroup, current, value, onOk, onCancel } = props;
    const { prefixCls, wrapSSR, hashId, token } = useStyles();
    const [loading, setLoading] = useState(false);
    const [searchKeyword, setSearchKeyword] = useState<string>();
    const [onlyShowChecked, setOnlyShowChecked] = useState(false);

    const { isGroup, flatOptions, getItemOptions } = useSalePropOptions(options);
    const {
      initGroupValue, initValues,
      currentGroupValue, currentValues,
      setCurrentGroupValue, setCurrentValues
    } = useSalePropValue(current, value, uniqueGroup, isGroup, flatOptions);

    const itemOpts = useMemo(() => getItemOptions(currentGroupValue), [currentGroupValue]);

    async function changeValue(isGroupChanged?: boolean) {
      const _all =
        uniqueGroup && currentGroupValue
          ? currentValues.filter((f) => f.group?.value == currentGroupValue)
          : currentValues;

      _all.forEach((f) => {
        const option = flatOptions.find((fi) => compareValue(f, fi));
        const { label, group } = option || {};
        f.text = label || f.text;
        if (group?.value && f.group?.value) {
          f.group.text = group?.label || f.group?.text;
        }
      });
      const _new = _all.filter((f) => !disabledValues.find((v) => compareValue(f, v)));
      const _current = _new.find((f) => compareValue(f, current)) || _new?.shift();
      const _adds = _new.filter((f) => !compareValue(f, _current));
      await onOk?.({ all: _all, current: _current, adds: _adds, isGroupChanged });
    }

    function handleGroupChange(groupValue: string): void {
      setCurrentGroupValue(groupValue);
    }
    function handleValueChange(checked: boolean, value: string): void {
      const group = checked && currentGroupValue ? { value: currentGroupValue } : undefined;
      const newValues = checked
        ? [...(single ? [] : currentValues), { value, group }]
        : [...(single ? [] : currentValues).filter((f) => f.group?.value == currentGroupValue && f.value != value)];
      const newCurrentValues = [...disabledValues, ...newValues];
      setCurrentValues(newCurrentValues);
    }

    const disabledValues = useMemo(() => {
      if (!current) { return initValues; }
      return initValues.filter((f) => !(f.group?.value == current?.group?.value && f.value == current?.value));
    }, [initValues, current]);

    function getStatus(value: string, text: string) {
      return {
        disabled: disabledValues.some((f) => f.group?.value == currentGroupValue && f.value == value),
        checked: currentValues.some((f) => f.group?.value == currentGroupValue && f.value == value),
        hidden: !!searchKeyword && !!text && !text.toLowerCase().includes(searchKeyword.toLowerCase()),
      };
    }

    function handleOk() {
      setLoading(true);
      setTimeout(async () => {
        if (uniqueGroup && initGroupValue && currentGroupValue != initGroupValue) {
          const oldGroup = options?.find((f) => f.value == initGroupValue)?.label || initGroupValue;
          const newGroup = options?.find((f) => f.value == currentGroupValue)?.label || currentGroupValue;
          Modal.confirm({
            title: '操作确认',
            content: `“${oldGroup}”将更换成“${newGroup}”，${oldGroup}及sku数据将被清空，确认更换？`,
            onOk: async () => {
              await changeValue(true);
              setLoading(false);
            },
            onCancel: () => {
              setLoading(false);
            },
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

    const CheckComponent = single ? Radio : Checkbox;
    return wrapSSR(
      <>
        <Card
          className={classNames(prefixCls, className, hashId)}
          classNames={{
            header: classNames(`${prefixCls}-header`, hashId),
            body: classNames(`${prefixCls}-body`, hashId),
          }}
          style={{ ...style }}
          title={
            <Flex justify="space-between">
              <Space>
                <span className={classNames(`${prefixCls}-header-selected`, hashId)}>
                  已选 {currentValues?.length || 0} 个
                </span>
                <Button type="primary" shape="round" size="small" loading={loading} onClick={handleOk}>
                  确 认
                </Button>
                <Button shape="round" size="small" onClick={handleCancel}>
                  取 消
                </Button>
                <Input
                  allowClear
                  placeholder="请输入搜索"
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
                  checkedChildren="已选"
                  unCheckedChildren="全部"
                  checked={onlyShowChecked}
                  onChange={(checked) => {
                    setOnlyShowChecked(checked);
                  }}
                />
              </Space>
            </Flex>
          }
        >
          <Flex style={{ marginTop: 1, height: 'calc(100% - 2px)' }}>
            {isGroup && (
              <div className={classNames(`${prefixCls}-group-wrapper`, hashId)}>
                <Menu
                  className={classNames(`${prefixCls}-group-menu`, hashId)}
                  selectedKeys={[currentGroupValue || '']}
                  onClick={({ key }) => {
                    handleGroupChange(key);
                  }}
                  items={options?.map(({ value: key, label }, _i) => ({
                    key,
                    label,
                    className: classNames(`${prefixCls}-group-item`, hashId),
                  }))}
                />
              </div>
            )}
            <div style={{ overflow: 'auto' }}>
              {isGroup && uniqueGroup && (
                <Alert banner type="info" message="切换分组会清空您已勾选尺码与SKU数据，请谨慎操作" />
              )}
              <div className={classNames(`${prefixCls}-item-wrapper`, hashId)}>
                <Flex wrap gap="small" justify="space-around">
                  {itemOpts?.map((item, i) => {
                    const { value: val, label: text = '' } = item;
                    const { disabled, checked, hidden } = getStatus(val, text);
                    return (
                      <>
                        <CheckComponent
                          key={i}
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
                          <span title={text} className={classNames(`${prefixCls}-item-text`, hashId)}>
                            {text}
                          </span>
                        </CheckComponent>
                      </>
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
      </>,
    );
  },
);

export type { SalePropCardProps, SalePropCardRef };
export default SalePropCard;

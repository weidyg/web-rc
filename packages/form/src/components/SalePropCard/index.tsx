import { useEffect, useMemo, useState } from 'react';
import { Alert, Button, Card, Checkbox, Flex, Input, Menu, Select, Space, Switch, Tree, Typography } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { classNames } from '@web-react/biz-utils';
import { useStyle } from './style';

export type GroupValueType = { [key: string]: string[] };
export type BaseOptionType = { label: string; value: string; }
export type GroupOptionType = BaseOptionType & { children: BaseOptionType[] }
export type SalePropCardProps = {
  /** 类名 */
  className?: string;
  /** 样式 */
  style?: React.CSSProperties;
  /** 自定义样式前缀 */
  prefixCls?: string;
  uniqueGroup?: boolean;
  options: BaseOptionType[] | GroupOptionType[];
  value: string[] | GroupValueType;
  onChange: (value: string[] | GroupValueType) => void;
  onCancel?: () => void,
};

function getChildren(item: any): BaseOptionType[] {
  return item?.children || []
}

const SalePropCard: React.FC<SalePropCardProps> = (props) => {
  const { style, className, options, uniqueGroup } = props;
  const { prefixCls, wrapSSR, hashId, token } = useStyle(props.prefixCls);

  const [loading, setLoading] = useState(false);
  const [showChecked, setShowChecked] = useState(false);
  const [showKeyword, setShowKeyword] = useState<string>();

  const [isGroup, setIsGroup] = useState(false);
  const [groupValue, setGroupValue] = useState<string>();
  const [value, setValue] = useState<string[] | GroupValueType>();

  useEffect(() => {
    const isGroup = options.some((item) => getChildren(item)?.length > 0);
    setIsGroup(isGroup);
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
        : Object.values(value).reduce((pre, cur) => pre + cur.length, 0);
    }
    return 0;
  }, [value, groupValue, uniqueGroup]);


  function handleOk(): void {

  }
  function handleCancel(): void {
    props?.onCancel?.();
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
    setValue(newValue);
  }

  function vaildDisabled(val: any) {
    return false;
  }

  function vaildChecked(val: string) {
    const values = isGroup
      ? (value as GroupValueType)?.[groupValue!]
      : value as string[];
    return values?.includes(val);
  }

  return wrapSSR(
    <Card className={className}
      style={{ overflow: 'hidden', height: '100%', ...style }}
      styles={{
        header: { padding: '8px 16px', minHeight: 'unset' },
        body: { overflow: 'hidden', padding: '0', }
      }}
      title={<Flex justify='space-between'>
        <Space >
          <span>已选 {selectedNum} 个</span>
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
      <Flex style={{ marginTop: 1 }}>
        {isGroup && (
          <div className={classNames(`${prefixCls}-group-wrapper`, hashId)}>
            <Menu
              style={{ width: '100%', height: '100%' }}
              selectedKeys={[groupValue || '']}
              onClick={(info) => handleGroupChange(info.key)}
            >
              {options?.map((item, _i) => {
                const { value: val, label: text } = item;
                return <Menu.Item
                  key={val}
                  title={text}
                  className={classNames(`${prefixCls}-group-item`, hashId)} >
                  {text}
                </Menu.Item>
              })}
            </Menu>
          </div>
        )}
        <div>
          {isGroup && uniqueGroup && (
            <Alert banner message='切换分组会清空您已勾选尺码与SKU数据，请谨慎操作' />
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
      {JSON.stringify(value)}
    </Card>
  );
};

export default SalePropCard;

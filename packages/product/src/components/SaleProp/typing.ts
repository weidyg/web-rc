export type ValueType = { value: string; text?: string; group?: { value: string; text?: string }; };
export type OptionItemType = { label: string; value: string; }
export type OptionGroupType = OptionItemType & { children: OptionItemType[] }
export type OptionFlatType = OptionItemType & { group?: OptionItemType }
export type SalePropGroupType = {
  value?: string,
  text?: string,
};
export type SalePropValueType = {
  value?: string,
  text?: string,
  img?: string,
  remark?: string
};
export type SalePropSelectDataType = {
  group?: SalePropGroupType;
  value?: SalePropValueType[];
}
export type SalePropConnextType = {
  uniqueGroup?: boolean;
  options?: OptionGroupType[] | OptionItemType[];
  data?: SalePropSelectDataType,
  onSelectChange?: (data: SalePropSelectDataType & {
    adds?: SalePropValueType[]
  }) => void | Promise<void>;
};

export type SalePropCardProps = {
  /** 类名 */
  className?: string;
  /** 样式 */
  style?: React.CSSProperties;
  /** 自定义样式前缀 */
  prefixCls?: string;

  single?: boolean;
  uniqueGroup?: boolean;
  options?: OptionGroupType[] | OptionItemType[];
  current?: ValueType;
  value?: ValueType[];
  onOk?: (value: {
    all: ValueType[],
    current?: ValueType,
    adds?: ValueType[]
  }) => Promise<void> | void,
  onCancel?: () => void,
};
export type SalePropInputProps = Pick<SalePropCardProps, 'options'> & {
  /** 类名 */
  className?: string;
  /** 样式 */
  style?: React.CSSProperties;
  /** 自定义样式前缀 */
  prefixCls?: string;

  allowCustom?: boolean;
  extFields?: ('img' | 'remark')[];

  defaultValue?: SalePropValueType;
  value?: SalePropValueType;
  onChange?: (value?: SalePropValueType) => void;
  onRemove?: () => void;
};

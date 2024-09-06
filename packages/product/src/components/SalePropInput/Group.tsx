import { createContext, useState } from "react";
import { SalePropGroupType, SalePropValueType } from ".";
import { OptionGroupType, OptionItemType } from "../SalePropCard";
import { useMergedState } from "@web-react/biz-utils";
import { Typography } from "antd";

export type SalePropInputGroupConnextType = {
  uniqueGroup?: boolean;
  options?: OptionGroupType[] | OptionItemType[];
  // onClear?: () => void | Promise<void>;
  onAdd?: (values: SalePropValueType[]) => void | Promise<void>;

  group?: SalePropGroupType;
  values?: SalePropValueType[];
  onGroupChange?: (value?: SalePropGroupType) => void;
  onValuesChange?: (value?: SalePropValueType[]) => void;
  onChange?: (v: { 
    group?: SalePropGroupType, 
    adds?: SalePropValueType[] ,
  }) => void | Promise<void>;
};
export const SalePropInputGroupConnext = createContext<SalePropInputGroupConnextType>({});

export interface SalePropInputGroupProps extends SalePropInputGroupConnextType {
  // onRemove?: (values: SalePropValueType[]) => void;
  children?: React.ReactNode;
}
const SalePropInputGroup: React.FC<SalePropInputGroupProps> = (props) => {
  const { children, uniqueGroup, options,onAdd, ...restProps } = props;

  const [group, setGroup] = useMergedState(undefined, {
    value: props?.group,
    onChange: props?.onGroupChange
  });

  const [values, setValues] = useMergedState([], {
    value: props?.values,
    onChange: props?.onValuesChange
  });

  // const [group, setGroup] = useState(props?.group);
  // const [values, setValues] = useState(props?.values);

  return <SalePropInputGroupConnext.Provider value={{
    uniqueGroup, options, onAdd,
    group, values,
    onValuesChange: (value?: SalePropValueType[]) => {
      setValues(value || []);
    },
    onGroupChange: (value?: SalePropGroupType) => {
      setGroup(value);
    },
  }}
  >
    <Typography>
      <pre>{JSON.stringify(group)}</pre>
      <pre>{JSON.stringify(values)}</pre>
    </Typography>
    {children}
  </SalePropInputGroupConnext.Provider>;
};
export default SalePropInputGroup;

import { createContext, useState } from "react";
import { SalePropGroupType, SalePropValueType } from ".";
import { OptionGroupType, OptionItemType } from "../SalePropCard";
import { useMergedState } from "@web-react/biz-utils";
import { Typography } from "antd";

export type SalePropSelectDataType = {
  group?: SalePropGroupType;
  value?: SalePropValueType[];
}
export type SalePropInputGroupConnextType = {
  uniqueGroup?: boolean;
  options?: OptionGroupType[] | OptionItemType[];

  onClear?: () => void | Promise<void>;
  onAdd?: (values: SalePropValueType[]) => void | Promise<void>;

  data?: SalePropSelectDataType,
  onSelectChange?: (data: SalePropSelectDataType) => void | Promise<void>;
};
export const SalePropInputGroupConnext = createContext<SalePropInputGroupConnextType | undefined>(undefined);

export interface SalePropInputGroupProps {
  // onRemove?: (values: SalePropValueType[]) => void;
  children?: React.ReactNode;
  options?: OptionGroupType[] | OptionItemType[];
  uniqueGroup?: boolean;
  group?: SalePropGroupType;
  onGroupChange?: (value?: SalePropGroupType) => void;
  values?: SalePropValueType[];
  onClear?: () => void | Promise<void>;
  onAdd?: (values: SalePropValueType[]) => void | Promise<void>;
}
const SalePropInputGroup: React.FC<SalePropInputGroupProps> = (props) => {
  const { children, uniqueGroup, options, onAdd, onClear, ...restProps } = props;

  // const [group, setGroup] = useMergedState(undefined, {
  //   value: props?.group,
  //   onChange: props?.onGroupChange
  // });

  // const [selectValues, setSelectChange] = useMergedState([], {
  //   // value: props?.selectValues,
  //   // onChange: props?.onSelectChange
  // });

  const [selectData, setSelectData] = useState<SalePropSelectDataType>();
  // const [values, setValues] = useState(props?.values);

  return <SalePropInputGroupConnext.Provider value={{
    uniqueGroup, options, onAdd, onClear,
    data: selectData,
    onSelectChange: (data) => {
      setSelectData(data);
      // setSelectChange(value);
    },
  }}
  >
    <Typography>
      <pre>{JSON.stringify(selectData)}</pre>
      {/* <pre>{JSON.stringify(values)}</pre> */}
    </Typography>
    {children}
  </SalePropInputGroupConnext.Provider>;
};
export default SalePropInputGroup;

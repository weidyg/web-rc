import { createContext, useState } from "react";
import { SalePropGroupType, SalePropValueType } from ".";
import { OptionGroupType, OptionItemType } from "../SalePropCard";
import { Typography } from "antd";

export type SalePropSelectDataType = {
  group?: SalePropGroupType;
  value?: SalePropValueType[];
}
export type SalePropInputGroupConnextType = {
  uniqueGroup?: boolean;
  options?: OptionGroupType[] | OptionItemType[];
  data?: SalePropSelectDataType,
  onSelectChange?: (data: SalePropSelectDataType & {
    adds?: SalePropValueType[]
  }) => void | Promise<void>;
};
export const SalePropInputGroupConnext = createContext<SalePropInputGroupConnextType | undefined>(undefined);

export interface SalePropInputGroupProps {
  // onRemove?: (values: SalePropValueType[]) => void;
  children?: React.ReactNode;

  uniqueGroup?: boolean;
  options?: OptionGroupType[] | OptionItemType[];
  values?: SalePropValueType[];

  group?: SalePropGroupType;
  onGroupChange?: (value?: SalePropGroupType) => void;
  onClear?: () => void | Promise<void>;
  onAdd?: (values: SalePropValueType[]) => void | Promise<void>;
}
const SalePropInputGroup: React.FC<SalePropInputGroupProps> = (props) => {
  const { children, uniqueGroup, options, onAdd, onClear } = props;

  const [selectData, setSelectData] = useState<SalePropSelectDataType>({
    group: props?.group,
    value: props?.values,
  });

  const handleSelectChange = (data: SalePropSelectDataType & { adds?: SalePropValueType[] }) => {
    const { group, value } = selectData;
    const groupChange = group?.value != data?.group?.value;
    if (groupChange) {
      props?.onGroupChange?.(data?.group);
    }
    if (groupChange && uniqueGroup) {
      onClear?.();
      onAdd?.(data?.value || []);
    } else if (data?.adds) {
      onAdd?.(data?.adds);
    }
    setSelectData(data);
  }
  return (<>
    <Typography>
      <pre>{JSON.stringify(selectData)}</pre>
      {/* <pre>{JSON.stringify(values)}</pre> */}
    </Typography>

    <SalePropInputGroupConnext.Provider
      value={{
        uniqueGroup, options,
        data: selectData,
        onSelectChange: handleSelectChange,
      }}
    >
      {children}
    </SalePropInputGroupConnext.Provider>
  </>)
};
export default SalePropInputGroup;

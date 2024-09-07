import { createContext, useEffect, useState } from "react";
import { SalePropGroupType, SalePropValueType } from ".";
import { OptionGroupType, OptionItemType } from "../SalePropCard";
import { Typography } from "antd";
import { useMergedState } from "@web-react/biz-utils";

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
  children?: React.ReactNode;
  uniqueGroup?: boolean;
  options?: OptionGroupType[] | OptionItemType[];
  group?: SalePropGroupType;
  values?: SalePropValueType[];
  onGroupChange?: (value?: SalePropGroupType) => void;
  onClear?: () => void | Promise<void>;
  onAdd?: (values: SalePropValueType[]) => void | Promise<void>;
}
const SalePropInputGroup: React.FC<SalePropInputGroupProps> = (props) => {
  const { children, uniqueGroup, options, onAdd, onClear } = props;

  const [selectData, setSelectData] = useMergedState({}, {
    value: {
      group: props?.group,
      value: props?.values,
    }
  });

  const handleSelectChange = (data: SalePropSelectDataType & { adds?: SalePropValueType[] }) => {
    const { group, value, adds } = data;
    const groupChange = group?.value != selectData?.group?.value;
    if (groupChange) { props?.onGroupChange?.(group); }
    if (groupChange && uniqueGroup) {
      onClear?.();
      onAdd?.(value || []);
    } else if (adds) {
      onAdd?.(adds);
    }
    setSelectData({ group, value });
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

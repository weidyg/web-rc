import { createContext, } from "react";
import { useMergedState } from "@web-react/biz-utils";
import { SalePropGroupType, SalePropConnextType, SalePropSelectDataType, SalePropValueType } from ".";
import { OptionGroupType, OptionItemType } from ".";


export const SalePropInputGroupConnext = createContext<SalePropConnextType | undefined>(undefined);

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
const SaleProp: React.FC<SalePropInputGroupProps> = (props) => {
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
export default SaleProp;

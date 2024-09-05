import { createContext } from "react";
import { SalePropGroupType, SalePropValueType } from ".";
import { OptionGroupType, OptionItemType } from "../SalePropCard";

export type SalePropInputGroupConnextType = {

};
export const SalePropInputGroupConnext = createContext<SalePropInputGroupConnextType | null>(null);


export interface SalePropInputGroupProps {
  uniqueGroup?: boolean;
  values?: SalePropValueType[];
  options?: OptionGroupType[] | OptionItemType[];
  
  group?: SalePropGroupType;
  onGroupChange?: (group?: SalePropGroupType) => void;
  onAdd?: (values: SalePropValueType[]) => void;
  children?: React.ReactNode;
}
const SalePropInputGroup: React.FC<SalePropInputGroupProps> = (props) => {
  const {
    children,
    ...restProps
  } = props;


  return <SalePropInputGroupConnext.Provider
    value={{

    }}
  >
    {children}
  </SalePropInputGroupConnext.Provider>;
};
export default SalePropInputGroup;

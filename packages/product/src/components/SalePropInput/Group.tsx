import { createContext } from "react";

export type SalePropInputGroupConnextType = {

};
export const SalePropInputGroupConnext = createContext<SalePropInputGroupConnextType | null>(null);


export interface SalePropInputGroupProps {
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

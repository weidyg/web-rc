import { createContext } from "react";
import { OptionFlatType, OptionGroupType, OptionItemType } from "./typing";
import useSalePropOptions from "./hooks/useSalePropOptions";


type SalePropCardContextProps = {
    uniqueGroup?: boolean,
    options: OptionFlatType[],

    isGroup: boolean,
    flatOptions: OptionFlatType[],
    getItemOptions: (groupValue?: string) => OptionItemType[]
};

const SalePropCardContext = createContext<SalePropCardContextProps>({
    uniqueGroup: false,
    options: [],
    
    isGroup: false,
    flatOptions: [],
    getItemOptions: () => [],
});

type SalePropCardProviderProps = {
    uniqueGroup?: boolean;
    options: OptionGroupType[] | OptionItemType[];
    children?: React.ReactNode;
};

export const SalePropCardProvider: React.FC<SalePropCardProviderProps> = (props) => {
    const { children, options, uniqueGroup, ...restProps } = props;
    const { isGroup, flatOptions, getItemOptions } = useSalePropOptions(options);

    return (
        <SalePropCardContext.Provider
            value={{
                uniqueGroup,
                options,
                isGroup,
                flatOptions,
                getItemOptions
            }}
        >
            {children}
        </SalePropCardContext.Provider>
    );
};
export default SalePropCardContext;
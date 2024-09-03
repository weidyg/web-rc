import { Dispatch, useEffect, useState } from "react";
import { SalePropValueType, OptionGroupType, OptionItemType } from "..";

function unique(list: SalePropValueType[]) {
    return list.filter((item, index) => list.indexOf(item) === index);
}


export default function useSalePropValue(
    value?: SalePropValueType[],
    uniqueGroup?: boolean,
    options?: OptionGroupType[] | OptionItemType[],
): {
    initGroupValue?: string,
    currentGroupValue?: string,
    initValues: SalePropValueType[],
    currentValues: SalePropValueType[],
    setCurrentGroupValue: Dispatch<React.SetStateAction<string | undefined>>,
    setCurrentValues: Dispatch<React.SetStateAction<SalePropValueType[]>>,
} {

    const [initValues, setInitValues] = useState<SalePropValueType[]>([]);
    const [currentValues, setCurrentValues] = useState<SalePropValueType[]>([]);
    const [initGroupValue, setInitGroupValue] = useState<string>();
    const [currentGroupValue, setCurrentGroupValue] = useState<string>();

    useEffect(() => {
        const _intValue: SalePropValueType[] = value || [];
        let isGroup = options?.some((item) => (item as OptionGroupType)?.children?.length > 0);

        let _groupValue: string | undefined;
        let _currentGroupValue: string | undefined;
        if (isGroup) {
            _groupValue = _intValue.find(f => f.groupValue)?.groupValue;
            _currentGroupValue = _groupValue || options?.[0]?.value;
        }
        setInitValues(_intValue);
        setCurrentValues(_intValue);
        setInitGroupValue(_groupValue);
        setCurrentGroupValue(_currentGroupValue);
    }, [value, uniqueGroup, options]);

    return {
        currentGroupValue, currentValues,
        initGroupValue, initValues,
        setCurrentGroupValue,
        setCurrentValues: (value) => {
            if (Array.isArray(value)) {
                setCurrentValues(unique([...initValues, ...value]))
            } else if (typeof value == 'function') {
                setCurrentValues((previous) => {
                    return unique(value([...initValues, ...previous]));
                });
            }
        }
    };
};
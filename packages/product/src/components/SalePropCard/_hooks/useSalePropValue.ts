import { Dispatch, useEffect, useState } from "react";
import { OptionItemType, ValueType } from "@web-rc/biz-product";

export default function useSalePropValue(
    current?: ValueType,
    value?: ValueType[],
    uniqueGroup?: boolean,
    isGroup?: boolean,
    options?: (OptionItemType & { group?: OptionItemType })[],
): {
    initGroupValue?: string,
    initValues: ValueType[],

    currentGroupValue?: string,
    currentValues: ValueType[],
    setCurrentGroupValue: Dispatch<React.SetStateAction<string | undefined>>,
    setCurrentValues: Dispatch<React.SetStateAction<ValueType[]>>,
} {

    const [initValues, setInitValues] = useState<ValueType[]>([]);
    const [initGroupValue, setInitGroupValue] = useState<string>();
    const [currentValues, setCurrentValues] = useState<ValueType[]>([]);
    const [currentGroupValue, setCurrentGroupValue] = useState<string>();

    useEffect(() => {
        let _intValue: ValueType[] = [];
        let _groupValue: string | undefined;
        let _currentGroupValue: string | undefined;
        if (isGroup) {
            _groupValue = current?.group?.value || _intValue.find(f => f.group?.value)?.group?.value;
            _currentGroupValue = _groupValue || options?.find(f => f.group?.value)?.group?.value;
            _intValue = value?.filter(f => options?.some(s => s.value == f.value && f.group?.value == s.group?.value)) || [];
        } else {
            _intValue = value?.filter(f => options?.some(s => s.value == f.value)) || [];
        }
        setInitValues(_intValue);
        setCurrentValues(_intValue);
        setInitGroupValue(_groupValue);
        setCurrentGroupValue(_currentGroupValue);
    }, [current, value, uniqueGroup, isGroup, options]);

    return {
        currentGroupValue, currentValues,
        initGroupValue, initValues,
        setCurrentGroupValue,
        setCurrentValues: (value) => {
            if (Array.isArray(value)) {
                setCurrentValues(unique(value))
            } else if (typeof value == 'function') {
                setCurrentValues((previous) => {
                    return unique(value(previous));
                });
            }
        }
    };
};

function unique(list: ValueType[]) {
    return list.filter((item, index) => list.indexOf(item) === index);
}

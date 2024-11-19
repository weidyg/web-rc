import { OptionGroupType, OptionItemType, ValueType } from "@web-rc/biz-product";
import { Dispatch, useCallback, useEffect, useMemo, useState } from "react";

export type OptionFlatType = OptionItemType & { group?: OptionItemType }
export type UseSalePropOptionType = {
  isGroup: boolean,
  flatOptions: OptionFlatType[],
  getItemOptions: (groupValue?: string) => OptionItemType[]
};
export default function useSalePropOptions(options: OptionGroupType[] | OptionItemType[]): UseSalePropOptionType {
  const [isGroup, flatOptions] = useMemo(() => {
    let _flattenOptions: OptionFlatType[] = [];
    let _isGroup = options?.some((item) => (item as OptionGroupType)?.children?.length > 0);
    if (_isGroup) {
      options.forEach((m) => {
        const group = { label: m?.label, value: m?.value };
        const children = (m as OptionGroupType).children || [];
        const _opts = children.map((c) => ({ label: c?.label, value: c?.value, group }));
        _flattenOptions.push(..._opts);
      })
    } else {
      _flattenOptions = options.map((m) => ({ label: m?.label, value: m?.value }));
    }
    return [_isGroup, _flattenOptions];
  }, [options]);

  const getItemOptions = useCallback((groupValue?: string) => {
    const itemOpts: OptionItemType[] = isGroup
      ? (options as OptionGroupType[]).find((f) => f.value === groupValue)?.children || []
      : (options as OptionItemType[]) || [];
    return itemOpts;
  }, [isGroup, options]);

  return { isGroup, flatOptions, getItemOptions };
}

export type ValueType = { value: string; text?: string; group?: { value: string; text?: string }; };
export type OptionItemType = { label: string; value: string; }
export type OptionGroupType = OptionItemType & { children: OptionItemType[] }
export type OptionFlatType = OptionItemType & { group?: OptionItemType }
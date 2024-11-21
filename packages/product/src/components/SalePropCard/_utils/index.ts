import { SalePropValueType } from "..";

export const compareValue = (v1?: SalePropValueType, v2?: SalePropValueType) => {
  return v1?.group?.value == v2?.group?.value && v1?.value == v2?.value;
};

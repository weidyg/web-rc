import { ValueType } from "../typing"

export const compareValue = (v1?: ValueType, v2?: ValueType) => {
    return v1?.group?.value == v2?.group?.value && v1?.value == v2?.value
}

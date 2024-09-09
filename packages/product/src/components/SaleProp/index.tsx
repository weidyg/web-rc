import SalePropCard from './Card';
import SalePropInput from './Input';
import InternalSaleProp from './SaleProp';

type CompoundedComponent = typeof InternalSaleProp & {
  Card: typeof SalePropCard;
  Input: typeof SalePropInput;
};
const SaleProp = InternalSaleProp as CompoundedComponent;
SaleProp.Card = SalePropCard;
SaleProp.Input = SalePropInput;
export default SaleProp;
export type * from './typing';

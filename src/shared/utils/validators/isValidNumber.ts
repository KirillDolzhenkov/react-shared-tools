import isNaN    from './inNun';
import isNumber from './isNumber';

function isValidNumber<T extends number>(value: T): boolean;
function isValidNumber(value: any): value is number;
function isValidNumber(value: any) {
  return isNumber(value) && !isNaN(value);
}

export default isValidNumber;

import isString from './isString';

function isValidString<T extends string>(value: T): boolean;
function isValidString<T extends string>(value: any): value is T;
function isValidString(value: any) {
  return isString(value) && value.trim().length > 0;
}

export default isValidString;

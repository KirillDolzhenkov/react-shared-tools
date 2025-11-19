import getType from './getType';

function isString<TString extends string>(value: any): value is TString {
  return getType(value) === '[object String]';
}

export default isString;

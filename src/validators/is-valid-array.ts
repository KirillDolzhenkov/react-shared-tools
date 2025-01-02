import isArray from './is-array';

function isValidArray<T>(value: any): value is T[];
function isValidArray<T>(value: T[]): value is T[];
function isValidArray(value: any) {
    return isArray(value) && value.length > 0;
}

export default isValidArray;
import getType from './getType';

function isArray<T>(value: any): value is T[] {
    return getType(value) === '[object Array]';
}

export default isArray;
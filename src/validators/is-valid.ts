import isNull      from './is-null';
import isUndefined from './is-undefined';

function isValid<T>(value: T | null | undefined): value is T {
    return !isNull(value) && !isUndefined(value);
}

export default isValid;
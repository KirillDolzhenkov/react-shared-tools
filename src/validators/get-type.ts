function getType(object: any) {
    return Object.prototype.toString.call(object);
}

export default getType;
export default function findVal(object: object, key: string) {
  let value;
  Object.keys(object).some(function (k) {
    if (k === key) {
      value = object[k];
      return true;
    }
    if (object[k] && typeof object[k] === 'object') {
      value = findVal(object[k], key);
      return value !== undefined;
    }
  });
  return value;
}

export function findValByKey(obj: object, key: string) {
  let objValue = { ...obj };
  const keys = key.split('.');
  for (let i = 0; i < keys.length; i++) {
    const k = keys[i];
    if (objValue[k]) {
      objValue = objValue[k];
    } else {
      break;
    }
  }

  return objValue;
}

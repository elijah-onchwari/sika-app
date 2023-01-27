/**
 * Check value empty.
 * @param item
 * @returns {boolean}
 */
export const isEmpty = (item: any): boolean => {
  if (item instanceof Array) {
    item = item.filter((val) => !isEmpty(val));
    return item.length === 0;
  } else if (item && typeof item === 'object') {
    for (const key in item) {
      if (item[key] === null || item[key] === undefined || item[key] === '') {
        delete item[key];
      }
    }
    return Object.keys(item).length === 0;
  } else {
    return (
      !item ||
      (item + '').toLocaleLowerCase() === 'null' ||
      (item + '').toLocaleLowerCase() === 'undefined'
    );
  }
};

/**
 * get current date in this format: DD.MM.YYYY HH:mm:ss
 * @returns {'DD.MM.YYYY HH:mm:ss'}
 */
export const getDate = () => {
  return new Date().toLocaleString('en-US', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
};

/**
 * string should be converted to a boolean
 *
 * @param val
 * @returns
 */
export function parseToBoolean(val: string | boolean): boolean {
  return typeof val === 'string' ? JSON.parse(val) : val;
}

/**
 * Simple object check.
 * @param item
 * @returns {boolean}
 * From https://stackoverflow.com/a/34749873/772859
 */
export function isObject(item: any) {
  return item && typeof item === 'object' && !Array.isArray(item);
}

/**
 * Check is class instance.
 * @param item
 * @returns {boolean}
 */
export function isClassInstance(item: any): boolean {
	return isObject(item) && item.constructor.name !== 'Object';
}

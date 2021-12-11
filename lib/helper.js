/**
 * checks if object is empty or not
 * @param {Object} value an object
 * @returns boolean
 */
const isEmpty = (value) => {
  return Object.keys(value).length === 0 && value.constructor === Object;
};

export { isEmpty };

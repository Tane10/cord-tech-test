/**
 * checks if object is empty or not
 * @param {Object} value an object
 * @returns boolean
 */
const isEmpty = (value) => {
  return Object.keys(value).length === 0 && value.constructor === Object;
};

/**
 * finds the correct schema that matches the originalUrl
 * @param {string, schemaObject} schemaEntries tuple array of schemaEntries
 * @param {string} originalUrl original request URL
 * @param {string} requestMethod request method
 * @returns schema or false
 */
const findRequiredSchema = (schemaEntries, originalUrl, requestMethod) =>
  schemaEntries.filter((schemas) => {
    if (schemas[0] === originalUrl) {
      return schemas[1][requestMethod];
    } else return false;
  });

export { isEmpty, findRequiredSchema };

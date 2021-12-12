import { isEmpty } from "./helper";

//TODO: take a step back and look at the code and remove not needed functions
//TODO: add some tests for some the functions that i'm not gonna change just so i know they work etc

/**
 * Creates SchemaValidation
 * @class
 * @classdesc SchemaValidation class that has request, schema and schemaKeys props
 * @param {object} schema JSON schema containing rules
 * @param {object} request express req object
 */
export default function SchemaValidation(schema, request) {
  this.request = request;
  this.schema = schema.paths;
  this.schemaKeys = Object.keys(this.schema);
  this.schemaEntries = Object.entries(this.schema);
  this.response = {
    success: true,
    message: "valid",
  };
}

/**
 * finds the correct schema that matches the originalUrl
 * @param {string} originalUrl original request URL
 * @param {string} requestMethod request method
 * @returns schema or false
 */
SchemaValidation.prototype.findRequiredSchema = function (
  originalUrl,
  requestMethod
) {
  return this.schemaEntries.filter((schemas) => {
    if (schemas[0] === originalUrl) {
      return schemas[1][requestMethod];
    } else return false;
  });
};

/**
 * Function that extracts and returns the body, querystring, originalUrl and requestMethod of the request
 */
SchemaValidation.prototype.retrieveRequestDetails = function () {
  const { body, originalUrl } = this.request;
  const queryString = this.request.query;
  const requestMethod = this.request.method.toLowerCase();
  return { body, queryString, originalUrl, requestMethod };
};

/**
 * Builds and returns validations error details
 * @param {string} message error message
 * @param {string} context error context
 * @returns error message object
 */
SchemaValidation.prototype.validationError = function (message) {
  return {
    success: false,
    message,
  };
};

/**
 * Extracts required route prop from schema if they exists
 * @returns
 */
SchemaValidation.prototype.extractRouteRulesFromSchema = function () {
  const requestDetails = this.retrieveRequestDetails();

  const selectedSchema = this.findRequiredSchema(
    requestDetails.originalUrl,
    requestDetails.requestMethod
  );

  return selectedSchema.length === 0 ? false : selectedSchema;
};

/**
 * Validate Params
 * @param {object} params
 * @returns boolean
 */
SchemaValidation.prototype.validateEmptyParams = function () {
  const errorMessage = "Parameters are not permitted in ";
  const isBodyEmpty = isEmpty(requestDetails.body);
  const isQueryStringEmpty = isEmpty(requestDetails.queryString);

  return !isBodyEmpty && !isQueryStringEmpty
    ? this.validationError(errorMessage + "body or query string")
    : !isBodyEmpty
    ? this.validationError(errorMessage + "body")
    : !isQueryStringEmpty
    ? this.validationError(errorMessage + "query string")
    : this.response;
};

/**
 * Gets all required parameters for the rule
 * @param {object} params the parameter object of the required rule
 * @returns string[][]
 */
SchemaValidation.prototype.extractRequiredParams = function (params) {
  // going from the assumption that only objects have required params
  return params.map((param) => {
    if (param.in === "body" && param.schema.type === "object") {
      return param.required !== undefined ? param.required : [];
    } else {
      return [];
    }
  });
};

SchemaValidation.prototype.validate = function () {
  const extractedRules = this.extractRouteRulesFromSchema();
  //if no rules for the route then pass as valid and return the message that there isn't any rules to validate against

  // if no rules available then valid
  if (!extractedRules) {
    const response = this.response;
    response.message = "No validation rules found";
    return response;
  }

  // if no params in rules, check request contains no params
  if (!extractedRules.hasOwnProperty("parameters")) {
    return this.validateEmptyParams();
  }

  const parameters = extractedRules.parameters;

  const requiredParameters = this.extractRequiredParams(parameters);
};

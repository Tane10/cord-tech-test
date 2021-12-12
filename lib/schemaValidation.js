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
SchemaValidation.prototype.findRequiredSchema = function(
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
SchemaValidation.prototype.retrieveRequestDetails = function() {
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
SchemaValidation.prototype.validationError = function(message, context) {
    return (this.response = {
        success: false,
        response: {
            message,
        },
    });
};

/**
 * Extracts required route prop from schema if they exists
 * @returns
 */
SchemaValidation.prototype.extractRouteParameters = function() {
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
SchemaValidation.prototype.validateParams = function(params) {
    if (!params) {
        if (!selectedSchema.hasOwnProperty("parameters")) {
            const context = "SchemaValidation.prototype.extractRouteParameters";
            const errorMessage = "Parameters are not permitted in ";

            const isBodyEmpty = isEmpty(requestDetails.body);
            const isQueryStringEmpty = isEmpty(requestDetails.queryString);

            return !isBodyEmpty && !isQueryStringEmpty ?
                this.validationError(errorMessage + "body or query string", context) :
                !isBodyEmpty ?
                this.validationError(errorMessage + "body", context) :
                !isQueryStringEmpty ?
                this.validationError(errorMessage + "query string", context) :
                this.response;
        }
    }
};

SchemaValidation.prototype.extractRequiredParams = function(params) {
    const requiredParams = params.reduce((prev, current) => {
        if (current) {
            console.log("mow");
        }
    }, []);
};

SchemaValidation.prototype.validate = function() {
    const extractedParamsProp = this.extractRouteParameters();
    // if there isn't a schema for the route then we can't

    if (!extractedParamsProp) {
        this.validateParams(false);
        return;
    }

    const requiredParameters = this.extractRequiredParams(parameters);
};
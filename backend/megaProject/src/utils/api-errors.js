/**
 * Error class for handling API errors
 * 
 * @class ApiError
 * @extends Error
 * @constructor
 * @param {number} statusCode - HTTP status code
 * @param {string} message - Error message
 * @param {Array} errors - Array of errors
 * @returns {ApiError}
 */

class ApiError extends Error {
    constructor(
        statusCode,
        message,
        errors = [],
        stack = '',
    ){
        super(message);
        this.message = message;
        this.statusCode = statusCode;
        this.errors = errors;
        this.success = false;
        if(stack){
            this.stack = stack
        }else{
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

export default ApiError;
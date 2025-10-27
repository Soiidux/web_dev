/**
 * Class for handling API responses
 * 
 * @class ApiResponse
 * @constructor
 * @param {number} statusCode - HTTP status code
 * @param {Object} data - Data to be returned
 * @param {string} message - Message to be returned
 * @returns {ApiResponse}
 */

class ApiResponse{
    constructor(statusCode,data, message='Success'){
        this.statusCode = statusCode
        this.data = data
        this.message = message
        this.success = statusCode < 400
    }
}

export default ApiResponse;
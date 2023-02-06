const httpStatusCodes = require('../httpCode/response')
const BaseError = require('./baseError')

class Api404Error extends BaseError {
 constructor (
    description  = description || 'not found!',
    name,
    statusCode = httpStatusCodes.NOT_FOUND,
    isOperational = true, 
 ) {
 super(name, statusCode, isOperational, description)
 }
 
}

module.exports = Api404Error
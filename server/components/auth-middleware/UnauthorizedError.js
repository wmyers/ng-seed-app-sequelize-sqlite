function UnauthorizedError (code, message) {
  this.code = code;
  this.message = message;
  this.stack = (new Error()).stack;
}

UnauthorizedError.prototype = Object.create(Error.prototype);
UnauthorizedError.prototype.constructor = UnauthorizedError;
UnauthorizedError.prototype.name = 'UnauthorizedError';

module.exports = UnauthorizedError;

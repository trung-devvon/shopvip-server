import { StatusCodes } from 'http-status-codes';

// Custom error class
class HandleError extends Error {
  public statusCode: number;

  constructor(message: string, statusCode: number = StatusCodes.INTERNAL_SERVER_ERROR) {
    super(message);
    this.name = 'HandleError';
    this.statusCode = statusCode;

    // Maintain proper stack trace for the error
    Error.captureStackTrace(this, this.constructor);
  }

  // Static methods for common error cases
  static badRequest(message: string = 'Bad Request') {
    return new HandleError(message, StatusCodes.BAD_REQUEST);
  }

  static unauthorized(message: string = 'Unauthorized') {
    return new HandleError(message, StatusCodes.UNAUTHORIZED);
  }

  static forbidden(message: string = 'Forbidden') {
    return new HandleError(message, StatusCodes.FORBIDDEN);
  }

  static notFound(message: string = 'Resource Not Found') {
    return new HandleError(message, StatusCodes.NOT_FOUND);
  }

  static internal(message: string = 'Internal Server Error') {
    return new HandleError(message, StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

export default HandleError;
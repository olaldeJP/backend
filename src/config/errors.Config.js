export const ErrorType = {
  NOT_FOUND: 404,
  INVALID_DATA: 400,
  ERROR_REQUEST: 400,
  UNAUTHORIZED_USER: 401,
  FORBIDDEN_USER: 403,
};

export class NewError {
  constructor(code, message) {
    this.code = code;
    this.message = message;
  }
}

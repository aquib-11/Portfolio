import { StatusCodes } from "http-status-codes";

export class NotFoundErr extends Error{
    constructor(message){
        super(message);
        this.name = 'notFound';
        this.StatusCode = StatusCodes.NOT_FOUND;
    }
};

export class badRequestErr extends Error {
  constructor(message) {
    super(message);
    this.name = "badRequestErr";
  this.StatusCode = StatusCodes.BAD_REQUEST
   
  }
};

export class UnAuthenticatedErr extends Error {
  constructor(message) {
    super(message);
    this.name = "UnAuthenticatedErr";
    this.StatusCode = StatusCodes.UNAUTHORIZED;
  }
};

export class UnauthorizedErr extends Error {
  constructor(message) {
    super(message);
    this.name = "UnauthorizedErr";
    this.StatusCode = StatusCodes.FORBIDDEN;
  }
};
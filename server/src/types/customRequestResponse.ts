import { Request } from 'express';

// @ts-ignore
export interface CustomRequestWithQuery<T> extends Request {
  query: T;
}

// @ts-ignore
export interface CustomRequestAuth<T> extends Request {
  user: T;
}

// @ts-ignore
export interface CustomResponse<T> extends Response {
  json: (body: T) => Response;
}

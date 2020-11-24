/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Request, Response } from 'express';

// @ts-ignore
export interface CustomRequestWithQuery<T> extends Request {
  query: T;
}

// @ts-ignore
export interface CustomResponse<T> extends Response {
  json: (body: T) => Response;
}

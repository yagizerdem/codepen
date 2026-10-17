import type { NextFunction, Request, RequestHandler, Response } from "express";

type AsyncRequestHandler<
  P = Record<string, string>,
  ResBody = unknown,
  ReqBody = unknown,
  ReqQuery = Record<string, unknown>,
> = (
  req: Request<P, ResBody, ReqBody, ReqQuery>,
  res: Response<ResBody>,
  next: NextFunction,
) => Promise<unknown>;

/** Forwards rejected promises from async route handlers to Express error middleware. */
export const asyncHandler =
  <P = Record<string, string>, ResBody = unknown, ReqBody = unknown, ReqQuery = Record<string, unknown>>(
    fn: AsyncRequestHandler<P, ResBody, ReqBody, ReqQuery>,
  ): RequestHandler<P, ResBody, ReqBody, ReqQuery> =>
  (req, res, next) => {
    fn(req, res, next).catch(next);
  };

import { NextFunction, Request, Response } from "express";
import { BaseSchema } from "yup";
import { MixedSchema } from "yup/lib/mixed";

/**
 * This middleware checks the req.body against an yup schema provided in it
 * @example
 * ```
 *    validate(incomingRequestBody, incomingBodySchema)
 *
 * ```
 * @returns if body is not valid according to yup schema, returns yup validation error.
 *    calls next() if all is good.
 * */

export const validate = (schema: MixedSchema | BaseSchema) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response> => {
    const body = req.body;
    try {
      await schema.validate(body, {
        abortEarly: false,
      });
      return next();
    } catch (err) {
      return res.status(400).json({
        err,
      });
    }
  };
};

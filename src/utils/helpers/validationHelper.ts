import { ZodSchema } from "zod";
import express from "express";
import { validationError } from "./responseHelper";

const validate =
  (schema: ZodSchema) =>
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
      const data = schema.parse(req.body);
      req.body = data;
      next();
    } catch (err: any) {
      return res.status(200).json({
        message: "Validation Error",
        statusCode: res.statusCode,
        error: validationError(err),
      });
    }
  };

export default validate;

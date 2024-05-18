import { ZodError } from "zod";

const error = (message: string, code: number) => {
  const status = [400, 401, 403, 404, 409, 500];

  const statusCode = status.includes(code) ? code : 500;

  const errorMessage = message ? message : "Internal server error";

  return {
    message: errorMessage,
    code: statusCode,
  };
};

export const validationError = (err: ZodError) => {
  const error: string[] = [];

  err.issues.map((e) => {
    error.push(e.message);
  });
  return error;
};

export default error;

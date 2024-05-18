import express from "express";

import jwt from "jsonwebtoken";
import { tokenVerification } from "../utils/helpers/tokenHelper";
import { jwtConfig } from "../config/jwtConfig";

const auth = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    let reqToken = req.headers.authorization;

    if (!reqToken) {
      throw {
        message: "Token Not Present",
        code: 401,
      };
    }
    let token = tokenVerification(reqToken);

    jwt.verify(token, jwtConfig.secretKey, (err: any, decoded: any) => {
      if (err) {
        console.log(err);
        throw {
          message: "Unauthorized",
          statusCode: 401,
        };
      }
      console.log(decoded, "Decoded");
      //@ts-ignore
      req.id = decoded;

      next();
    });
  } catch (err) {
    next(err);
  }
};

export default auth;

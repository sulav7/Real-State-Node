import jwt from "jsonwebtoken";
import { jwtConfig } from "../../config/jwtConfig";

const generateToken = (token: any) => {
  return jwt.sign(token, jwtConfig.secretKey);
};

export const tokenVerification = (token: string) => {
  const verifyToken = token.split(" ")[1];
  return verifyToken;
};

export default generateToken;

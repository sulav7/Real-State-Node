import bcrypt from "bcryptjs";

export const hashedPassword = (password: string) => {
  const salt = bcrypt.genSaltSync(10);

  const hashedPassword = bcrypt.hash(password, salt);
  return hashedPassword;
};

export const comparePassword = (password: string, hashedPassword: string) => {
  const comparePassword = bcrypt.compare(password, hashedPassword);
  return comparePassword;
};

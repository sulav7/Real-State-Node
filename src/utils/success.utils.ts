export const success = (message: string, code: number, result: any) => {
  return {
    message,
    code,
    result,
  };
};

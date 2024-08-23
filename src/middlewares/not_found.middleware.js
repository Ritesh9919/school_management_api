export const notFoundMiddleware = (req, res, next) => {
  return res.send("This route does not exist");
};

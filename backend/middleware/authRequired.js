import { ApiError } from "./errorMiddleware.js";

export default function authRequired(req, res, next) {
  // CHECKS TO SEE IF USER IS IN SESSION IF NOT SENDS 401
  if (req.session.user) return next();
  next(new ApiError("You need to login first", 401));
}

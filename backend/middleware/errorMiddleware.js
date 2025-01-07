export default function errorMiddlewere(err, req, res, next) {
  const errMessage = err.message || "There has been a fatal error";
  const statusCode = err.statusCode || 500;

  return res.status(statusCode).json({ error: errMessage });
}

// CUSTOM API ERROR CLASS
export class ApiError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

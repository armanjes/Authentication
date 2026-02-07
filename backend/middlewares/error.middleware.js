import {env} from "../config/index.js"

export default function errorMiddleware(err, req, res, next) {
  const isOperational = err.isOperational === true;
  const status = isOperational ? err.statusCode : 500;
  const message = isOperational ? err.message : "Internal server error.";

  const response = { ok: false, message };

  if (env.NODE_ENV === "development") {
    response.stack = err.stack;
  }

  res.status(status).json(response);
}

import { NextFunction, Request, Response } from "express";

export function errorHandler(
  error: Error,
  _request: Request,
  response: Response,
  _next: NextFunction
) {
  return response.status(400).json({ message: error.message });
}

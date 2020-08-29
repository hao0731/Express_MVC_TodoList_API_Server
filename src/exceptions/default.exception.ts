import { ErrorRequestHandler } from 'express';

export const DefaultException: ErrorRequestHandler = (err, req, res, next) => res.status(err.status).json(err);
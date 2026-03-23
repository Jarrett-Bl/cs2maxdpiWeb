import { Request, Response, NextFunction } from 'express';
import { allowedOrigins } from '../config/cors.js';

export function corsMiddleware(req: Request, res: Response, next: NextFunction) {
  const origin = req.headers.origin || '';

  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  }

  next();
}

export function corsPreflightHandler(req: Request, res: Response) {
  const origin = req.headers.origin || '';

  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.status(204).end();
    return;
  }

  console.warn(`Blocked CORS request from origin: ${origin}`);
  res.status(403).json({ error: 'Access denied' });
}


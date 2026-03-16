// src/app.ts
import express from 'express';
import router from './routes/mytable.js';
import {
  corsMiddleware,
  corsPreflightHandler,
} from './middleware/cors.middleware.js';
import { notFoundHandler } from './middleware/not-found.middleware.js';
import { errorHandler } from './middleware/error.middleware.js';

const app = express();

app.set('trust proxy', true);
app.use(express.json());

app.use(corsMiddleware);
app.options('*', corsPreflightHandler);

app.use('/api/mytable', router);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
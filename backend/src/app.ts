// src/app.ts
import express, { Request, Response, NextFunction } from 'express';
import mytableRouter from './routes/mytable.js';

const app = express();

const allowedOrigins = ['https://cs2maxdpi.com', 'http://localhost:3001'];

app.set('trust proxy', true);
app.use(express.json());

// CORS middleware
app.use((req: Request, res: Response, next: NextFunction) => {
    const origin = req.headers.origin || '';
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    }
    next();
});

app.options('*', (req: Request, res: Response) => {
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
});

// Routes
app.use('/api/mytable', mytableRouter);

// 404
app.use((_req: Request, res: Response) => {
    res.status(404).json({ error: 'Not Found' });
});

// Error handler
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error('Server Error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
});

export default app;
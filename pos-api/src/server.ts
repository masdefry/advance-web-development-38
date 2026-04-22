import express, { Express, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.route';
import { corsOptions } from './configs/cors.config';
import menusRouter from './routes/menus.route';
import categoriesRouter from './routes/categories.route';
import { log } from './utils/logger.util';
import transactionsRouter from './routes/transactions.route';

const app: Express = express();
app.use(express.json());

app.use(cors(corsOptions));

app.use(cookieParser());

app.use('/api/auth', authRouter);
app.use('/api/menus', menusRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/transactions', transactionsRouter);

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  const message = error?.expose ? error?.message : 'Something went wrong';
  const statusCode = error?.expose ? error?.statusCode : 500;

  log.error(`${req.method} ${req.url} - ${message}`, {
    statusCode,
    name: error.name,
    stack: error.stack,
    body: req.body,
    params: req.params,
    query: req.query,
    headers: req.headers,
  });

  res.status(statusCode).json({
    success: false,
    message,
    data: {},
  });
});

const port = 8002;
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

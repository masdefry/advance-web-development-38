import express, { Express, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.route';
import { corsOptions } from './configs/cors.config';
import menusRouter from './routes/menus.route';
import categoriesRouter from './routes/categories.route';

const app: Express = express();
app.use(express.json());

app.use(cors(corsOptions));

app.use(cookieParser());

app.use('/api/auth', authRouter);
app.use('/api/menus', menusRouter);
app.use('/api/categories', categoriesRouter);

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  console.log(error);
  res.status(error?.expose ? error?.statusCode : 500).json({
    success: false,
    message: error?.expose ? error?.message : 'Something went wrong',
    data: {},
  });
});

const port = 8001;
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

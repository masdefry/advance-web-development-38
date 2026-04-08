import express, { Express, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import authRouter from './routes/auth.route';

const app: Express = express();
app.use(express.json());
app.use(cors());

app.use('/api/auth', authRouter);

// Error Handler Exception 

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  res.status(error?.expose? error?.statusCode : 500).json({
    success: false,
    message: error?.expose? error?.message : 'Something went wrong',
    data: {},
  });
});

const port = 8000;
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

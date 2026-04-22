import { Router } from 'express';
import { transactionsController } from '../controllers/transactions.controller';
import { jwtVerify } from '../middlewares/jwt-verify.middleware';
import { JWT_TOKEN_SECRET_KEY } from '../configs/dotenv.config';

const transactionsRouter = Router();

transactionsRouter.post('/', jwtVerify(JWT_TOKEN_SECRET_KEY!), transactionsController.create);

export default transactionsRouter;

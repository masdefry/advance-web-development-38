import { Router } from 'express';
import { authController } from '../controllers/auth.controller';
import { jwtVerify } from '../middlewares/jwt-verify.middleware';
import { roleVerify } from '../middlewares/role-verify.middleware';
import { JWT_TOKEN_SECRET_KEY } from '../configs/dotenv.config';
import { authRegisterValidator } from '../validators/auth-register.validator';
import { expressRequestValidation } from '../middlewares/express-validation.middleware';

const authRouter = Router();

authRouter.post(
  '/register',
  jwtVerify(JWT_TOKEN_SECRET_KEY!),
  roleVerify(['SUPER_ADMIN']),
  authRegisterValidator, 
  expressRequestValidation, 
  authController?.register,
);
authRouter.post('/login', authController?.login);

export default authRouter;

import { Router } from 'express';
import { categoriesController } from '../controllers/categories.controller';

const categoriesRouter = Router();

categoriesRouter.get('/', categoriesController?.getAll);

export default categoriesRouter;
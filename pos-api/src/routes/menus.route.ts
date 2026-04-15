import { Router } from 'express';
import { menusController } from '../controllers/menus.controller';
import { uploader } from '../middlewares/uploader.middleware';

const menusRouter = Router();

menusRouter.get('/', menusController.getAll);
menusRouter.post(
  '/',
  uploader('src/uploads', 'IMG-MENU', ['jpg', 'png'], 'memory').array('menuImages', 3),
  menusController.create,
);
menusRouter.put('/', menusController.update);
menusRouter.delete('/', menusController.delete);

export default menusRouter;

import { Request, Response } from 'express';
import { menusService } from '../services/menus.service';

export const menusController = {
  getAll() {},
  async create(req: Request, res: Response) {
    let files: Express.Multer.File[] = [];
    const { name, price, categoryId } = req?.body;

    if (Array.isArray(req?.files)) {
      files = req?.files;
    } else {
      files = [];
    }

    await menusService?.create(files, { name, price, categoryId });

    res.status(201).json({
      success: true,
      message: 'Create menu successful',
      data: {
        name,
        price,
      },
    });
  },
  async update(req: Request, res: Response) {
    const { name, price, categoryId } = req?.body;
    const { productId } = req?.params;
    let files: Express.Multer.File[] = [];

    if (Array.isArray(req?.files)) {
      files = req?.files;
    } else {
      files = [];
    }

    await menusService?.update(
      files,
      { name, price, categoryId },
      productId as string,
    );

    res.status(200).json({
      success: true,
      message: `Update product with id = ${productId} successful`,
      data: {
        name,
        price,
        categoryId,
      },
    });
  },
  delete() {},
};

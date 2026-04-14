import { Product } from '../../generated/prisma/client';
import prisma from '../configs/prisma-client.config';

export const menusService = {
  async create(
    files: Express.Multer.File[],
    { name, price, categoryId }: Pick<Product, 'name' | 'price' | 'categoryId'>,
  ) {
    const createdProduct = await prisma.product.create({
      data: {
        name,
        price,
        categoryId,
      },
    });

    files?.forEach(async (file: any) => {
      await prisma.productImage.create({
        data: {
          url: file?.filename,
          productId: createdProduct?.id,
        },
      });
    });
  },
};

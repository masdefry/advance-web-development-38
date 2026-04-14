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

    console.log(createdProduct);

    /*
        [
            { url: 'IMG-MENU-1776158952381-61465898.jpg', productId: createdProduct?.id }, 
            { url: 'IMG-MENU-1776158952384-191494163.jpg', productId: createdProduct?.id }, 
        ]
    */
    console.log(files);
    await prisma.productImage.createMany;
  },
};

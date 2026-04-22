import { Product } from '../../generated/prisma/client';
import prisma from '../configs/prisma-client.config';
import redisConfig from '../configs/redis.config';
import { cloudinaryUpload } from '../utils/cloudinary.util';
const cacheKey = 'products:all';

export const menusService = {
  async create(
    files: Express.Multer.File[],
    { name, price, categoryId }: Pick<Product, 'name' | 'price' | 'categoryId'>,
  ) {
    await prisma.$transaction(async (tx) => {
      const createdProduct = await tx.product.create({
        data: {
          name,
          price,
          categoryId,
        },
      });

      // IF USING DISK STORAGE
      /*
      const productImageData = files?.map((file: Express.Multer.File) => {
        return { url: file?.filename, productId: createdProduct?.id };
      });
      */

      // IF USING CLOUDINARY STORAGE
      const cloudinaryUploaded = files?.map(
        async (file: Express.Multer.File) => {
          const { secureUrl } = await cloudinaryUpload(file?.buffer);
          return { url: secureUrl, productId: createdProduct?.id };
        },
      );

      const productImageData = await Promise.all(cloudinaryUploaded);

      await tx.productImage.createMany({
        data: productImageData,
      });
    });
  },
  async update(
    files: Express.Multer.File[],
    { name, price, categoryId }: Pick<Product, 'name' | 'price' | 'categoryId'>,
    productId: string,
  ) {
    await prisma.$transaction(async (tx) => {
      await tx.product.update({
        data: {
          name,
          price,
          categoryId,
        },
        where: {
          id: productId,
        },
      });

      const cloudinaryUploaded = files?.map(
        async (file: Express.Multer.File) => {
          const { secureUrl } = await cloudinaryUpload(file?.buffer);
          return { url: secureUrl, productId };
        },
      );

      const productImageData = await Promise.all(cloudinaryUploaded);

      tx.productImage.updateMany({
        data: productImageData,
        where: {
          productId,
        },
      });
    });
  },

  async getAll() {
    const cacheProducts = await redisConfig.get(cacheKey);
    if (cacheProducts) {
      const products = JSON.parse(cacheProducts);
      return products
    }

    const products = await prisma.product.findMany();

    await redisConfig.set(cacheKey, JSON.stringify(products));

    return products
  },
};

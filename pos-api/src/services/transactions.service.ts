import { addMinutes } from 'date-fns';
import { Transaction, TransactionDetail } from '../../generated/prisma/browser';
import prisma from '../configs/prisma-client.config';
import { Decimal } from '@prisma/client/runtime/index-browser';

export const transactionsService = {
  async create(
    {
      customerName,
      paymentMethod,
      transactionDetails,
    }: Pick<Transaction, 'customerName' | 'paymentMethod'> & {
      transactionDetails: Pick<TransactionDetail, 'productId' | 'quantity'>[];
    },
    userId: string,
  ) {
    const productIds = transactionDetails?.map((transactionDetail) => {
      return transactionDetail?.productId;
    });

    const findProductsByProductIds = await prisma.product.findMany({
      where: {
        id: {
          in: productIds,
        },
      },
    });

    let totalItem = transactionDetails?.length;
    let totalPrice = 0;

    let transactionDetailsToCreate = transactionDetails?.map(
      (transactionDetail) => {
        let totalPricePerProduct = 0;
        findProductsByProductIds.forEach((product) => {
          if (transactionDetail?.productId === product?.id) {
            totalPricePerProduct =
              transactionDetail?.quantity * Number(product?.price);
          }
        });

        totalPrice += totalPricePerProduct;

        return {
          productId: transactionDetail?.productId,
          quantity: transactionDetail?.quantity,
          totalPrice: new Decimal(totalPricePerProduct),
          transactionId: '',
        };
      },
    );

    const createdTransaction = await prisma.transaction.create({
      data: {
        customerName,
        paymentMethod,
        tax: 10,
        totalPrice,
        totalItem,
        cashierId: userId,
        expiredAt: addMinutes(new Date(), 10),
      },
    });

    transactionDetailsToCreate = transactionDetailsToCreate.map(
      (transactionDetail) => {
        return { ...transactionDetail, transactionId: createdTransaction.id };
      },
    );

    await prisma.transactionDetail.createMany({
      data: transactionDetailsToCreate,
    });

    return { totalItem, totalPrice };
  },
};

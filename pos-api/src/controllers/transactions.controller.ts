import { NextFunction, Request, Response } from 'express';
import { transactionsService } from '../services/transactions.service';

export const transactionsController = {
  async create(req: Request, res: Response, next: NextFunction) {
    const { customerName, paymentMethod, transactionDetails } = req.body;
    const { userId } = res.locals.payload;

    const { totalItem, totalPrice } = await transactionsService.create(
      { customerName, paymentMethod, transactionDetails },
      userId,
    );

    res.status(201).json({
      success: true,
      message: 'Create transaction successful',
      data: {
        customerName,
        paymentMethod,
        totalItem,
        totalPrice,
      },
    });
  },
};

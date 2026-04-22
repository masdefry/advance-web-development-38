import cron from 'node-cron';
import prisma from '../../configs/prisma-client.config';
import { log } from '../../utils/logger.util';

export function expiryTransactionsJob() {
  cron.schedule('* * * * *', async () => {
    const expiredTransactions = await prisma.transaction.updateMany({
      where: {
        status: 'WAITING_FOR_PAYMENT',
        expiredAt: {
          lt: new Date(),
        },
      },
      data: {
        status: 'CANCELLED',
      },
    });

    log.info(`[CRON] ${expiredTransactions.count} transactions is expired 💸`);
  });
}

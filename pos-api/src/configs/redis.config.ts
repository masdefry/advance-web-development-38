import IORedis from 'ioredis';
import { log } from '../utils/logger.util';
import { REDIS_DB, REDIS_HOST, REDIS_PASSWORD, REDIS_PORT } from './dotenv.config';

const redisConfig = new IORedis({
  host: REDIS_HOST,
  port: parseInt(REDIS_PORT),
  password: REDIS_PASSWORD,
  db: parseInt(REDIS_DB),
  // Optional: Reconnect strategy
  retryStrategy: (times) => Math.min(times * 50, 2000),
});

redisConfig.on('connect', () =>
  log.info('🔌[REDIS]: Connected to redis-server'),
);
redisConfig.on('error', (err) => log.info(`❌[REDIS]: ${err}`));

export default redisConfig;

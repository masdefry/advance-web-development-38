import { CORS_WHITELIST } from './dotenv.config';

export const corsOptions = {
  origin: function (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void,
  ) {
    console.log(origin);
    if (!CORS_WHITELIST?.includes(origin!)) {
      callback(new Error('Origin not allowed by CORS'));
    } else {
      callback(null, true);
    }
  },
  credentials: true,
};

import 'dotenv/config';

export const JWT_TOKEN_SECRET_KEY = process.env.JWT_SECRET_KEY_TOKEN;
export const CORS_WHITELIST = [
    process.env.WHITELIST01, 
    process.env.WHITELIST02
]
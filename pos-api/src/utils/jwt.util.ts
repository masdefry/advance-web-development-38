import jwt, { SignOptions } from 'jsonwebtoken'; 

export function createToken(
    payload: any, 
    secretKey: string, 
    options: SignOptions
){
    return jwt.sign(payload, secretKey, options);
}
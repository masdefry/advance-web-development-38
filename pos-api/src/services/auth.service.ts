import { User } from '../../generated/prisma/client';
import prisma from '../configs/prisma-client.config';
import bcrypt from 'bcrypt';
import { AppError } from '../utils/app-error.util';
import { createToken } from '../utils/jwt.util';
import transporter from '../configs/nodemailer.config';
import fs from 'fs';
import path from 'path';
import Handlebars from 'handlebars';
import { JWT_TOKEN_SECRET_KEY } from '../configs/dotenv.config';
import { mailService } from './mail.service';

const saltRounds = 10;

export const authService = {
  async register({
    firstName,
    lastName,
    email,
    password,
    role,
  }: Pick<User, 'firstName' | 'lastName' | 'email' | 'password' | 'role'>) {
    const findUserByEmail = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (findUserByEmail) throw AppError('Email already registered', 422);

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        role,
      },
    });

    await mailService?.sendMail(
      'reset-password.html',
      { firstName, lastName },
      email,
      'Welcome New Employee'
    );
  },
  async login({ email, password }: Pick<User, 'email' | 'password'>) {
    const findUserByEmail = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!findUserByEmail) throw AppError('Invalid credential account', 401);

    const isPasswordMatched = await bcrypt.compare(
      password,
      findUserByEmail?.password,
    );

    if (!isPasswordMatched) throw AppError('Invalid credential account', 401);

    const token = createToken(
      { userId: findUserByEmail?.id, role: findUserByEmail?.role },
      JWT_TOKEN_SECRET_KEY!,
      { expiresIn: '1d' },
    );

    return {
      firstName: findUserByEmail?.firstName,
      lastName: findUserByEmail?.lastName,
      token,
    };
  },
};

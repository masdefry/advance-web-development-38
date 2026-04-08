import { User } from '../../generated/prisma/client';
import prisma from '../configs/prisma-client.config';
import bcrypt from 'bcrypt';
import { AppError } from '../utils/app-error.util';

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

    if (findUserByEmail) throw AppError('Email already registered', 422)

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
  },
};

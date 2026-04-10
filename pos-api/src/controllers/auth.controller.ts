import { Request, Response } from 'express';
import { authService } from '../services/auth.service';

export const authController = {
  async register(req: Request, res: Response) {
    const { firstName, lastName, email, password, role } = req?.body;

    await authService?.register({ firstName, lastName, email, password, role });

    res.status(201).json({
      success: true,
      message: 'Register user account successfully created',
      data: {
        firstName,
        lastName,
        email,
        role,
      },
    });
  },
  async login(req: Request, res: Response) {
    const { email, password } = req?.body;

    const { firstName, lastName, token, role } = await authService?.login({
      email,
      password,
    });

    res.cookie('token', token, {
      httpOnly: true, 
      secure: true, 
      sameSite: 'lax', 
      path: '/'
    });

    res.status(200).json({
      success: true,
      message: 'User authentication successfully',
      data: {
        firstName,
        lastName,
        role
      },
    });
  },
};

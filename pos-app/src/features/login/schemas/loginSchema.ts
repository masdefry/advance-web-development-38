import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .required('Email is required')
    .email('Email format is invalid'),
  password: Yup.string()
    .required('Password is required')
    .min(5, 'Password have minimum 5 characters')
    .max(25, 'Password have maximum 25 characters'),
});

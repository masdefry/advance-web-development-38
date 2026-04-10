import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ryan.fandy@gmail.com',
    pass: 'qnniyjnfqncqkvwi', // The 16-character App Password
  },
});

export default transporter;

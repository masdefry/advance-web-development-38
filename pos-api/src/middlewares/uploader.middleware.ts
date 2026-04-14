import { Request } from 'express';
import multer, { FileFilterCallback } from 'multer';
import path from 'path';
import { cwd } from 'process';
import { AppError } from '../utils/app-error.util';

export function uploader(
  directory: string,
  customFileName: string,
  allowedFileTypes: string[],
) {
  const storage = multer.diskStorage({
    destination: function (_, __, cb) {
      const mainDir = path?.join(cwd());
      cb(null, `${mainDir}/${directory}`);
    },
    filename: function (_, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const extensionFile = file?.originalname?.split('.').slice(-1);

      cb(null, `${customFileName}-${uniqueSuffix}.${extensionFile}`);
    },
  });

  function fileFilter(
    req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback,
  ) {
    const extensionFile = file?.originalname?.split('.').pop();

    if (!extensionFile || !allowedFileTypes.includes(extensionFile)) {
      return cb(
        AppError(`File type ${file?.originalname} is not allowed`, 403),
      );
    }

    cb(null, true);
  }

  return multer({ storage, fileFilter });
}

import { Request } from 'express';
import { MulterFile } from '../middleware/upload';

declare global {
  namespace Express {
    interface Request {
      user?: any;
      file?: MulterFile;
    }
  }
}

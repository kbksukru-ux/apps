import type { Request, Response, NextFunction } from 'express';
import { v4 as uuid } from 'uuid';

declare module 'express-serve-static-core' {
  interface Request {
    traceId?: string;
    safetyDisclaimer?: string;
  }
}

const disclaimer =
  process.env.SAFE_RESPONSE_TEMPLATE ??
  'Olasılıksal görsel eşleşme. Tıbbi tavsiye değildir. Tüketmeden önce uzman görüşü alın.';

export const attachRequestContext = (req: Request, _res: Response, next: NextFunction) => {
  req.traceId = uuid();
  req.safetyDisclaimer = disclaimer;
  next();
};


import { Router } from 'express';
import type { Request, Response } from 'express';
import { z } from 'zod';
import { runIdentification } from '../services/identificationService.js';

export const identificationRouter = Router();

identificationRouter.post('/', async (req: Request, res: Response) => {
  if (!req.file?.buffer) {
    return res.status(400).json({
      errors: ['Fotoğraf bulunamadı'],
      meta: { safetyDisclaimer: req.safetyDisclaimer },
    });
  }

  const base64 = req.file.buffer.toString('base64');

  const hintSchema = z
    .object({
      lat: z.coerce.number().optional(),
      lng: z.coerce.number().optional(),
    })
    .optional();

  const hint = hintSchema.parse(req.body.geoHint ? JSON.parse(req.body.geoHint) : undefined);

  const result = await runIdentification(base64, hint);
  res.status(202).json({
    data: result,
    meta: {
      safetyDisclaimer: req.safetyDisclaimer,
      traceId: req.traceId,
    },
  });
});


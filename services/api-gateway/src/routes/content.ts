import { Router } from 'express';
import { z } from 'zod';
import { species, toxicity, survivalGuide } from '../data/index.js';

export const contentRouter = Router();

contentRouter.get('/species', (req, res) => {
  const schema = z.object({
    query: z.string().optional(),
    toxicity: z.enum(['non_toxic', 'caution', 'toxic', 'unknown']).optional(),
  });

  const params = schema.parse(req.query);
  let result = species;

  if (params.query) {
    const term = params.query.toLocaleLowerCase('tr');
    result = result.filter(
      (item: any) =>
        item.common_name.toLocaleLowerCase('tr').includes(term) ||
        item.latin_name.toLocaleLowerCase('tr').includes(term),
    );
  }

  if (params.toxicity) {
    result = result.filter((item: any) => item.toxicity === params.toxicity);
  }

  res.json({
    data: result.slice(0, 30),
    meta: { safetyDisclaimer: req.safetyDisclaimer, traceId: req.traceId },
  });
});

contentRouter.get('/species/:id', (req, res) => {
  const item = species.find((entry: any) => entry.id === req.params.id);
  if (!item) {
    return res.status(404).json({
      errors: ['Tür bulunamadı'],
      meta: { safetyDisclaimer: req.safetyDisclaimer },
    });
  }

  const tx = toxicity.find((t: any) => t.species_id === item.id);

  res.json({
    data: { ...item, toxicity: tx },
    meta: { safetyDisclaimer: req.safetyDisclaimer },
  });
});

contentRouter.get('/guides', (req, res) => {
  const schema = z.object({
    section: z.string().optional(),
    premium: z.string().optional(),
  });
  const params = schema.parse(req.query);
  const isPremium = params.premium === 'true';
  let result = survivalGuide;
  if (params.section) {
    result = result.filter((g: any) => g.section === params.section);
  }
  if (!isPremium) {
    result = result.filter((g: any) => g.is_premium === false);
  }
  res.json({
    data: result,
    meta: { safetyDisclaimer: req.safetyDisclaimer },
  });
});

contentRouter.get('/guides/offline-package', (_req, res) => {
  res.json({
    data: {
      updatedAt: new Date().toISOString(),
      guides: survivalGuide,
    },
    meta: { safetyDisclaimer: req.safetyDisclaimer },
  });
});


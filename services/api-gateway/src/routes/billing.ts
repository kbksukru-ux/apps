import { Router } from 'express';
import { z } from 'zod';

export const billingRouter = Router();

billingRouter.post('/stripe/webhook', (req, res) => {
  const signature = req.headers['stripe-signature'];
  if (!signature) {
    return res.status(400).json({ errors: ['Eksik imza'], meta: { safetyDisclaimer: req.safetyDisclaimer } });
  }
  // Burada gerçek Stripe doğrulaması yapılmalı
  res.json({ data: { ok: true }, meta: { safetyDisclaimer: req.safetyDisclaimer } });
});

billingRouter.post('/storekit/verify', (req, res) => {
  const schema = z.object({ receipt: z.string() });
  schema.parse(req.body);
  res.json({ data: { plan: 'premium', status: 'active' }, meta: { safetyDisclaimer: req.safetyDisclaimer } });
});

billingRouter.post('/play/verify', (req, res) => {
  const schema = z.object({ purchaseToken: z.string() });
  schema.parse(req.body);
  res.json({ data: { plan: 'premium', status: 'active' }, meta: { safetyDisclaimer: req.safetyDisclaimer } });
});


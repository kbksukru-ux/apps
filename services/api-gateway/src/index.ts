import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import multer from 'multer';
import pino from 'pino';

import { identificationRouter } from './routes/identifications.js';
import { contentRouter } from './routes/content.js';
import { mapRouter } from './routes/map.js';
import { chatRouter } from './routes/chat.js';
import { billingRouter } from './routes/billing.js';
import { attachRequestContext } from './middleware/context.js';

const app = express();
const upload = multer({ limits: { fileSize: 6 * 1024 * 1024 } }); // 6MB
const logger = pino({ transport: { target: 'pino-pretty' } });

app.use(cors());
app.use(express.json({ limit: '2mb' }));
app.use(attachRequestContext);

app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    meta: {
      safetyDisclaimer: process.env.SAFE_RESPONSE_TEMPLATE ?? defaultDisclaimer,
    },
  });
});

app.use('/identifications', upload.single('photo'), identificationRouter);
app.use('/content', contentRouter);
app.use('/map', mapRouter);
app.use('/chat', chatRouter);
app.use('/billing', billingRouter);

const port = process.env.PORT ?? 4000;
app.listen(port, () => {
  logger.info(`API Gateway listening on ${port}`);
});

const defaultDisclaimer =
  'Olasılıksal görsel eşleşme. Tıbbi tavsiye değildir. Tüketmeden önce uzman görüşü alın.';


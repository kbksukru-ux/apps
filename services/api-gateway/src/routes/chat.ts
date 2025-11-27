import { Router } from 'express';
import { z } from 'zod';
import { OpenAI } from 'openai';
import crypto from 'node:crypto';

const router = Router();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const guardrails = [
  'Tıbbi tavsiye verme.',
  'Tüketim onayı verme.',
  'Her yanıtta uzman doğrulaması öner.',
];

router.post('/session', (_req, res) => {
  res.json({
    data: {
      sessionId: crypto.randomUUID(),
      systemPrompt: guardrails,
    },
    meta: { safetyDisclaimer: _req.safetyDisclaimer },
  });
});

router.post('/:sessionId/message', async (req, res) => {
  const schema = z.object({
    message: z.string().min(4),
    history: z
      .array(
        z.object({
          role: z.enum(['user', 'assistant']),
          content: z.string(),
        }),
      )
      .default([]),
  });

  const body = schema.parse(req.body);
  const safeResponse = await generateSafeResponse(body.history, body.message);

  res.json({
    data: safeResponse,
    meta: { safetyDisclaimer: req.safetyDisclaimer },
  });
});

export const chatRouter = router;

async function generateSafeResponse(history: { role: 'user' | 'assistant'; content: string }[], message: string) {
  const safetyPrefix =
    'Aşağıdaki taleplere yalnızca güvenlik ve eğitim amaçlı tavsiyelerle cevap ver. ' +
    'Kesin teşhis, tıbbi öneri veya tüketim onayı verme. Kullanıcıyı uzmanlara yönlendir.';

  const formattedHistory = history.map((entry) => ({
    role: entry.role,
    content: entry.content,
  }));

  const response = await openai.responses.create({
    model: 'gpt-4o-mini',
    input: [
      {
        role: 'system',
        content: `${safetyPrefix}\n${guardrails.join('\n')}`,
      },
      ...formattedHistory,
      {
        role: 'user',
        content: message,
      },
    ],
    temperature: 0.3,
  });

  const text = response.output?.[0]?.content?.[0]?.text ?? 'Şu an yanıt veremiyorum.';
  return {
    reply: `${text}\n\nUnutma: Bu bilgi tıbbi tavsiye değildir.`,
  };
}


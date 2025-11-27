import axios from 'axios';
import FormData from 'form-data';
import { z } from 'zod';
import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const plantNetBase = 'https://api.plantnet.org/v2/identify/all';

const candidateSchema = z.object({
  latinName: z.string(),
  commonName: z.string().optional(),
  score: z.number().min(0).max(1),
  notableTraits: z.string().optional(),
});

export type Candidate = z.infer<typeof candidateSchema>;

export async function runIdentification(imageBase64: string, geoHint?: { lat: number; lng: number }) {
  const [vision, plantNet] = await Promise.allSettled([
    callOpenAi(imageBase64, geoHint),
    callPlantNet(imageBase64),
  ]);

  const openAiCandidates = vision.status === 'fulfilled' ? vision.value : [];
  const plantNetCandidates = plantNet.status === 'fulfilled' ? plantNet.value : [];

  const merged = mergeCandidates(openAiCandidates, plantNetCandidates).slice(0, 3);
  const disclaimer =
    'Bu sonuç görsel benzerlik ihtimalidir. Kesin teşhis değildir. Tüketmeden önce uzman doğrulaması alın.';

  return { candidates: merged, disclaimer, disableRecipes: merged.some((m) => m.toxicity !== 'non_toxic') };
}

async function callOpenAi(imageBase64: string, geoHint?: { lat: number; lng: number }): Promise<AugmentedCandidate[]> {
  if (!process.env.OPENAI_API_KEY) {
    return [];
  }

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content:
            'Sen Türkçe konuşan botanik uzmanısın. Fotoğrafta görülen türleri olasılık yüzdesiyle belirt; kesin teşhis yapma, tüketim önerme. Sadece JSON array döndür.',
        },
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: `Fotoğrafı analiz et. Konum ipucu: ${geoHint?.lat ?? 'bilinmiyor'}, ${
                geoHint?.lng ?? 'bilinmiyor'
              }. JSON formatı: [{"latinName":"","commonName":"","score":0-1,"toxicity":"unknown|non_toxic|caution|toxic","notes":""}]`,
            },
            {
              type: 'image_url',
              image_url: {
                url: `data:image/jpeg;base64,${imageBase64}`,
              },
            },
          ],
        },
      ],
      temperature: 0.1,
      max_tokens: 1000,
    });

    const text = response.choices[0]?.message?.content ?? '[]';
    // JSON'u temizle (eğer markdown code block içindeyse)
    const cleaned = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    const parsed = JSON.parse(cleaned) as OAIResponse[];
    return parsed.map((item) => ({
      latinName: item.latinName || 'Bilinmeyen',
      commonName: item.commonName,
      score: clamp(item.score ?? 0.3),
      toxicity: item.toxicity ?? 'unknown',
      source: 'openai',
    }));
  } catch (error: any) {
    console.error('OpenAI API error:', error.message);
    return [];
  }
}

async function callPlantNet(imageBase64: string): Promise<AugmentedCandidate[]> {
  if (!process.env.PLANTNET_API_KEY) {
    return [];
  }

  const form = new FormData();
  form.append('images', Buffer.from(imageBase64, 'base64'), {
    filename: 'photo.jpg',
    contentType: 'image/jpeg',
  });
  form.append('organs', 'leaf');

  const { data } = await axios.post(plantNetBase, form, {
    params: { 'api-key': process.env.PLANTNET_API_KEY },
    headers: form.getHeaders?.(),
  });

  return (data?.results ?? []).slice(0, 5).map((item: any) => ({
    latinName: item.species?.scientificNameWithoutAuthor ?? 'Bilinmeyen',
    commonName: item.species?.commonNames?.[0],
    score: clamp(item.score ?? 0.2),
    toxicity: 'unknown',
    source: 'plantnet',
  }));
}

type Source = 'openai' | 'plantnet';

type AugmentedCandidate = Candidate & {
  toxicity?: 'non_toxic' | 'caution' | 'toxic' | 'unknown';
  source: Source;
};

type OAIResponse = Candidate & {
  toxicity?: AugmentedCandidate['toxicity'];
};

function mergeCandidates(a: AugmentedCandidate[], b: AugmentedCandidate[]) {
  const map = new Map<string, AugmentedCandidate & { score: number }>();
  const weight = { openai: 0.6, plantnet: 0.4 };

  for (const candidate of [...a, ...b]) {
    const key = candidate.latinName.toLowerCase();
    const existing = map.get(key);
    const weightedScore = candidate.score * weight[candidate.source];
    if (!existing) {
      map.set(key, { ...candidate, score: weightedScore });
    } else {
      existing.score = clamp(existing.score + weightedScore);
      existing.commonName = existing.commonName ?? candidate.commonName;
      existing.toxicity = existing.toxicity === 'unknown' ? candidate.toxicity : existing.toxicity;
    }
  }

  return Array.from(map.values()).sort((x, y) => y.score - x.score);
}

const clamp = (value: number) => Math.max(0, Math.min(1, value));


import { useMutation } from '@tanstack/react-query';
import api from '@/lib/api';
import { cacheIdentification } from '@/lib/offline';
import { useIdentificationStore } from '@/store/identificationStore';

type Params = {
  file: Blob;
  geo?: { lat: number; lng: number };
};

export function useIdentify() {
  const addResult = useIdentificationStore((s) => s.addResult);
  return useMutation({
    mutationFn: async ({ file, geo }: Params) => {
      // MOCK DATA FOR DEMO - Generates different results for different photos
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate network delay

      // Create a simple hash from file size and type to generate varied results
      const fileHash = (file.size + file.type.length) % 5;

      const mockDatabase = [
        {
          matches: [
            {
              latinName: 'Amanita muscaria',
              commonName: 'Sinek Mantarı',
              probability: 0.95,
              description: 'Zehirli ve halüsinojenik bir mantar türüdür. Kırmızı şapkası ve beyaz benekleri ile tanınır.',
              images: ['https://upload.wikimedia.org/wikipedia/commons/3/32/Amanita_muscaria_3_vliegenzwammen_op_rij.jpg'],
              toxicity: 'toxic' as const,
            },
            {
              latinName: 'Amanita pantherina',
              commonName: 'Panter Mantarı',
              probability: 0.05,
              description: 'Çok zehirli bir mantar türüdür.',
              images: [],
              toxicity: 'toxic' as const,
            }
          ],
          disableRecipes: true,
        },
        {
          matches: [
            {
              latinName: 'Boletus edulis',
              commonName: 'Çörek Mantarı',
              probability: 0.92,
              description: 'Lezzetli ve yenen bir mantar türüdür. Kahverengi şapkası ve kalın sapı ile tanınır.',
              images: ['https://upload.wikimedia.org/wikipedia/commons/b/b0/Boletus_edulis_EtgHolzmoegerle.jpg'],
              toxicity: 'non_toxic' as const,
            },
            {
              latinName: 'Boletus aereus',
              commonName: 'Bronz Mantar',
              probability: 0.08,
              description: 'Yenilebilir, lezzetli bir mantar türüdür.',
              images: [],
              toxicity: 'non_toxic' as const,
            }
          ],
          disableRecipes: false,
        },
        {
          matches: [
            {
              latinName: 'Cantharellus cibarius',
              commonName: 'Sarı Chanterelle',
              probability: 0.88,
              description: 'Yenilebilir, aromalı bir mantar türüdür. Sarı-turuncu rengi ile tanınır.',
              images: [],
              toxicity: 'non_toxic' as const,
            },
            {
              latinName: 'Cantharellus lutescens',
              commonName: 'Sarımtrak Chanterelle',
              probability: 0.12,
              description: 'Yenilebilir bir mantar türüdür.',
              images: [],
              toxicity: 'non_toxic' as const,
            }
          ],
          disableRecipes: false,
        },
        {
          matches: [
            {
              latinName: 'Lactarius deliciosus',
              commonName: 'Çıntar Mantarı',
              probability: 0.90,
              description: 'Yenilebilir, lezzetli bir mantar türüdür. Turuncu rengi ve süt salgılaması ile tanınır.',
              images: [],
              toxicity: 'non_toxic' as const,
            },
            {
              latinName: 'Lactarius sanguifluus',
              commonName: 'Kanlı Çıntar',
              probability: 0.10,
              description: 'Yenilebilir bir mantar türüdür.',
              images: [],
              toxicity: 'non_toxic' as const,
            }
          ],
          disableRecipes: false,
        },
        {
          matches: [
            {
              latinName: 'Morchella esculenta',
              commonName: 'Kuzu Göbeği Mantarı',
              probability: 0.85,
              description: 'Çok değerli, yenilebilir bir mantar türüdür. Petek görünümlü şapkası ile tanınır.',
              images: [],
              toxicity: 'caution' as const,
            },
            {
              latinName: 'Morchella conica',
              commonName: 'Konik Kuzu Göbeği',
              probability: 0.15,
              description: 'Yenilebilir ama çiğ tüketilmemeli.',
              images: [],
              toxicity: 'caution' as const,
            }
          ],
          disableRecipes: false,
        }
      ];

      const selectedData = mockDatabase[fileHash];

      const payload = {
        id: crypto.randomUUID(),
        matches: selectedData.matches,
        disclaimer: 'Bu sonuçlar yapay zeka tarafından üretilmiştir. Kesin bilgi için uzmana danışın.',
        createdAt: new Date().toISOString(),
        disableRecipes: selectedData.disableRecipes,
      };

      addResult(payload);
      await cacheIdentification(payload.id, payload);
      return payload;
    },
  });
}

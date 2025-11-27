import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  tr: {
    translation: {
      disclaimer: 'Olasılıksal görsel eşleşme. Tıbbi tavsiye değildir.',
      identify: 'Tanımla',
      guide: 'Rehber',
      map: 'Harita',
      assistant: 'Asistan',
      upload_cta: 'Fotoğraf yükle veya çek',
      toxicity_safe: 'Genelde güvenli',
      toxicity_caution: 'Dikkat',
      toxicity_toxic: 'Zehirli',
      ai_prompt_placeholder: '“Bu bölgede çam var, ne toplayabilirim?”',
      safety_notice: 'Bu sonuç kesin teşhis değildir. Uzman görüşü alın.',
    },
  },
};

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    compatibilityJSON: 'v3',
    lng: 'tr',
    fallbackLng: 'tr',
    resources,
  });
}

export default i18n;


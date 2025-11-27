## Güvenlik Katmanı

### İlkeler

1. **Kesin teşhis yok**: Dil modeli istemleri “olasılıksal” kelimesini içermek zorunda.
2. **Toksisite zinciri**: tür → benzer tür → tarif engeli.
3. **AI Yanıt Politikası**: her cümlede uzman tavsiyesine yönlendirme.

### Backend Uygulamaları

- `identificationService.ts`: OpenAI çıktısı `score` < 0.4 ise “Belirsiz” olarak işaretlenir.
- `runIdentification` geri dönüşü `disableRecipes` bayrağı ile UI’ı kilitler.
- `chatRouter`: Sistem promptu + guardrails + "Tıbbi tavsiye verme" mesajı.
- `billingRouter`: Tarifler yalnızca `plan=premium` ve `disableRecipes=false`.

### İstemci Uygulamaları

- `SafetyNotice` bileşeni her sekmede kullanılır.
- Tarif paneli toksik türlerde otomatik kilitlenir.
- Harita marker formu (gelecek sprint) tehlike türlerinde farklı renk.

### Regülasyon

- App Store Connect “Health & Fitness > Safety” sorularına “evet, tıbbi tavsiye vermez” olarak cevaplanacak.
- Google Play “Dangerous Products” politikası için toksik içerik uyarısı ekran görüntüsü.


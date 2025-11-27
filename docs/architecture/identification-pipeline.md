## Tanımlama Pipeline’ı

1. **Ön İşleme (İstemci)**
   - Kamera sonucu 1024px genişliğe ölçeklenir, EXIF konumu (kullanıcı izniyle) eklenir.
   - `safetyHash = sha256(imageBytes)` hesaplanır; tekrar eden yüklemeler cache edilir.
   - Fotoğraf, `multipart/form-data` ile `/identifications`.

2. **API Katmanı**
   - Dosya Supabase Storage’a `identifications/{userId}/{uuid}.jpg` olarak yüklenir.
   - `identifications` tablosunda kayıt oluşturulur (`workflow_state = 'queued'`).
   - BullMQ kuyruğuna iş: `{id, storagePath, geoTag}`.

3. **Worker**
   - Storage’dan dosya indir, `sharp` ile normalize et.
   - **OpenAI Vision** çağrısı: `gpt-4o-mini` + özel prompt (Türkçe).
   - **PlantNet API** çağrısı: `organs=leaf,flower` vb. meta.
   - Skorlar min-max normalize edilir, `ensembleScore = (w1 * openai + w2 * plantnet)` (w1=0.6, w2=0.4).
   - İlk 3 tür seçilir; `confidence < 0.4` ise `fallback = 'Belirsiz'`.
   - `toxicity` tablosundan birincil türün bayrakları çekilir.
   - `disableRecipes = toxicity in ('toxic','caution') OR has_toxic_lookalikes`.
   - Sonuç `identifications.inference` alanına yazılır, `workflow_state='completed'`.
   - SSE/WebSocket üzerinden istemciye push edilir.

4. **İstemci Gösterimi**
   - `ResultCard` üstünde:
     - Tür adı + yüzde.
     - Renk kodlu toksisite çipi.
     - “Bu olasılıksal bir görsel benzerlik sonucudur, kesin teşhis değildir.” ibaresi.
   - Tarif bileşeni `disableRecipes === false` ve `confidence >= 0.7` ise görünür.

5. **Günlükleme & İzleme**
   - Başarısız işler `workflow_state='failed'`, `error_payload`.
   - Honeycomb span’i: `identify.photo`.
   - Oran sınırlama: kullanıcı başına saatte 20 iş.

### Güvenlik Şablonları

**OpenAI Prompt Örneği**

```
Sen uzman botanikçisin. Yalnızca olasılıksal eşleşme yüzdesi ver.
Kesin teşhis yapma, tüketim önerme.
Fotoğrafı analiz et ve aşağıdaki JSON'u döndür:
{
  "language": "tr",
  "candidates": [
     {"latinName": "...", "commonName": "...", "score": 0-1, "notableTraits": "..."}
  ],
  "warnings": ["..."]
}
```

**PlantNet Çağrısı**

`POST https://my-api.plantnet.org/v2/identify/all?api-key=...`

### Offline Destek

- Son 5 sonuç cihazda şifrelenmiş SQLite’ta saklanır (`expo-sqlite/next`).
- Kullanıcı bağlantısızken yeni foto çekerse, iş kuyruğa alınır ve bağlantı gelince otomatik gönderilir.


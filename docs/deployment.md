## Dağıtım Adımları

### 1. Altyapı

1. `infra/docker/docker-compose.yml` ile PostgreSQL + Redis’i yerelde doğrulayın.
2. Prod için Supabase projesi açın, `docs/architecture/database.sql` şemasını çalıştırın.
3. Redis (Upstash veya Elasticache), S3 uyumlu Storage (Supabase) hazırlayın.

### 2. Backend (API Gateway)

```bash
cd services/api-gateway
cp .env.example .env
npm install
npm run build
npm run start
```

- Docker imajı:
  ```bash
  docker build -t terraguard/api .
  docker run --env-file .env -p 4000:4000 terraguard/api
  ```
- AWS ECS/Fargate tavsiye edilir; `PORT=4000`.
- CloudFront + API Gateway üzerinden WAF ile yayın.

### 3. Worker (Tanımlama Kuyruğu)

- Aynı repo içinde `worker-identify` klasörü eklenebilir (örn. BullMQ consumer).
- `OPENAI_API_KEY` ve `PLANTNET_API_KEY` zorunlu.
- GPU gerekmez; CPU yeterli, fakat yüksek hacimde serverless GPU (Modal, Replicate) tercih edilebilir.

### 4. Mobil/Web Uygulaması

```bash
cd apps/guardian-app
cp .env.example .env
npm install
npm run start
```

- **iOS**: `eas build -p ios --profile production`
- **Android**: `eas build -p android --profile production`
- **Web**: `npx expo export --platform web` çıktısını CloudFront/S3’e koyun.
- Apple/Google mağazalarında “This is a probabilistic match…” metni ekran görüntülerine eklenmeli.

### 5. Ödeme Entegrasyonu

- Stripe Dashboard’da ürünleri oluşturun (`premium-monthly`, `premium-yearly`).
- Webhooks → `/billing/stripe/webhook`.
- Apple ve Google içi doğrulama endpoint’leri `.env` anahtarlarıyla korunur.

### 6. Harita & Offline Paket

- MapTiler veya MapLibre Studio’dan `.mbtiles` paketleri oluşturup `cdn.terraguard.app`’e yükleyin.
- `map/offline-tiles` uç noktasındaki `downloadUrl` değerini güncelleyin.

### 7. Güvenlik Kontrolleri

- Tüm ekranlarda `SafetyNotice` bileşeni. QA sırasında zorunlu.
- Backend rate limit (kullanıcı başına 20 foto/saat) eklenmeli.
- Pen test sonuçlarını Store incelemelerine ekleyin.


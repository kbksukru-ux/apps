## TerraGuard Botanica - Mimari Özeti

### Amaç
Bitki/mantar fotoğraflarını olasılıksal olarak eşleyen, toksisite ve güvenlik uyarılarıyla zenginleştiren, hayatta kalma rehberi ve harita araçları sunan, Türkçe konuşan çoklu platform uygulaması.

### Yüksek Seviye Bileşenler

1. **Guardian App (Expo/React Native + Web)**
   - Kamera & galeri yükleme, çevrimdışı veri önbelleği.
   - Harita (MapLibre GL), survival guide, AI chat.
   - Premium kontrolü, Stripe/StoreKit/Play Billing hook’ları.

2. **API Gateway (Node.js + Express/Fastify)**
   - REST/WS API’leri, JWT doğrulama (Supabase Auth).
   - Tür verisi, toksisite, survival içerik servisleri.
   - Stripe webhooks, abonelik durumu, harita marker CRUD.

3. **Worker Identify Service**
   - BullMQ kuyruğu.
   - OpenAI Vision + PlantNet API ensemblle.
   - Güven skoru normalizasyonu, toksisite bayrakları.

4. **Veri Katmanı**
   - PostgreSQL (Supabase): `species`, `toxicity_categories`, `guides`, `user_markers`, `identifications`, `subscriptions`.
   - Supabase Storage: foto önbellekleri.
   - Redis: oran sınırlama, kuyruk.
   - Cihaz içi SQLite/Hive: offline survival + marker cache.

5. **Harita & Offline**
   - MapLibre + MapTiler tiles.
   - Offline paket indiricisi (premium).
   - KMeans bazlı kümelendirme (Turf.js).

### Veri Akışı

1. Kullanıcı foto çeker → App `POST /identifications` → API dosyayı Storage’a koyar → Worker kuyruğa işler → Sonuçlar SSE/WebSocket ile döner → App olasılık + uyarılar gösterir, tarif modülü durumuna göre gizlenir.
2. Survival içerikleri ilk premium açılışında `guides` tablosundan çekilir ve SQLite’a yazılır; offline modda bu veri kullanılır.
3. Harita marker’ları çevrimiçi olduğunda `user_markers` tablosu ile senkron, offline modda lokal kuyruğa yazılıp bağlantı gelince gönderilir.

### Güvenlik Katmanları

- `safety_disclaimer` bileşeni her ekranda.
- AI yanıtları `safetyResponseGuard()` ile toksik içerik kontrolünden geçer.
- Tarifler sadece `toxicity_level = 'non_toxic'` ve `confidence >= 0.7` olduğunda gösterilir.
- Policy enforcement backend’de de tekrar doğrulanır.

### Ölçeklenebilirlik

- API ve Worker ayrı konteynerler; Docker Compose yerelde, ECS/Fargate prod’da.
- Postgres read replica planı.
- CDN (CloudFront) üzerinden asset dağıtımı.

### İzleme

- OpenTelemetry + Honeycomb.
- Sentry (app + backend) hataları.
- Stripe webhook’ları için idempotency tabloları.


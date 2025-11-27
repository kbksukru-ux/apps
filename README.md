# TerraGuard Botanica

Türkçe, çapraz platform (iOS, Android, Web) çalışan yapay zekâ destekli bitki ve mantar tanımlama uygulaması. Uygulama, olasılıksal sınıflandırma yaklaşımı, toksisite uyarıları, hayatta kalma rehberi ve premium özelliklerle güvenli kullanım sağlar.

## Ana Modüller

- **Foto Tanıma**: OpenAI Vision + PlantNet entegrasyonu ile olasılıklı tür tahmini (ilk 3 tür, güven skorları, açıklamalar). Zorunlu uyarılar ve toksisiteye göre otomatik tarif engeli.
- **Bilgi Bankası**: PostgreSQL/Supabase’de tutulan tür verisi, toksisite kategorileri, kullanım notları, benzer türler.
- **Survival Guide**: Çevrimdışı erişilebilen hayatta kalma içerikleri (premium).
- **Harita**: GPS tabanlı işaretleme, gözlem kümeleri, premium çevrimdışı harita.
- **AI Asistanı**: Güvenli yanıt politikası, tüketim tavsiyesi yok. Türkçe doğal dil.
- **Monetizasyon**: Ücretsiz ve Premium katmanlar; Stripe, Google Play Billing, Apple IAP entegrasyon planı.

## Teknoloji Yığını

| Katman            | Teknoloji                                                                 |
| ----------------- | ------------------------------------------------------------------------- |
| Mobil/Web Uygulama| Expo (React Native + Web), TypeScript, Zustand, React Query                |
| Backend API       | Node.js (Express + Fastify hybrid), TypeScript, Prisma ORM, PostgreSQL     |
| AI & Kuyruk       | OpenAI Vision, PlantNet API, BullMQ/Redis                                   |
| Depolama          | Supabase (Postgres + Storage), Redis, SQLite (cihaz içi)                   |
| Harita            | MapLibre GL + offline paketler, Turf.js                                   |
| Auth              | Supabase Auth + OAuth (Google, Apple)                                     |

## Klasör Düzeni

```
apps/
  guardian-app/        # Expo tabanlı mobil/web istemcisi
services/
  api-gateway/         # REST + WebSocket backend
  worker-identify/     # Görsel işleme kuyruğu
  docs-gen/            # (Opsiyonel) içerik pipeline
data/
  seed/                # Tür verisi, toksisite, survival rehberi JSON'ları
docs/
  architecture/        # Diyagramlar, şema, API sözleşmeleri
infra/
  docker/              # Docker Compose, DB, Redis
  terraform/           # (Taslak) bulut kaynakları
```

## Hızlı Başlangıç

1. **Ortam Değişkenleri**: `.env` dosyalarını `services/api-gateway/.env.example` ve `apps/guardian-app/.env` örneklerinden türetin.
2. **Bağımlılıklar**:
   ```bash
   corepack enable
   pnpm install
   cd apps/guardian-app && pnpm install
   cd ../../services/api-gateway && pnpm install
   ```
3. **Geliştirme**:
   ```bash
   cd infra/docker
   docker compose up -d
   cd ../../services/api-gateway && pnpm dev
   cd ../../apps/guardian-app && pnpm expo start --tunnel
   ```
4. **Test**:
   ```bash
   pnpm test
   ```

## Güvenlik ve Uyumluluk

- Her ekranda “Olasılıksal görsel eşleşme. Tıbbi tavsiye değildir.” ibaresi.
- Toksik veya belirsiz türlerde tarifler otomatik olarak gizlenir.
- AI asistanı doğrulanmamış tüketim önerisi vermez, kullanıcıyı uzman görüşüne yönlendirir.

## Lisans

Proje örnek amaçlıdır; dağıtım öncesi içerik lisansları ve API anahtarları doğrulanmalıdır.


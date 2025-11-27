## API Yüzeyleri

Tüm uç noktalar `https://api.terraguard.app/v1` altında ve `Authorization: Bearer <jwt>` başlığı ile çağrılır. Yanıtlarda `safetyDisclaimer` alanı zorunludur.

### Kimlik Doğrulama

| Yöntem | Yol | Açıklama |
| ------ | --- | -------- |
| POST | `/auth/exchange` | Supabase oturumunu backend JWT’sine çevirir. |
| GET | `/auth/profile` | Kullanıcı profilini döner. |

### Tür & İçerik

| Metot | Yol | Açıklama |
| ----- | --- | -------- |
| GET | `/species?query=&toxicity=` | İsim/autocomplete, toksisite filtresi. |
| GET | `/species/{id}` | Tür ayrıntıları, benzer türler, toksisite bilgisi. |
| GET | `/guides?section=` | Survival guide listesi (premium filtresi). |
| GET | `/guides/offline-package` | Çevrimdışı JSON paketini döner (premium). |

### Foto Tanımlama

| Metot | Yol | Açıklama |
| ----- | --- | -------- |
| POST | `/identifications` | Foto yükler → `202 Accepted` + `jobId`. |
| GET | `/identifications/{id}` | Sonuç JSON: `{topMatches: [{speciesId, confidence}], disclaimer}` |
| WS | `/identifications/stream` | Canlı sonuç push’u. |

### Harita & Marker

| Metot | Yol | Açıklama |
| ----- | --- | -------- |
| GET | `/map/markers?bbox=` | BBOX içindeki marker ve kümeler. |
| POST | `/map/markers` | Marker oluşturur (premium su kaynakları paylaşımı). |
| GET | `/map/offline-tiles?region=` | Offline paket meta, premium. |

### AI Asistan

| Metot | Yol | Açıklama |
| ----- | --- | -------- |
| POST | `/chat/session` | Yeni oturum, güvenli prompt ile. |
| POST | `/chat/{sessionId}/message` | Kullanıcı mesajı, `safeResponse` döner. |
| GET | `/chat/{sessionId}` | Mesaj geçmişi. |

### Monetizasyon

| Metot | Yol | Açıklama |
| ----- | --- | -------- |
| POST | `/billing/stripe/webhook` | Stripe olay doğrulaması. |
| POST | `/billing/storekit/verify` | Apple makbuz doğrulama. |
| POST | `/billing/play/verify` | Google satın alma doğrulama. |

### Yanıt Şablonu

```
{
  "data": {...},
  "meta": {
    "safetyDisclaimer": "Olasılıksal görsel eşleşme. Tıbbi tavsiye değildir.",
    "traceId": "..."
  },
  "errors": []
}
```


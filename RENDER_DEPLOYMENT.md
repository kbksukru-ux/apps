# TerraGuard Botanica API - Render Deployment

Bu dosya, TerraGuard Botanica API'sini Render.com'a deploy etmek için gerekli bilgileri içerir.

## Hızlı Başlangıç

### 1. Render Hesabı Oluştur
- https://render.com adresine git
- GitHub hesabınla giriş yap (ücretsiz)

### 2. Blueprint Kullanarak Deploy Et

1. Render Dashboard'da "New +" butonuna tıkla
2. "Blueprint" seçeneğini seç
3. Bu repository'yi seç (GitHub bağlantısı gerekir)
4. `render.yaml` dosyası otomatik algılanacak
5. Environment variables'ları ayarla (aşağıda detaylar var)
6. "Apply" butonuna tıkla

### 3. Environment Variables

Render Dashboard'da aşağıdaki environment variables'ları ayarlaman gerekiyor:

```
SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
OPENAI_API_KEY=your_openai_api_key
REDIS_URL=your_redis_url (opsiyonel, eğer queue kullanıyorsanız)
STRIPE_SECRET_KEY=your_stripe_secret_key (opsiyonel, ödeme sistemi için)
```

**Not:** Bu değerleri `services/api-gateway/.env` dosyanızdan alabilirsiniz.

### 4. Deploy URL'ini Al

Deploy tamamlandıktan sonra Render size bir URL<br/> verecek:
```
https://terraguard-api.onrender.com
```

Bu URL'i mobil uygulamanızda kullanın.

## Manuel Deploy (Alternatif)

Eğer Blueprint kullanmak istemezseniz:

1. New Web Service oluştur
2. Repository'yi bağla
3. Build Command: `cd services/api-gateway && npm install && npm run build`
4. Start Command: `cd services/api-gateway && npm start`
5. Environment Variables'ları ekle
6. Deploy

## Sorun Giderme

### Build Hatası
- `package.json` ve `tsconfig.json` dosyalarının doğru olduğundan emin ol
- Environment variables'ların ayarlandığından emin ol

### Runtime Hatası
- Logs sekmesinden hata mesajlarını kontrol et
- Health endpoint'i kontrol et: `https://your-app.onrender.com/health`

### Performance
- Ücretsiz tier 15 dakika inaktivite sonrası uyur
- İlk istek biraz yavaş olabilir (cold start)
- Sürekli aktif kalmak için paid plan'e geç

## Not

Ücretsiz tier sınırlamaları:
- 750 saat/ay çalışma süresi
- 512 MB RAM
- İnaktivite sonrası uyuma
- Shared CPU

Production kullanım için paid plan önerilir.

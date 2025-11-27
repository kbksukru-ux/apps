---
description: Web uygulamasını Vercel'e deploy etme
---

# Web Deployment (Vercel)

Bu workflow, Guardian App'i Vercel'e deploy etmek için gerekli adımları içerir.

## Ön Gereksinimler

1. Vercel hesabı (ücretsiz): https://vercel.com/signup
2. Backend API'nin deploy edilmiş olması ve URL'inin hazır olması

## Adımlar

### 1. Vercel CLI Kurulumu

```bash
npm install -g vercel
```

### 2. Vercel'e Giriş Yapın

```bash
vercel login
```

### 3. Backend URL'ini Güncelleyin

`apps/guardian-app/.env` dosyasında `EXPO_PUBLIC_API_BASE_URL` değerini production backend URL'iniz ile güncelleyin:

```
EXPO_PUBLIC_API_BASE_URL=https://your-backend-url.com
```

### 4. Web Build Alın

```bash
cd apps/guardian-app
npx expo export -p web
```

### 5. Vercel'e Deploy Edin

```bash
cd dist
vercel --prod
```

İlk deploy'da size birkaç soru soracak:
- **Set up and deploy?** → Yes
- **Which scope?** → Kendi hesabınızı seçin
- **Link to existing project?** → No
- **Project name?** → terraguard-botanica (veya istediğiniz isim)
- **Directory?** → ./ (mevcut dizin)

### 6. Deploy Tamamlandı!

Vercel size bir URL verecek (örn: `https://terraguard-botanica.vercel.app`)

## Güncelleme Yapmak İçin

Her değişiklikten sonra:

```bash
cd apps/guardian-app
npx expo export -p web
cd dist
vercel --prod
```

## Notlar

- Her deploy otomatik olarak HTTPS ile gelir
- Custom domain eklemek için Vercel dashboard'unu kullanabilirsiniz
- Environment variables'ı Vercel dashboard'dan da yönetebilirsiniz

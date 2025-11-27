# 🚀 TerraGuard Botanica - Deployment Rehberi

Bu uygulama hem **web** hem de **mobil** (Android & iOS) platformlarda çalışabilir.

## 📱 Şu Anda Neler Çalışıyor?

✅ **Web Uygulaması**: `http://localhost:8081` adresinde çalışıyor  
✅ **Mobil Geliştirme**: Expo Go ile test edilebilir durumda  
✅ **Web Build**: `dist` klasöründe production-ready build hazır

## 🌐 Web Deployment

### Hızlı Başlangıç (Vercel)

1. **Vercel CLI'ı yükleyin:**
   ```bash
   npm install -g vercel
   ```

2. **Vercel'e giriş yapın:**
   ```bash
   vercel login
   ```

3. **Deploy edin:**
   ```bash
   cd apps/guardian-app/dist
   vercel --prod
   ```

Detaylı bilgi için: `.agent/workflows/deploy-web.md`

### Alternatif: Netlify

```bash
npm install -g netlify-cli
netlify deploy --dir=apps/guardian-app/dist --prod
```

## 📱 Mobil Deployment

### Android & iOS Build Almak

1. **EAS CLI'ı yükleyin:**
   ```bash
   npm install -g eas-cli
   ```

2. **Expo'ya giriş yapın:**
   ```bash
   eas login
   ```

3. **Android APK (Test için):**
   ```bash
   cd apps/guardian-app
   eas build -p android --profile preview
   ```

4. **Android AAB (Google Play için):**
   ```bash
   eas build -p android --profile production
   ```

5. **iOS (Apple Developer hesabı gerekli):**
   ```bash
   eas build -p ios --profile production
   ```

Detaylı bilgi için: `.agent/workflows/deploy-mobile.md`

## ⚠️ Önemli: Backend URL

Uygulamanız şu anda `localhost:4000` adresine bağlanıyor. Production'a geçmeden önce:

1. Backend servisinizi bir sunucuya deploy edin (Render, Railway, Heroku, vb.)
2. `apps/guardian-app/.env` dosyasında URL'i güncelleyin:
   ```
   EXPO_PUBLIC_API_BASE_URL=https://your-backend-url.com
   ```

## 📊 Deployment Durumu

| Platform | Durum | URL/Store |
|----------|-------|-----------|
| **Web (Local)** | ✅ Çalışıyor | http://localhost:8081 |
| **Web (Production)** | 🔄 Hazır (Deploy edilmedi) | - |
| **Android** | 🔄 Build alınabilir | - |
| **iOS** | 🔄 Build alınabilir | - |

## 🛠️ Geliştirme Komutları

```bash
# Web'de çalıştır
npm run web

# Android emülatörde çalıştır
npm run android

# iOS simulatörde çalıştır
npm run ios

# Tüm platformlarda çalıştır
npm start
```

## 📝 Sonraki Adımlar

1. ✅ Git repository oluşturuldu
2. ✅ Web build hazır
3. ✅ EAS yapılandırması tamamlandı
4. ⏳ Backend'i deploy edin
5. ⏳ Web'i Vercel'e deploy edin
6. ⏳ Mobil build'leri alın
7. ⏳ App Store & Play Store'a yükleyin

## 🆘 Yardım

- Web deployment: `/deploy-web` komutunu kullanın
- Mobil deployment: `/deploy-mobile` komutunu kullanın
- Sorun yaşarsanız: [Expo Documentation](https://docs.expo.dev)

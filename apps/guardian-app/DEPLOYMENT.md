# Guardian App Deployment Guide

Bu rehber, uygulamanızı Web, Android ve iOS platformlarında nasıl yayınlayacağınızı açıklar.

## ⚠️ Kritik Ön Hazırlık: Backend URL

Uygulamanız şu anda `localhost:4000` adresine istek atıyor. Gerçek bir cihazda veya web sitesinde çalışması için **Backend servisinizin (api-gateway) bir sunucuda çalışıyor olması** ve uygulamanın bu sunucuya bağlanması gerekir.

1. Backend servisinizi (örneğin Render, Heroku, AWS veya DigitalOcean'a) deploy edin.
2. Size verilen URL'i (örn: `https://api.myapp.com`) kopyalayın.
3. `apps/guardian-app/.env` dosyasındaki `EXPO_PUBLIC_API_BASE_URL` değerini güncelleyin:

```properties
EXPO_PUBLIC_API_BASE_URL=https://api.myapp.com
```

---

## 🌐 Web Sitesi Olarak Yayınlama

Expo, uygulamanızı statik bir web sitesi olarak dışa aktarabilir.

1. **Build Alın:**
   Terminalde `apps/guardian-app` klasöründeyken şu komutu çalıştırın:
   ```bash
   npx expo export -p web
   ```
   Bu komut `dist` adında bir klasör oluşturacaktır.

2. **Yayınlayın (Vercel Örneği):**
   - Vercel CLI yükleyin: `npm i -g vercel`
   - `vercel deploy` komutunu çalıştırın ve `dist` klasörünü seçin.
   - Veya `dist` klasörünü Netlify, GitHub Pages gibi herhangi bir statik hosting servisine yükleyebilirsiniz.

---

## 📱 Mobil Uygulama Olarak Yayınlama (Android & iOS)

Mobil uygulama çıktıları (APK, AAB, IPA) almak için **EAS (Expo Application Services)** kullanacağız.

### 1. Hazırlık
- [Expo.dev](https://expo.dev) üzerinde bir hesap oluşturun.
- EAS CLI'ı yükleyin:
  ```bash
  npm install -g eas-cli
  ```
- Hesabınıza giriş yapın:
  ```bash
  eas login
  ```
- Projeyi yapılandırın:
  ```bash
  eas build:configure
  ```

### 2. Android İçin Build (APK/AAB)

**Test için (APK):**
Emülatörde veya cihazınızda test etmek için:
```bash
eas build -p android --profile preview
```

**Google Play Store için (AAB):**
Mağazaya yüklemek için:
```bash
eas build -p android --profile production
```

### 3. iOS İçin Build (IPA)

*Not: iOS için Apple Developer Hesabı (yıllık $99) gereklidir.*

**Test için (Ad-hoc/Simulator):**
```bash
eas build -p ios --profile preview
```

**App Store için:**
```bash
eas build -p ios --profile production
```

### 4. Mağazalara Yükleme
Build işlemi bittiğinde EAS size bir indirme linki verecektir.
- **Android:** `.aab` dosyasını Google Play Console'a yükleyin.
- **iOS:** Transporter uygulamasını kullanarak `.ipa` dosyasını App Store Connect'e yükleyin.

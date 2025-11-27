---
description: Mobil uygulama build ve deployment
---

# Mobil Deployment (Android & iOS)

Bu workflow, Guardian App'i Android ve iOS platformları için build almak ve deploy etmek için gerekli adımları içerir.

## Ön Gereksinimler

1. Expo hesabı (ücretsiz): https://expo.dev/signup
2. EAS CLI kurulu olmalı
3. Backend API'nin deploy edilmiş olması

## Adımlar

### 1. EAS CLI Kurulumu

```bash
npm install -g eas-cli
```

### 2. Expo Hesabına Giriş

```bash
eas login
```

### 3. EAS Build Yapılandırması

```bash
cd apps/guardian-app
eas build:configure
```

Bu komut `eas.json` dosyası oluşturacak.

### 4. Backend URL'ini Güncelleyin

`apps/guardian-app/.env` dosyasında production backend URL'inizi ayarlayın:

```
EXPO_PUBLIC_API_BASE_URL=https://your-backend-url.com
```

### 5. Android Build (APK - Test İçin)

Test için APK almak:

```bash
eas build -p android --profile preview
```

Build tamamlandığında size bir QR kod ve indirme linki verilecek.

### 6. Android Build (AAB - Google Play Store İçin)

Production build almak:

```bash
eas build -p android --profile production
```

### 7. iOS Build (Simulator - Test İçin)

*Not: iOS build için Apple Developer hesabı gerekir ($99/yıl)*

```bash
eas build -p ios --profile preview
```

### 8. iOS Build (App Store İçin)

```bash
eas build -p ios --profile production
```

## Build Durumunu Takip Etme

Build'ler Expo sunucularında yapılır. Durumu takip etmek için:

1. Terminal'de gösterilen linke tıklayın
2. Veya https://expo.dev adresinden hesabınıza giriş yapıp "Builds" sekmesine gidin

## Mağazalara Yükleme

### Google Play Store (Android)

1. https://play.google.com/console adresine gidin
2. Yeni uygulama oluşturun
3. Build'den indirdiğiniz `.aab` dosyasını yükleyin
4. Store listing bilgilerini doldurun
5. Review için gönderin

### App Store (iOS)

1. https://appstoreconnect.apple.com adresine gidin
2. Yeni uygulama oluşturun
3. Transporter uygulamasını kullanarak `.ipa` dosyasını yükleyin
4. App Store listing bilgilerini doldurun
5. Review için gönderin

## Over-the-Air (OTA) Updates

Küçük güncellemeler için app store'dan geçmeden update yapabilirsiniz:

```bash
eas update --branch production --message "Bug fixes"
```

## Notlar

- İlk build 10-20 dakika sürebilir
- Android build'leri ücretsizdir
- iOS build'leri için Apple Developer hesabı şarttır
- EAS Build ücretsiz tier'da ayda sınırlı build hakkı vardır

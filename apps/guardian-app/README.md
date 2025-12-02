# 📱 TerraGuard Botanica - Mobil Uygulama

Bitki ve mantar tanımlama, doğa rehberi ve AI asistanı içeren cross-platform mobil uygulama.

## 🎯 Özellikler

### ✅ Tamamlanan Özellikler

- **🌿 Bitki & Mantar Tanımlama**
  - Kamera veya galeriden fotoğraf seçimi
  - AI destekli görsel tanımlama
  - Olasılık skorları ile sonuçlar
  - Zehirlilik uyarıları
  - Haptic feedback ile geliştirilmiş UX

- **🗺️ İnteraktif Harita**
  - Kamp alanları, su kaynakları, tehlike bölgeleri
  - Gerçek zamanlı marker'lar
  - Platform-specific optimizasyonlar (Native Maps / Google Maps)

- **🤖 AI Asistan**
  - Doğa ile ilgili sorular sorun
  - Akıllı öneriler
  - Güvenlik uyarıları

- **👤 Profil Yönetimi**
  - Kullanıcı ayarları
  - Tema seçimi (Light/Dark)
  - Dil desteği

### 🎨 Mobil Optimizasyonlar

- **Platform-Aware Bileşenler**: Mobil ve web için optimize edilmiş UI
- **Haptic Feedback**: Dokunmatik geri bildirim
- **Safe Area Yönetimi**: Tüm cihazlarda düzgün görünüm
- **Responsive Design**: Tablet ve telefon desteği
- **Offline Desteği**: SQLite ile yerel veri saklama

## 🚀 Hızlı Başlangıç

### Gereksinimler

- Node.js 18+
- npm veya yarn
- Expo Go uygulaması (mobil test için)

### Kurulum

```bash
# Bağımlılıkları yükle
cd apps/guardian-app
npm install

# Geliştirme sunucusunu başlat
npm start
```

### Platformlarda Çalıştırma

```bash
# Web
npm run web

# Android (Emulator veya cihaz)
npm run android

# iOS (Mac gerekli)
npm run ios
```

## 📱 Mobil Test

1. **Expo Go ile Test** (Önerilen):
   - Telefonunuza [Expo Go](https://expo.dev/client) uygulamasını indirin
   - `npm start` komutu ile QR kodu oluşturun
   - QR kodu Expo Go ile tarayın

2. **Emulator ile Test**:
   - Android Studio veya Xcode kurulu olmalı
   - `npm run android` veya `npm run ios`

## 🏗️ Production Build

### Android APK (Test için)

```bash
# EAS CLI kur (ilk kez)
npm install -g eas-cli

# Expo'ya giriş yap
eas login

# Preview build al
eas build -p android --profile preview
```

### Production Build (App Store/Play Store)

Detaylı talimatlar için [Mobil Deployment Workflow](../../.agent/workflows/deploy-mobile.md) dosyasına bakın.

## 🛠️ Teknoloji Stack

- **Framework**: React Native (Expo)
- **Navigation**: Expo Router
- **State Management**: Zustand
- **API Client**: Axios + React Query
- **Database**: SQLite (Offline)
- **Maps**: React Native Maps (Native) / Google Maps (Web)
- **Styling**: React Native StyleSheet
- **i18n**: react-i18next

## 📁 Proje Yapısı

```
apps/guardian-app/
├── app/                    # Expo Router sayfaları
│   ├── (tabs)/            # Tab navigation
│   │   ├── index.tsx      # Ana sayfa (Tanımlama)
│   │   ├── map.tsx        # Harita
│   │   ├── assistant.tsx  # AI Asistan
│   │   ├── guide.tsx      # Rehber
│   │   └── profile.tsx    # Profil
│   └── _layout.tsx        # Root layout
├── components/            # Reusable bileşenler
│   ├── ui/               # UI bileşenleri
│   ├── Map.tsx           # Native map (mobil)
│   ├── Map.web.tsx       # Google Maps (web)
│   ├── PlatformSafeView.tsx
│   └── LoadingScreen.tsx
├── hooks/                # Custom hooks
├── lib/                  # Utilities
│   ├── api.ts           # API client
│   ├── haptics.ts       # Haptic feedback
│   ├── imagePicker.ts   # Image picker utility
│   └── offline.ts       # Offline storage
├── store/               # Zustand stores
└── constants/           # Sabitler (renkler, vb.)
```

## 🎨 Tasarım Sistemi

### Renkler

```typescript
Colors = {
  light: {
    primary: '#224A34',    // Koyu yeşil
    secondary: '#52796F',  // Orta yeşil
    accent: '#d8f3dc',     // Açık yeşil
    background: '#F5F5F0', // Krem beyaz
    card: '#FFFFFF',
    text: '#1A1A1A',
  },
  dark: {
    // Dark mode renkleri
  }
}
```

### Tipografi

- **Başlıklar**: Georgia (iOS) / Serif (Android)
- **Gövde**: System default
- **Fontlar**: Platform native fontları

## 🔧 Yapılandırma

### Environment Variables

`.env` dosyası oluşturun:

```env
EXPO_PUBLIC_API_BASE_URL=http://localhost:4000
EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxx
EXPO_PUBLIC_SAFETY_MESSAGE=Olasılıksal görsel eşleşme. Tıbbi tavsiye değildir.
```

### App Configuration

`app.json` dosyasında:
- Uygulama adı ve slug
- Bundle identifier (iOS/Android)
- İkonlar ve splash screen
- İzinler (kamera, konum)
- Google Maps API key (Android)

## 🧪 Test

```bash
# TypeScript kontrolü
npx tsc --noEmit

# Linting
npm run lint
```

## 📦 Deployment

### Web (Vercel)

```bash
npm run vercel-build
```

### Mobil (EAS Build)

```bash
# Android
eas build -p android --profile production

# iOS
eas build -p ios --profile production
```

## 🐛 Bilinen Sorunlar ve Çözümler

### Kamera İzni
- Android: `app.json` içinde permissions array'inde tanımlı
- iOS: `NSCameraUsageDescription` tanımlı

### Google Maps (Web)
- API key `app.json` ve `Map.web.tsx` içinde tanımlı
- Web'de çalışması için Google Maps JavaScript API aktif olmalı

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit edin (`git commit -m 'Add amazing feature'`)
4. Push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 📄 Lisans

Bu proje özel bir projedir.

## 📞 İletişim

Sorularınız için issue açabilirsiniz.

---

**Not**: Bu uygulama tıbbi tavsiye vermez. Yabani bitki ve mantarları tüketmeden önce mutlaka uzman görüşü alın.

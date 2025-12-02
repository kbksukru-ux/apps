# 📱 Mobil Uygulama Test Checklist

## ✅ Temel Fonksiyonellik

### Ana Sayfa (Tanımlama)
- [ ] Uygulama açılıyor
- [ ] Loading screen görünüyor
- [ ] Ana sayfa yükleniyor
- [ ] "Fotoğraf Çek" butonu çalışıyor
- [ ] Mobilde action sheet açılıyor (Kamera/Galeri seçimi)
- [ ] Kamera izni isteniyor
- [ ] Kamera açılıyor
- [ ] Fotoğraf çekiliyor
- [ ] Fotoğraf önizlemesi görünüyor
- [ ] Konum izni isteniyor
- [ ] Fotoğraf yükleniyor
- [ ] Haptic feedback çalışıyor (titreşim)
- [ ] Sonuçlar görünüyor
- [ ] Olasılık kartları doğru görünüyor
- [ ] Zehirlilik badge'leri doğru renkte

### Harita
- [ ] Harita ekranı açılıyor
- [ ] Mobilde native map görünüyor
- [ ] Marker'lar yükleniyor
- [ ] Marker renkleri doğru (kamp=yeşil, su=mavi, tehlike=kırmızı)
- [ ] Harita zoom çalışıyor
- [ ] Harita pan (kaydırma) çalışıyor
- [ ] Legend görünüyor
- [ ] Konum değişince marker'lar güncelleniyor

### AI Asistan
- [ ] Asistan ekranı açılıyor
- [ ] Input alanı çalışıyor
- [ ] Klavye açılıyor
- [ ] Mesaj gönderilebiliyor
- [ ] Loading indicator görünüyor
- [ ] Yanıt geliyor
- [ ] Mesaj baloncukları doğru görünüyor
- [ ] Scroll çalışıyor
- [ ] Hata durumunda uyarı görünüyor

### Rehber
- [ ] Rehber ekranı açılıyor
- [ ] İçerik görünüyor
- [ ] Scroll çalışıyor

### Profil
- [ ] Profil ekranı açılıyor
- [ ] Tüm menü öğeleri görünüyor
- [ ] Menü öğelerine tıklanabiliyor
- [ ] Alert'ler çalışıyor

## 🎨 UI/UX

### Genel
- [ ] Tüm ekranlarda safe area doğru
- [ ] Status bar görünüyor
- [ ] Tab bar görünüyor ve çalışıyor
- [ ] Tab ikonları doğru
- [ ] Renkler doğru (light mode)
- [ ] Dark mode çalışıyor (varsa)
- [ ] Font'lar düzgün görünüyor
- [ ] Spacing'ler tutarlı

### Responsive
- [ ] Telefonda düzgün görünüyor
- [ ] Tablet'te düzgün görünüyor
- [ ] Landscape mode çalışıyor
- [ ] Klavye açıldığında UI bozulmuyor

### Animasyonlar
- [ ] Sayfa geçişleri smooth
- [ ] Button press animasyonları çalışıyor
- [ ] Loading animasyonları çalışıyor
- [ ] Haptic feedback uygun yerlerde

## 🔧 Performans

- [ ] Uygulama hızlı açılıyor (<3 saniye)
- [ ] Sayfa geçişleri akıcı
- [ ] Scroll performansı iyi
- [ ] Fotoğraf yükleme hızlı
- [ ] API istekleri makul sürede
- [ ] Memory leak yok
- [ ] Crash olmuyor

## 🔐 İzinler

- [ ] Kamera izni doğru isteniyor
- [ ] Galeri izni doğru isteniyor
- [ ] Konum izni doğru isteniyor
- [ ] İzin reddedilince uygun mesaj
- [ ] İzin verilince özellik çalışıyor

## 🌐 Network

- [ ] API bağlantısı çalışıyor
- [ ] Offline durumda uygun mesaj
- [ ] Network hatası yakalanıyor
- [ ] Retry mekanizması var
- [ ] Loading state'leri doğru

## 📱 Platform Specific

### Android
- [ ] Back button çalışıyor
- [ ] Hardware back button doğru davranıyor
- [ ] Notification bar ile uyumlu
- [ ] Different screen sizes'da çalışıyor
- [ ] Android 10+ çalışıyor

### iOS
- [ ] Swipe back çalışıyor
- [ ] Safe area (notch) doğru
- [ ] Status bar rengi doğru
- [ ] Different iPhone models'da çalışıyor
- [ ] iOS 14+ çalışıyor

## 🐛 Edge Cases

- [ ] Çok uzun metin'lerde overflow yok
- [ ] Boş state'ler doğru görünüyor
- [ ] Error state'ler doğru görünüyor
- [ ] Loading state'ler doğru görünüyor
- [ ] Network timeout doğru handle ediliyor
- [ ] Çok büyük fotoğraf yüklenebiliyor
- [ ] GPS kapalıyken uygun mesaj

## 🔄 State Management

- [ ] State güncellemeleri doğru
- [ ] History kaydediliyor
- [ ] App restart'ta data korunuyor (offline)
- [ ] Multiple request'ler doğru handle ediliyor

## 🎯 Kullanıcı Akışları

### Yeni Kullanıcı
1. [ ] Uygulamayı ilk kez açıyor
2. [ ] İzinleri veriyor
3. [ ] Fotoğraf çekiyor
4. [ ] Sonuçları görüyor
5. [ ] Diğer sekmeleri keşfediyor

### Deneyimli Kullanıcı
1. [ ] Hızlıca fotoğraf çekiyor
2. [ ] Geçmiş sonuçlara bakıyor
3. [ ] Haritada geziniyor
4. [ ] AI'ya soru soruyor

## ✨ Bonus Özellikler

- [ ] Haptic feedback tüm önemli etkileşimlerde
- [ ] Smooth transitions
- [ ] Error recovery
- [ ] Offline support
- [ ] Fast image loading

## 📝 Notlar

Test sırasında bulduğunuz sorunları buraya not edin:

---

**Test Tarihi**: _____________
**Test Eden**: _____________
**Cihaz**: _____________
**OS Version**: _____________
**App Version**: _____________

**Bulunan Sorunlar**:
1. 
2. 
3. 

**Öneriler**:
1. 
2. 
3.

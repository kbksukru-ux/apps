## UI / UX Tasarım Notları

### Genel

- Minimal, bilimsel görünüm (açık tonlar, yeşil vurgu).
- Her ekranın üst kısmında üç satırlık güvenlik mesajı veya `SafetyNotice` bileşeni.
- Toksisite renk kodları:
  - Yeşil (#22c55e) → güvenli
  - Sarı (#facc15) → belirsiz/dikkat
  - Kırmızı (#ef4444) → toksik

### Sekmeler

1. **Tanımla**
   - Hero bölümünde kamera CTA.
   - Sonuç kartları dikey liste, solda sıralama, sağda yüzde.
   - Tarif paneli toksik durumlarda kilitli görünüm.

2. **Rehber**
   - Premium banner.
   - Kartlar koyu arka plan, Markdown özetleri.
   - Offline indirme durumuna ilişkin rozet (gelecek iyileştirme).

3. **Harita**
   - MapLibre/React Native Maps.
   - Alt sol köşede legenda.
   - Marker ekleme butonu (gelecek sprint).

4. **Asistan**
   - Baloncuk bazlı sohbet.
   - Mesaj giriş alanının üzerinde güvenlik uyarısı.

### Mikro Etkileşimler

- Kamera tuşu haptics (Expo Haptics).
- Tanımlama sonrası sonuç kartları fade-in animasyonu.
- Premium CTA tıklanınca Stripe sheet açılır (şimdilik store state).


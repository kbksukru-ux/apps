import { useState } from 'react';
import { View, Text, Pressable, StyleSheet, Image, ScrollView, ActivityIndicator, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { useIdentify } from '@/hooks/useIdentify';
import { ProbabilityCard } from '@/components/ui/ProbabilityCard';
import { SafetyNotice } from '@/components/ui/SafetyNotice';
import { useIdentificationStore } from '@/store/identificationStore';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { PlatformSafeView } from '@/components/PlatformSafeView';
import { pickImage as pickImageUtil } from '@/lib/imagePicker';
import { hapticFeedback } from '@/lib/haptics';

export default function IdentifyScreen() {
  const [photo, setPhoto] = useState<ImagePicker.ImagePickerAsset | null>(null);
  const { mutateAsync, isPending } = useIdentify();
  const history = useIdentificationStore((s) => s.history);
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'] ?? Colors.light;

  const pickImage = async () => {
    hapticFeedback.light();
    const asset = await pickImageUtil({ quality: 0.7, includeBase64: true });
    if (asset) {
      setPhoto(asset);
      await submit(asset);
    }
  };

  const submit = async (asset: ImagePicker.ImagePickerAsset) => {
    try {
      await Location.requestForegroundPermissionsAsync();
      const location = await Location.getCurrentPositionAsync({ mayShowUserSettingsDialog: true }).catch(() => null);
      const blob = await (await fetch(asset.uri)).blob();
      await mutateAsync({
        file: blob,
        geo: location ? { lat: location.coords.latitude, lng: location.coords.longitude } : undefined,
      });
      hapticFeedback.success();
    } catch (error) {
      hapticFeedback.error();
      throw error;
    }
  };

  return (
    <PlatformSafeView backgroundColor={colors.background}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={[styles.header, { backgroundColor: colors.primary }]}>
          <View>
            <Text style={styles.headerTitle}>TerraGuard</Text>
            <Text style={styles.headerSubtitle}>Doğayı Keşfet</Text>
          </View>
          <View style={styles.headerIcon}>
            <FontAwesome name="leaf" size={24} color={colors.accent} />
          </View>
        </View>

        <View style={styles.hero}>
          <View style={[styles.heroContent, { backgroundColor: colors.card, shadowColor: colors.primary }]}>
            <Text style={[styles.title, { color: colors.primary }]}>Bitki & Mantar Tanımla</Text>
            <Text style={[styles.subtitle, { color: '#666' }]}>
              Fotoğraf çek, yapay zeka ile anında öğren.
            </Text>

            {photo ? (
              <View style={styles.photoContainer}>
                <Image source={{ uri: photo.uri }} style={styles.preview} />
                <Pressable
                  style={styles.removeButton}
                  onPress={() => setPhoto(null)}
                >
                  <FontAwesome name="times-circle" size={32} color="#ef4444" />
                </Pressable>
                <Pressable
                  style={({ pressed }) => [
                    styles.changePhotoButton,
                    { backgroundColor: colors.secondary, opacity: pressed ? 0.9 : 1 }
                  ]}
                  onPress={pickImage}
                  disabled={isPending}
                >
                  <FontAwesome name="refresh" size={16} color="#fff" />
                  <Text style={styles.changePhotoText}>Farklı Fotoğraf Seç</Text>
                </Pressable>
              </View>
            ) : (
              <Pressable
                style={({ pressed }) => [
                  styles.cta,
                  { backgroundColor: colors.primary, opacity: pressed ? 0.9 : 1 }
                ]}
                onPress={pickImage}
              >
                <FontAwesome name="camera" size={20} color="#fff" />
                <Text style={[styles.ctaText, { color: '#fff' }]}>
                  {isPending ? 'Analiz ediliyor...' : Platform.OS === 'web' ? 'Fotoğraf Seç' : 'Fotoğraf Çek'}
                </Text>
              </Pressable>
            )}

            {isPending && <ActivityIndicator color={colors.primary} style={{ marginTop: 10 }} />}
          </View>
        </View>

        <View style={styles.content}>
          <SafetyNotice />

          <View style={styles.results}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Sonuçlar</Text>

            {history.length === 0 && !photo && (
              <View style={[styles.emptyState, { borderColor: colors.secondary }]}>
                <FontAwesome name="camera" size={48} color={colors.secondary} style={{ opacity: 0.5 }} />
                <Text style={[styles.empty, { color: colors.text }]}>
                  Henüz bir tarama yapmadınız.
                </Text>
              </View>
            )}

            {history[0]?.matches.map((match, index) => (
              <ProbabilityCard key={`${match.latinName}-${index}`} match={match} index={index} />
            ))}

            {history[0] && (
              <View style={[
                styles.recipePanel,
                { backgroundColor: history[0]?.disableRecipes ? '#fee2e2' : colors.accent }
              ]}>
                <View style={styles.recipeHeader}>
                  <FontAwesome
                    name={history[0]?.disableRecipes ? "warning" : "cutlery"}
                    size={20}
                    color={history[0]?.disableRecipes ? "#dc2626" : colors.primary}
                  />
                  <Text style={[
                    styles.recipeTitle,
                    { color: history[0]?.disableRecipes ? "#dc2626" : colors.primary }
                  ]}>
                    Tarifler & Tüketim
                  </Text>
                </View>
                <Text style={[styles.recipeText, { color: colors.text }]}>
                  {history[0]?.disableRecipes
                    ? "Bu tür veya benzerleri riskli olabilir. Tarifler güvenlik nedeniyle kapatıldı."
                    : "Premium tarifler burada görüntülenecek."}
                </Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </PlatformSafeView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 24,
  },
  header: {
    padding: 24,
    paddingTop: 40,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: -1,
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif', // More classy font
  },
  headerSubtitle: {
    color: '#d8f3dc',
    fontSize: 16,
    fontWeight: '500',
    opacity: 0.9,
  },
  headerIcon: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    padding: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  hero: {
    paddingHorizontal: 16,
    marginBottom: 16,
    marginTop: -40, // Overlap with header
  },
  heroContent: {
    borderRadius: 24,
    padding: 24,
    gap: 16,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 24,
    elevation: 8,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 8,
    lineHeight: 24,
  },
  cta: {
    borderRadius: 16,
    paddingVertical: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  ctaText: {
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  preview: {
    width: '100%',
    height: 300,
    borderRadius: 16,
    backgroundColor: '#000',
  },
  photoContainer: {
    position: 'relative',
    width: '100%',
    gap: 12,
  },
  removeButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 999,
    padding: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  changePhotoButton: {
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  changePhotoText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  content: {
    paddingHorizontal: 16,
    gap: 24,
  },
  results: {
    gap: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  emptyState: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderStyle: 'dashed',
    borderRadius: 24,
    gap: 16,
    backgroundColor: 'rgba(0,0,0,0.02)',
  },
  empty: {
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.6,
    lineHeight: 24,
  },
  recipePanel: {
    padding: 24,
    borderRadius: 24,
    gap: 12,
  },
  recipeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 4,
  },
  recipeTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  recipeText: {
    fontSize: 16,
    lineHeight: 24,
    opacity: 0.9,
  },
});

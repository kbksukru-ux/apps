import { ScrollView, RefreshControl, View, Text, StyleSheet, Pressable, Platform } from 'react-native';
import { useGuides } from '@/hooks/useGuides';
import { SurvivalCard } from '@/components/ui/SurvivalCard';
import { SafetyNotice } from '@/components/ui/SafetyNotice';
import { useSubscriptionStore } from '@/store/subscriptionStore';

export default function GuideScreen() {
  const { data, refetch, isFetching } = useGuides();
  const plan = useSubscriptionStore((s) => s.plan);
  const setPlan = useSubscriptionStore((s) => s.setPlan);

  return (
    <ScrollView
      style={styles.container}
      refreshControl={<RefreshControl refreshing={isFetching} onRefresh={refetch} />}
      contentContainerStyle={{ padding: 24, gap: 20 }}
    >
      <View style={{ marginTop: 20 }}>
        <Text style={styles.title}>Hayatta Kalma Rehberi</Text>
        <Text style={styles.subtitle}>Çevrimdışı kullanılabilen güvenli içerikler.</Text>
      </View>
      <SafetyNotice message="Bilgiler eğitim amaçlıdır, tüketim onayı değildir." />
      {plan === 'free' && (
        <Pressable style={styles.upgrade} onPress={() => setPlan('premium')}>
          <Text style={styles.upgradeTitle}>Premium ile Çevrimdışı Rehber</Text>
          <Text style={styles.upgradeText}>Rehberlerin tamamını çevrimdışı indir, tarifleri aç.</Text>
        </Pressable>
      )}
      {data?.map((guide: any) => (
        <SurvivalCard key={guide.slug} title={guide.title} section={guide.section} body={guide.body_md} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F0', // colors.background
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#224A34', // colors.primary
    marginBottom: 4,
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },
  subtitle: {
    color: '#1A1A1A', // colors.text
    opacity: 0.7,
    fontSize: 16,
    marginBottom: 16,
  },
  upgrade: {
    backgroundColor: '#224A34', // colors.primary
    borderRadius: 16,
    padding: 20,
    gap: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  upgradeTitle: {
    color: '#F5F5F0', // colors.background
    fontWeight: '700',
    fontSize: 18,
  },
  upgradeText: {
    color: '#A3B18A', // colors.secondary
    fontSize: 15,
    lineHeight: 22,
  },
});


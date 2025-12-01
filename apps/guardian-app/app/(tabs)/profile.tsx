import { StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Text, View } from '@/components/Themed';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';

interface ProfileItemProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle?: string;
  onPress?: () => void;
  showChevron?: boolean;
  color?: string;
}

function ProfileItem({ icon, title, subtitle, onPress, showChevron = true, color }: ProfileItemProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const iconColor = color || colors.tint;

  return (
    <TouchableOpacity
      style={styles.profileItem}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.profileItemLeft}>
        <View style={[styles.iconContainer, { backgroundColor: `${iconColor}15` }]}>
          <Ionicons name={icon} size={22} color={iconColor} />
        </View>
        <View style={styles.profileItemText}>
          <Text style={styles.profileItemTitle}>{title}</Text>
          {subtitle && <Text style={styles.profileItemSubtitle}>{subtitle}</Text>}
        </View>
      </View>
      {showChevron && (
        <Ionicons name="chevron-forward" size={20} color="#94a3b8" />
      )}
    </TouchableOpacity>
  );
}

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const handlePress = (section: string) => {
    Alert.alert(section, 'Bu özellik yakında eklenecek!');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Ionicons name="person" size={48} color="#fff" />
        </View>
        <Text style={styles.userName}>Kullanıcı Adı</Text>
        <Text style={styles.userEmail}>kullanici@email.com</Text>
      </View>

      {/* Account Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>HESAP</Text>
        <View style={styles.sectionContent}>
          <ProfileItem
            icon="person-outline"
            title="Profil Bilgileri"
            subtitle="Ad, soyad, e-posta"
            onPress={() => handlePress('Profil Bilgileri')}
          />
          <ProfileItem
            icon="lock-closed-outline"
            title="Güvenlik"
            subtitle="Şifre değiştir, 2FA"
            onPress={() => handlePress('Güvenlik')}
          />
          <ProfileItem
            icon="notifications-outline"
            title="Bildirimler"
            subtitle="Push, e-posta bildirimleri"
            onPress={() => handlePress('Bildirimler')}
          />
        </View>
      </View>

      {/* Subscription Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>ABONELİK</Text>
        <View style={styles.sectionContent}>
          <ProfileItem
            icon="diamond-outline"
            title="Premium Üyelik"
            subtitle="Ücretsiz Plan"
            onPress={() => handlePress('Premium Üyelik')}
            color="#f59e0b"
          />
          <ProfileItem
            icon="card-outline"
            title="Ödeme Yöntemleri"
            subtitle="Kredi kartı ekle"
            onPress={() => handlePress('Ödeme Yöntemleri')}
          />
        </View>
      </View>

      {/* App Settings */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>UYGULAMA</Text>
        <View style={styles.sectionContent}>
          <ProfileItem
            icon="language-outline"
            title="Dil"
            subtitle="Türkçe"
            onPress={() => handlePress('Dil')}
          />
          <ProfileItem
            icon="moon-outline"
            title="Tema"
            subtitle={colorScheme === 'dark' ? 'Koyu' : 'Açık'}
            onPress={() => handlePress('Tema')}
          />
          <ProfileItem
            icon="download-outline"
            title="Çevrimdışı Veri"
            subtitle="İndirilen içerikler"
            onPress={() => handlePress('Çevrimdışı Veri')}
          />
        </View>
      </View>

      {/* Support */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>DESTEK</Text>
        <View style={styles.sectionContent}>
          <ProfileItem
            icon="help-circle-outline"
            title="Yardım Merkezi"
            onPress={() => handlePress('Yardım Merkezi')}
          />
          <ProfileItem
            icon="chatbubble-outline"
            title="Geri Bildirim"
            onPress={() => handlePress('Geri Bildirim')}
          />
          <ProfileItem
            icon="document-text-outline"
            title="Gizlilik Politikası"
            onPress={() => handlePress('Gizlilik Politikası')}
          />
          <ProfileItem
            icon="shield-checkmark-outline"
            title="Kullanım Koşulları"
            onPress={() => handlePress('Kullanım Koşulları')}
          />
        </View>
      </View>

      {/* Logout */}
      <View style={styles.section}>
        <View style={styles.sectionContent}>
          <ProfileItem
            icon="log-out-outline"
            title="Çıkış Yap"
            onPress={() => Alert.alert('Çıkış Yap', 'Çıkış yapmak istediğinize emin misiniz?')}
            showChevron={false}
            color="#ef4444"
          />
        </View>
      </View>

      {/* App Version */}
      <Text style={styles.versionText}>Versiyon 1.0.0</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 20,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#22c55e',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#64748b',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748b',
    paddingHorizontal: 20,
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  sectionContent: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#e2e8f0',
  },
  profileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 20,
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  profileItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'transparent',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  profileItemText: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  profileItemTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 2,
  },
  profileItemSubtitle: {
    fontSize: 13,
    color: '#64748b',
  },
  versionText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#94a3b8',
    marginTop: 20,
  },
});

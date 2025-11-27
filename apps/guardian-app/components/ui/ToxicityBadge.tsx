import { Text, View, StyleSheet } from 'react-native';

type Props = {
  level?: 'non_toxic' | 'caution' | 'toxic' | 'unknown';
};

const config = {
  non_toxic: { label: 'Yeşil - Genelde güvenli', color: '#22c55e' },
  caution: { label: 'Sarı - Dikkat', color: '#facc15' },
  toxic: { label: 'Kırmızı - Zehirli', color: '#ef4444' },
  unknown: { label: 'Gri - Belirsiz', color: '#cbd5f5' },
};

export function ToxicityBadge({ level = 'unknown' }: Props) {
  const item = config[level] || config.unknown;
  return (
    <View style={[styles.badge, { backgroundColor: `${item.color}22`, borderColor: item.color }]}>
      <Text style={[styles.text, { color: item.color }]}>{item.label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 4,
    alignSelf: 'flex-start',
    borderWidth: 1,
  },
  text: {
    fontSize: 12,
    fontWeight: '600',
  },
});


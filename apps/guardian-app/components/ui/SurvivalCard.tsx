import { View, Text, StyleSheet } from 'react-native';

type Props = {
  title: string;
  section: string;
  body: string;
};

export function SurvivalCard({ title, section, body }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.section}>{section.toUpperCase()}</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.body} numberOfLines={6}>
        {body.replace(/[#>*]/g, '').trim()}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#0f172a',
    borderRadius: 16,
    padding: 16,
    gap: 8,
  },
  section: {
    color: '#a5b4fc',
    fontSize: 12,
    letterSpacing: 2,
  },
  title: {
    color: '#f8fafc',
    fontSize: 18,
    fontWeight: '700',
  },
  body: {
    color: '#cbd5f5',
    lineHeight: 18,
  },
});


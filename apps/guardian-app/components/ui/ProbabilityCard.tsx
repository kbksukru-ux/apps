import { View, Text, StyleSheet } from 'react-native';
import { ToxicityBadge } from './ToxicityBadge';
import type { MatchResult } from '@/store/identificationStore';

type Props = {
  match: MatchResult;
  index: number;
};

export function ProbabilityCard({ match, index }: Props) {
  const percentage = Math.round(match.probability * 100);
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.rank}>#{index + 1}</Text>
        <View style={styles.names}>
          <Text style={styles.common}>{match.commonName ?? 'Tür adı yok'}</Text>
          <Text style={styles.latin}>{match.latinName}</Text>
        </View>
        <Text style={styles.score}>{percentage}%</Text>
      </View>
      <ToxicityBadge level={match.toxicity} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 16,
    gap: 12,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  rank: {
    fontSize: 18,
    fontWeight: '800',
    color: '#224A34', // colors.primary
  },
  names: {
    flex: 1,
  },
  common: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A', // colors.text
  },
  latin: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
  score: {
    fontSize: 22,
    fontWeight: '800',
    color: '#224A34', // colors.primary
  },
});


import { View, Text, StyleSheet } from 'react-native';

const markers = [
  { color: '#22c55e', label: 'Kamp' },
  { color: '#3b82f6', label: 'Su Kaynağı' },
  { color: '#facc15', label: 'Gözlem' },
  { color: '#ef4444', label: 'Tehlike' },
];

export function MapLegend() {
  return (
    <View style={styles.container}>
      {markers.map((item) => (
        <View key={item.label} style={styles.row}>
          <View style={[styles.dot, { backgroundColor: item.color }]} />
          <Text style={styles.text}>{item.label}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    backgroundColor: '#0f172acc',
    padding: 12,
    borderRadius: 12,
    gap: 6,
  },
  row: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 999,
  },
  text: {
    color: 'white',
    fontSize: 12,
  },
});


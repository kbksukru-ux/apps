import MapView, { Marker, Region } from 'react-native-maps';
import { useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { useMarkers } from '@/hooks/useMarkers';
import { MapLegend } from '@/components/ui/MapLegend';

export default function Map() {
  const [region, setRegion] = useState<Region>({
    latitude: 41.015137,
    longitude: 28.97953,
    latitudeDelta: 0.5,
    longitudeDelta: 0.5,
  });
  const bounds = `${region.longitude - region.longitudeDelta},${region.latitude - region.latitudeDelta},${
    region.longitude + region.longitudeDelta
  },${region.latitude + region.latitudeDelta}`;

  const { data, isLoading } = useMarkers(bounds);

  return (
    <View style={styles.container}>
      <MapView style={StyleSheet.absoluteFill} region={region} onRegionChangeComplete={setRegion}>
        {data?.markers?.map((marker: any) => (
          <Marker
            key={marker.id}
            coordinate={{ latitude: marker.coordinates.lat, longitude: marker.coordinates.lng }}
            pinColor={pinColor(marker.markerType)}
          />
        ))}
      </MapView>
      {isLoading && <ActivityIndicator style={styles.loader} color="#0ea5e9" />}
      <MapLegend />
    </View>
  );
}

function pinColor(type: string) {
  switch (type) {
    case 'camp':
      return '#22c55e';
    case 'water':
      return '#3b82f6';
    case 'danger':
      return '#ef4444';
    default:
      return '#facc15';
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loader: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
});

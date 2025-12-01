import { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { useMarkers } from '@/hooks/useMarkers';
import { MapLegend } from '@/components/ui/MapLegend';

// Google Maps API key
const GOOGLE_MAPS_API_KEY = 'AIzaSyD6qbzX17GMI65bS_ffYRC7CdaAvf_zKb8';

interface Region {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
}

export default function Map() {
    const mapRef = useRef<HTMLDivElement>(null);
    const googleMapRef = useRef<google.maps.Map | null>(null);
    const markersRef = useRef<google.maps.Marker[]>([]);
    const [isMapLoaded, setIsMapLoaded] = useState(false);

    const [region, setRegion] = useState<Region>({
        latitude: 41.015137,
        longitude: 28.97953,
        latitudeDelta: 0.5,
        longitudeDelta: 0.5,
    });

    const bounds = `${region.longitude - region.longitudeDelta},${region.latitude - region.latitudeDelta},${region.longitude + region.longitudeDelta
        },${region.latitude + region.latitudeDelta}`;

    const { data, isLoading } = useMarkers(bounds);

    // Load Google Maps script
    useEffect(() => {
        if (typeof window === 'undefined') return;

        // Check if already loaded
        if (window.google?.maps) {
            setIsMapLoaded(true);
            return;
        }

        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}`;
        script.async = true;
        script.defer = true;
        script.onload = () => setIsMapLoaded(true);
        document.head.appendChild(script);

        return () => {
            // Cleanup if needed
        };
    }, []);

    // Initialize map
    useEffect(() => {
        if (!isMapLoaded || !mapRef.current || googleMapRef.current) return;

        googleMapRef.current = new google.maps.Map(mapRef.current, {
            center: { lat: region.latitude, lng: region.longitude },
            zoom: 10,
            mapTypeControl: true,
            streetViewControl: false,
            fullscreenControl: true,
        });

        // Listen to bounds changes
        googleMapRef.current.addListener('idle', () => {
            if (!googleMapRef.current) return;
            const bounds = googleMapRef.current.getBounds();
            if (!bounds) return;

            const ne = bounds.getNorthEast();
            const sw = bounds.getSouthWest();
            const center = bounds.getCenter();

            setRegion({
                latitude: center.lat(),
                longitude: center.lng(),
                latitudeDelta: Math.abs(ne.lat() - sw.lat()) / 2,
                longitudeDelta: Math.abs(ne.lng() - sw.lng()) / 2,
            });
        });
    }, [isMapLoaded]);

    // Update markers
    useEffect(() => {
        if (!googleMapRef.current || !data?.markers) return;

        // Clear existing markers
        markersRef.current.forEach((marker) => marker.setMap(null));
        markersRef.current = [];

        // Add new markers
        data.markers.forEach((marker: any) => {
            const googleMarker = new google.maps.Marker({
                position: { lat: marker.coordinates.lat, lng: marker.coordinates.lng },
                map: googleMapRef.current!,
                icon: {
                    path: google.maps.SymbolPath.CIRCLE,
                    scale: 8,
                    fillColor: pinColor(marker.markerType),
                    fillOpacity: 1,
                    strokeColor: '#ffffff',
                    strokeWeight: 2,
                },
                title: marker.markerType,
            });

            markersRef.current.push(googleMarker);
        });
    }, [data?.markers]);

    return (
        <View style={styles.container}>
            <div ref={mapRef} style={{ width: '100%', height: '100%' }} />
            {(isLoading || !isMapLoaded) && (
                <ActivityIndicator style={styles.loader} color="#0ea5e9" size="large" />
            )}
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
        position: 'relative',
    },
    loader: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -20 }, { translateY: -20 }],
        zIndex: 1000,
    },
});

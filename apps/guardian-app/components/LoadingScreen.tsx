import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet, Platform } from 'react-native';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';
import FontAwesome from '@expo/vector-icons/FontAwesome';

interface LoadingScreenProps {
    message?: string;
}

/**
 * Full-screen loading component with app branding
 */
export const LoadingScreen = ({ message = 'Yükleniyor...' }: LoadingScreenProps) => {
    const colorScheme = useColorScheme();
    const colors = Colors[colorScheme ?? 'light'] ?? Colors.light;

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.content}>
                <View style={[styles.iconContainer, { backgroundColor: colors.primary }]}>
                    <FontAwesome name="leaf" size={48} color={colors.accent} />
                </View>
                <Text style={[styles.title, { color: colors.primary }]}>TerraGuard</Text>
                <ActivityIndicator
                    size="large"
                    color={colors.primary}
                    style={styles.spinner}
                />
                <Text style={[styles.message, { color: colors.text }]}>{message}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        alignItems: 'center',
        gap: 20,
    },
    iconContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 12,
        elevation: 8,
    },
    title: {
        fontSize: 32,
        fontWeight: '800',
        letterSpacing: -1,
        fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
    },
    spinner: {
        marginTop: 10,
    },
    message: {
        fontSize: 16,
        opacity: 0.7,
    },
});

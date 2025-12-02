import React from 'react';
import { SafeAreaView, View, Platform, StatusBar, StyleSheet, ViewProps } from 'react-native';

interface PlatformSafeViewProps extends ViewProps {
    children: React.ReactNode;
    backgroundColor?: string;
}

/**
 * Platform-aware safe area component
 * - On mobile: Uses SafeAreaView with proper status bar handling
 * - On web: Uses regular View
 */
export const PlatformSafeView = ({
    children,
    style,
    backgroundColor = '#fff',
    ...props
}: PlatformSafeViewProps) => {
    if (Platform.OS === 'web') {
        return (
            <View style={[styles.container, { backgroundColor }, style]} {...props}>
                {children}
            </View>
        );
    }

    return (
        <SafeAreaView
            style={[styles.container, { backgroundColor }, style]}
            {...props}
        >
            <StatusBar
                barStyle="dark-content"
                backgroundColor={backgroundColor}
                translucent={false}
            />
            {children}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

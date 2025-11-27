import React from 'react';
import { View, StyleSheet, Platform, ViewProps } from 'react-native';

interface ResponsiveContainerProps extends ViewProps {
    maxWidth?: number;
}

export const ResponsiveContainer = ({
    children,
    style,
    maxWidth = 800,
    ...props
}: ResponsiveContainerProps) => {
    if (Platform.OS !== 'web') {
        return <View style={style} {...props}>{children}</View>;
    }

    return (
        <View style={[styles.container, style]} {...props}>
            <View style={[styles.content, { maxWidth }]}>
                {children}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#f8fafc', // Light gray background for the empty space
        minHeight: '100%',
    },
    content: {
        flex: 1,
        width: '100%',
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.05,
        shadowRadius: 20,
        elevation: 5,
    },
});

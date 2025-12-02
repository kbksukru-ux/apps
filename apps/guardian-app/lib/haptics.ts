import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';

/**
 * Haptic feedback utilities for mobile devices
 * Provides tactile feedback for user interactions
 */

export const hapticFeedback = {
    /**
     * Light impact - for subtle interactions like button taps
     */
    light: () => {
        if (Platform.OS !== 'web') {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
    },

    /**
     * Medium impact - for standard interactions
     */
    medium: () => {
        if (Platform.OS !== 'web') {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        }
    },

    /**
     * Heavy impact - for important actions
     */
    heavy: () => {
        if (Platform.OS !== 'web') {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        }
    },

    /**
     * Success notification - for successful operations
     */
    success: () => {
        if (Platform.OS !== 'web') {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        }
    },

    /**
     * Warning notification - for warnings
     */
    warning: () => {
        if (Platform.OS !== 'web') {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
        }
    },

    /**
     * Error notification - for errors
     */
    error: () => {
        if (Platform.OS !== 'web') {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        }
    },

    /**
     * Selection changed - for picker/selector changes
     */
    selection: () => {
        if (Platform.OS !== 'web') {
            Haptics.selectionAsync();
        }
    },
};

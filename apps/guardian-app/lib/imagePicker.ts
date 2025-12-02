import * as ImagePicker from 'expo-image-picker';
import { Platform, Alert } from 'react-native';

export interface ImagePickerOptions {
    allowsEditing?: boolean;
    quality?: number;
    includeBase64?: boolean;
}

/**
 * Platform-aware image picker utility
 * - Mobile: Shows action sheet with camera and gallery options
 * - Web: Opens file picker
 */
export const pickImage = async (
    options: ImagePickerOptions = {}
): Promise<ImagePicker.ImagePickerAsset | null> => {
    const {
        allowsEditing = false,
        quality = 0.7,
        includeBase64 = true,
    } = options;

    // Web: Direct file picker
    if (Platform.OS === 'web') {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality,
            base64: includeBase64,
            allowsEditing,
        });

        if (!result.canceled && result.assets.length > 0) {
            return result.assets[0];
        }
        return null;
    }

    // Mobile: Show action sheet
    return new Promise((resolve) => {
        Alert.alert(
            'Fotoğraf Seç',
            'Fotoğrafı nereden almak istersiniz?',
            [
                {
                    text: 'Kamera',
                    onPress: async () => {
                        const permission = await ImagePicker.requestCameraPermissionsAsync();
                        if (!permission.granted) {
                            Alert.alert(
                                'İzin Gerekli',
                                'Kamera kullanabilmek için izin vermeniz gerekiyor.',
                                [{ text: 'Tamam' }]
                            );
                            resolve(null);
                            return;
                        }

                        const result = await ImagePicker.launchCameraAsync({
                            base64: includeBase64,
                            quality,
                            allowsEditing,
                        });

                        if (!result.canceled && result.assets.length > 0) {
                            resolve(result.assets[0]);
                        } else {
                            resolve(null);
                        }
                    },
                },
                {
                    text: 'Galeri',
                    onPress: async () => {
                        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
                        if (!permission.granted) {
                            Alert.alert(
                                'İzin Gerekli',
                                'Galeriye erişebilmek için izin vermeniz gerekiyor.',
                                [{ text: 'Tamam' }]
                            );
                            resolve(null);
                            return;
                        }

                        const result = await ImagePicker.launchImageLibraryAsync({
                            mediaTypes: ImagePicker.MediaTypeOptions.Images,
                            quality,
                            base64: includeBase64,
                            allowsEditing,
                        });

                        if (!result.canceled && result.assets.length > 0) {
                            resolve(result.assets[0]);
                        } else {
                            resolve(null);
                        }
                    },
                },
                {
                    text: 'İptal',
                    style: 'cancel',
                    onPress: () => resolve(null),
                },
            ],
            { cancelable: true, onDismiss: () => resolve(null) }
        );
    });
};

/**
 * Request camera permissions
 */
export const requestCameraPermission = async (): Promise<boolean> => {
    if (Platform.OS === 'web') return true;

    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    return status === 'granted';
};

/**
 * Request media library permissions
 */
export const requestMediaLibraryPermission = async (): Promise<boolean> => {
    if (Platform.OS === 'web') return true;

    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    return status === 'granted';
};

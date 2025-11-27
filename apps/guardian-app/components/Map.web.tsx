import { View, Text, StyleSheet } from 'react-native';

export default function Map() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Map is not supported on web yet.</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    text: {
        fontSize: 16,
        color: '#666',
    },
});

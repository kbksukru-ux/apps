import { useState } from 'react';
import { View, TextInput, Text, StyleSheet, ScrollView, Pressable, ActivityIndicator, Platform } from 'react-native';
import { useAssistant } from '@/hooks/useAssistant';
import { SafetyNotice } from '@/components/ui/SafetyNotice';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function AssistantScreen() {
  const [message, setMessage] = useState('');
  const [history, setHistory] = useState<{ role: 'user' | 'assistant'; content: string }[]>([]);
  const { mutateAsync, isPending, error, reset } = useAssistant();

  const send = async () => {
    if (!message.trim()) return;
    reset(); // Clear any previous errors
    try {
      const reply = await mutateAsync(message);
      setHistory((prev) => [...prev, { role: 'user', content: message }, { role: 'assistant', content: reply }]);
      setMessage('');
    } catch (err) {
      // Error is already logged in the hook
      console.error('Failed to send message:', err);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Doğa Asistanı</Text>
        <Text style={styles.subtitle}>Yapay zekaya sor.</Text>
      </View>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Soğuk havada barınak yapımı?"
          placeholderTextColor="#666"
          value={message}
          onChangeText={setMessage}
        />
        <Pressable style={styles.send} onPress={send} disabled={isPending}>
          {isPending ? (
            <ActivityIndicator color="#F5F5F0" />
          ) : (
            <FontAwesome name="arrow-right" size={20} color="#F5F5F0" />
          )}
        </Pressable>
      </View>

      <SafetyNotice message="AI asistanı tüketim önermez. Uzman görüşü alın." />

      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>⚠️ {error.message || 'Bir hata oluştu'}</Text>
        </View>
      )}

      <ScrollView contentContainerStyle={styles.messages}>
        {history.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>Merak ettiğin her şeyi sorabilirsin.</Text>
          </View>
        )}
        {history.map((item, idx) => (
          <View key={idx} style={[styles.bubble, item.role === 'assistant' && styles.assistant]}>
            <Text style={{
              color: item.role === 'assistant' ? '#1A1A1A' : '#F5F5F0',
              lineHeight: 22,
              fontSize: 15
            }}>{item.content}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 16,
    backgroundColor: '#F5F5F0', // colors.background
  },
  header: {
    marginTop: 24,
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#224A34', // colors.primary
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },
  subtitle: {
    color: '#1A1A1A',
    opacity: 0.6,
    fontSize: 16,
  },
  messages: {
    gap: 12,
    paddingBottom: 24,
    flexGrow: 1,
  },
  bubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#224A34', // colors.primary
    borderRadius: 20,
    borderBottomRightRadius: 4,
    padding: 16,
    maxWidth: '85%',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  assistant: {
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  inputRow: {
    flexDirection: 'row',
    gap: 12,
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 999,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  input: {
    flex: 1,
    backgroundColor: 'transparent',
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#1A1A1A',
    height: 48,
  },
  send: {
    backgroundColor: '#224A34', // colors.primary
    borderRadius: 999,
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendText: {
    color: '#F5F5F0',
    fontWeight: '700',
    fontSize: 13,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.5,
    marginTop: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#1A1A1A',
  },
  errorContainer: {
    backgroundColor: '#fee2e2',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ef4444',
  },
  errorText: {
    color: '#dc2626',
    fontSize: 14,
    fontWeight: '600',
  },
});


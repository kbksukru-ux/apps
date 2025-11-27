import { StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

type Props = {
  message?: string;
};

export function SafetyNotice({ message }: Props) {
  const { t } = useTranslation();
  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>⚠️ Güvenlik Uyarısı</Text>
      <Text style={styles.text}>{message ?? t('safety_notice')}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#fff4e5',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ffb347',
    gap: 4,
  },
  title: {
    fontWeight: '700',
    color: '#b45309',
  },
  text: {
    color: '#92400e',
    fontSize: 13,
    lineHeight: 18,
  },
});


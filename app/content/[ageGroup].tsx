import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Stack, useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet } from 'react-native';

export default function ContentDetail() {
  const { grupo } = useLocalSearchParams<{ grupo: string }>();
  return (
    <ThemedView style={styles.container}>
      <Stack.Screen options={{ title: `Contenido: ${grupo}` }} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ThemedText type="title">Contenido para {grupo}</ThemedText>
        {/* Aquí tu contenido según “grupo” */}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  scrollContent: { paddingBottom: 40 },
});

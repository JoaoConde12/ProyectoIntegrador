// app/games/ninos/play/rompecabezas.tsx

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { Button, StyleSheet } from 'react-native';

export default function RompecabezasScreen() {
  const router = useRouter();
  return (
    <>
      <Stack.Screen options={{ title: 'Rompecabezas de animales' }} />
      <ThemedView style={styles.container}>
        <ThemedText type="title">Rompecabezas de animales</ThemedText>
        <ThemedText style={styles.description}>
          Arrastra las piezas para recomponer la imagen.
        </ThemedText>
        {/* Aquí tu lógica de rompecabezas… */}
        <Button title="Volver" onPress={() => router.back()} />
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container:   { flex:1, padding:20, justifyContent:'center', alignItems:'center' },
  description: { marginVertical:16, textAlign:'center' },
});

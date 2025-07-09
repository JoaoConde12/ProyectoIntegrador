import { ThemedView } from '@/components/ThemedView';
import { Stack, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// PON el ratio correcto de cada imagen, si no lo sabes usa 1.41 para A4, 1.5 o 1.6 para posters altos.
const infografiasNinos = [
  { src: require('@/assets/images/infografia-ninos/ninos1.png'), ratio: 1.41 },
  { src: require('@/assets/images/infografia-ninos/ninos2.png'), ratio: 1.41 },
  { src: require('@/assets/images/infografia-ninos/ninos3.png'), ratio: 1.41 },
  { src: require('@/assets/images/infografia-ninos/ninos4.png'), ratio: 1.41 },
  { src: require('@/assets/images/infografia-ninos/ninos5.png'), ratio: 1.41 },
];

const infografiasJovenes = [
  { src: require('@/assets/images/jovenes/jovenes1.png'), ratio: 1.41 },
  { src: require('@/assets/images/jovenes/jovenes2.png'), ratio: 1.41 },
];

const infografiasAdultos = [
  { src: require('@/assets/images/adultos/adultos1.png'), ratio: 1.64 },
];

export default function ContentDetail() {
  const { grupo } = useLocalSearchParams<{ grupo: string }>();

  let infografias: { src: any; ratio: number }[] = [];
  if (grupo === 'ninos') infografias = infografiasNinos;
  else if (grupo === 'adolescentes') infografias = infografiasJovenes;
  else if (grupo === 'adultosMayores') infografias = infografiasAdultos;

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen options={{ title: `Contenido: ${grupo}` }} />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={{ flexGrow: 1, padding: 0, margin: 0 }}
        showsVerticalScrollIndicator={false}
      >
        {infografias.length > 0 ? (
          infografias.map((img, idx) => (
            <Image
              key={idx}
              source={img.src}
              style={{
                width: SCREEN_WIDTH,
                height: SCREEN_WIDTH * img.ratio, // ¡Aquí está la magia!
                alignSelf: 'center',
                backgroundColor: '#fff',
              }}
              resizeMode="contain"
            />
          ))
        ) : (
          <Text style={{ textAlign: 'center', marginTop: 40, color: '#fff' }}>
            No hay infografías disponibles para este grupo.
          </Text>
        )}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scroll: { flex: 1, backgroundColor: '#fff' },
});

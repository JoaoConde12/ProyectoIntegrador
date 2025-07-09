import { ThemedView } from '@/components/ThemedView';
import { Stack, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text } from 'react-native';
import { WebView } from 'react-native-webview';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const VIDEO_HEIGHT = SCREEN_WIDTH * (9 / 16); // Estándar 16:9 para videos de YouTube

// Links para grupo niños
const videosNinos = [
  'https://www.youtube.com/embed/rHDTJQKW2y8',
  'https://www.youtube.com/embed/I8AhGbzzego',
  'https://www.youtube.com/embed/zbHCWGo4DZ8',
  'https://www.youtube.com/embed/i_92-NovRT0',
];

// Imágenes para adolescentes
const infografiasJovenes = [
  { src: require('@/assets/images/jovenes/jovenes1.png'), ratio: 1.41 },
  { src: require('@/assets/images/jovenes/jovenes2.png'), ratio: 1.41 },
];

// Imágenes para adultos mayores
const infografiasAdultos = [
  { src: require('@/assets/images/adultos/adultos1.png'), ratio: 1.64 },
];

export default function ContentDetail() {
  const { grupo } = useLocalSearchParams<{ grupo: string }>();

  let content: React.ReactNode = null;

  if (grupo === 'ninos') {
    content = (
      <>
        {videosNinos.map((url, idx) => (
          <WebView
            key={idx}
            source={{ uri: url }}
            style={styles.video}
            javaScriptEnabled
            allowsFullscreenVideo
          />
        ))}
      </>
    );
  } else if (grupo === 'adolescentes') {
    content = (
      <>
        {infografiasJovenes.map((img, idx) => (
          <Image
            key={idx}
            source={img.src}
            style={{
              width: SCREEN_WIDTH,
              height: SCREEN_WIDTH * img.ratio,
              alignSelf: 'center',
              backgroundColor: '#fff',
            }}
            resizeMode="contain"
          />
        ))}
      </>
    );
  } else if (grupo === 'adultosMayores') {
    content = (
      <>
        {infografiasAdultos.map((img, idx) => (
          <Image
            key={idx}
            source={img.src}
            style={{
              width: SCREEN_WIDTH,
              height: SCREEN_WIDTH * img.ratio,
              alignSelf: 'center',
              backgroundColor: '#fff',
            }}
            resizeMode="contain"
          />
        ))}
      </>
    );
  } else {
    content = (
      <Text style={{ textAlign: 'center', marginTop: 40, color: '#222' }}>
        No hay contenido disponible para este grupo.
      </Text>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen options={{ title: `Contenido: ${grupo}` }} />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={{ flexGrow: 1, padding: 0, margin: 0 }}
        showsVerticalScrollIndicator={false}
      >
        {content}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scroll: { flex: 1, backgroundColor: '#fff' },
  video: {
    width: SCREEN_WIDTH,
    height: VIDEO_HEIGHT,
    marginBottom: 18,
    alignSelf: 'center',
    backgroundColor: '#000',
    borderRadius: 12,
    overflow: 'hidden',
  },
});

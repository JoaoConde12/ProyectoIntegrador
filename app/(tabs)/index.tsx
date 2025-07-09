import { Image } from 'expo-image';
import { StyleSheet } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React from 'react';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/index-hero.webp")}
          style={styles.indexHero}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Bienvenido!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">
          ¡Aprende y juega de forma segura!
        </ThemedText>
        <ThemedText>
          Aprende sobre ciberseguridad de forma divertida y segura con esta app,
          diseñada para ayudarte a protegerte mientras exploras internet.
        </ThemedText>

        <ThemedText>
          • 👦👧 <ThemedText type="defaultSemiBold">Grupos de edad:</ThemedText> Niños (8-11 años), adolescentes (12-18 años) y adultos mayores (+65 años).
        </ThemedText>
        <ThemedText>
          • 📚 <ThemedText type="defaultSemiBold">Sección de contenido:</ThemedText> Aprende temas de ciberseguridad adaptados a tu edad.
        </ThemedText>
        <ThemedText>
          •🎮 <ThemedText type="defaultSemiBold">Sección de juegos:</ThemedText> Refuerza tu aprendizaje mientras juegas y te diviertes.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  indexHero: {
    height: 250,
    width: 450,
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
  },
});

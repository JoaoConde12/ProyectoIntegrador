// app/(tabs)/Games.tsx
import { CardEdad } from '@/components/CardEdad';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Image } from 'expo-image';
import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function GamesScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/juegos-hero.jpg')}  // Ajusta la ruta a tu imagen de Games
          style={styles.gamesHero}
          contentFit="fill"
          contentPosition="center"
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Juega y aprende</ThemedText>
      </ThemedView>

      <ThemedView style={styles.ageGroupsWrapper}>
        <CardEdad
          grupo="ninos"
          section="games"
          label="Niños"
          image={require('@/assets/images/ninos.jpg')}
        />
        <CardEdad
          grupo="adolescentes"
          section="games"
          label="Adolescentes"
          image={require('@/assets/images/adolescentes.jpg')}
        />
        <CardEdad
          grupo="adultosMayores"
          section="games"
          label="Adultos Mayores"
          image={require('@/assets/images/adultos-mayores.jpg')}
        />
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  gamesHero: {
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH * 0.7,
    alignSelf: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 20,
  },
  ageGroupsWrapper: {
    alignItems: 'center',
    paddingVertical: 20,
    borderWidth: 2,
    borderColor: 'black',
    marginHorizontal: 10,
    borderRadius: 8,
  },
});

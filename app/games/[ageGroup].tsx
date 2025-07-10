// app/games/[ageGroup]/index.tsx

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Button, ScrollView, StyleSheet, View } from 'react-native';

type AgeGroup = 'ninos' | 'adolescentes' | 'adultosMayores';

interface GameItem {
  name: string;
  description: string;
  route: string;
}

const gameData: Record<AgeGroup, GameItem[]> = {
  ninos: [
    {
      name: 'Trivia de ciberseguridad',
      description: '10 preguntas que pondrán a prueba tu conocimiento de ciberseguridad',
      route: '/minigames/ninos/rompecabezas',
    },
  ],
  adolescentes: [
    {
      name: 'Quiz de phishing',
      description: 'Quiz donde se planterán situaciones y tienes que determinar si es phishing o no',
      route: '/minigames/adolescentes/quiz-phishing',
    },
  ],
  adultosMayores: [
    {
      name: 'Wifi seguro',
      description: 'Tienes que escoger cuál es la red wifi segura para conectarte',
      route: '/minigames/adultosMayores/detecta-wifi',
    },
  ],
};

export default function GameDetailScreen() {
  const { ageGroup } = useLocalSearchParams<{ ageGroup: AgeGroup }>();
  const router = useRouter();
  const games = gameData[ageGroup] || [];

  const getTitle = () => {
    switch (ageGroup) {
      case 'ninos':          return 'Juegos para Niños';
      case 'adolescentes':   return 'Juegos para Adolescentes';
      case 'adultosMayores': return 'Juegos para Adultos Mayores';
    }
  };

  return (
    <>
      <Stack.Screen options={{ title: getTitle() }} />

      <ThemedView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {games.length > 0 ? (
            games.map((game, idx) => (
              <View key={idx} style={styles.itemContainer}>
                <ThemedText type="subtitle" style={styles.itemTitle}>
                  {game.name}
                </ThemedText>
                <ThemedText style={styles.itemDescription}>
                  {game.description}
                </ThemedText>
                <View style={styles.buttonWrapper}>
                  <Button
                    title="Ir al juego"
                    onPress={() => router.push(game.route as any)}
                  />
                </View>
              </View>
            ))
          ) : (
            <ThemedText style={styles.noDataText}>
              No hay juegos disponibles para este grupo de edad.
            </ThemedText>
          )}
        </ScrollView>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container:      { flex: 1, padding: 20 },
  scrollContent:  { paddingBottom: 40 },
  itemContainer:  {
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  itemTitle:      { fontSize: 18, fontWeight: 'bold', marginBottom: 5, color: 'black' },
  itemDescription:{ fontSize: 16, color: '#272727' },
  buttonWrapper:  { marginTop: 12, alignSelf: 'flex-start' },
  noDataText:     { textAlign: 'center', marginTop: 50, fontSize: 16, color: '#888' },
});

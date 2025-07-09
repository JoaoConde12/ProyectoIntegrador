// app/games/[ageGroup]/index.tsx

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
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
      name: 'Rompecabezas de animales',
      description: 'Un juego divertido para armar figuras.',
      route: '../minigames/ninos/rompecabezas.tsx',
    },
    {
      name: 'Adivina el color',
      description: 'Pon a prueba tus conocimientos de colores.',
      route: '/games/ninos/adivina-color',
    },
  ],
  adolescentes: [
    {
      name: 'Trivia de ciencia',
      description: 'Preguntas y respuestas para mentes curiosas.',
      route: '/games/adolescentes/trivia-ciencia',
    },
    {
      name: 'Estrategia táctica',
      description: 'Desafía a tus amigos en este juego táctico.',
      route: '/games/adolescentes/estrategia-tactica',
    },
  ],
  adultosMayores: [
    {
      name: 'Memoria de paisajes',
      description: 'Ejercita tu mente con imágenes hermosas.',
      route: '/games/adultosMayores/memoria-paisajes',
    },
    {
      name: 'Sudoku Zen',
      description: 'Un clásico para relajarse y pensar.',
      route: '/games/adultosMayores/sudoku-zen',
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

// app/(tabs)/Content.tsx
import { CardEdad } from '@/components/CardEdad';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Image } from 'expo-image';
import { Dimensions, StyleSheet } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function ContentScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <Image
          source={require('@/assets/images/contenido-hero.jpg')}
          style={styles.contentHero}
          contentFit="fill"            
          contentPosition="center"   
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Contenido educativo</ThemedText>
      </ThemedView>

      <ThemedView style={styles.ageGroupsWrapper}>
        <CardEdad
          grupo="ninos"
          section="content"
          label="Niños"
          image={require('@/assets/images/ninos.jpg')}
        />
        <CardEdad
          grupo="adolescentes"
          section="content"
          label="Adolescentes"
          image={require('@/assets/images/adolescentes.jpg')}
        />
        <CardEdad
          grupo="adultosMayores"
          section="content"
          label="Adultos Mayores"
          image={require('@/assets/images/adultos-mayores.jpg')}
        />
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  contentHero: {
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

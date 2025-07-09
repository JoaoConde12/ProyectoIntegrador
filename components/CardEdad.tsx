// components/ui/CardEdad.tsx

import { useRouter } from 'expo-router';
import React from 'react';
import { Image, Pressable, StyleSheet, Text } from 'react-native';

type Props = {
  grupo: 'ninos' | 'adolescentes' | 'adultosMayores';
  section: 'content' | 'games';
  image: any;
  label: string;
};

export function CardEdad({ grupo, section, image, label }: Props) {
  const router = useRouter();

  const handlePress = () => {
    // Construimos la ruta dinámica
    const path = `/${section}/${grupo}`;
    // Y casteamos a any para evitar el chequeo estricto
    router.push(path as any);
  };

  return (
    <Pressable style={styles.container} onPress={handlePress}>
      <Image source={image} style={styles.image} />
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container:    { alignItems: 'center', marginBottom: 24 },
  image:        {
    width: 200,
    height: 120,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'white',
    resizeMode: 'stretch',
  },
  label:        { marginTop: 8, fontWeight: 'bold', color: 'white', fontSize: 18 },
});

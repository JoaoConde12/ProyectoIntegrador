// app/minigames/adolescentes/quiz-phishing.tsx

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Stack, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native';

const QUESTIONS = [
  {
    text: 'Has recibido un correo de tu banco solicitando tu contraseña. ¿Es phishing?',
    answer: true,
  },
  {
    text: 'Un amigo te envía un link a un video gracioso en un dominio extraño. ¿Es phishing?',
    answer: true,
  },
  {
    text: 'Un correo de tu profesor con tu nota final desde su email oficial. ¿Es phishing?',
    answer: false,
  },
];

export default function QuizPhishing() {
  const router = useRouter();
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const q = QUESTIONS[idx];

  const handleAnswer = (choice: boolean) => {
    if (choice === q.answer) setScore(score + 1);
    const next = idx + 1;
    if (next < QUESTIONS.length) {
      setIdx(next);
    } else {
      Alert.alert(
        'Fin del quiz',
        `Has acertado ${score + (choice === q.answer ? 1 : 0)} de ${QUESTIONS.length}`,
        [{ text: 'Volver', onPress: () => router.back() }]
      );
    }
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Quiz de Phishing' }} />
      <ThemedView style={styles.container}>
        <ThemedText type="title">Pregunta {idx + 1} de {QUESTIONS.length}</ThemedText>
        <ThemedText style={styles.question}>{q.text}</ThemedText>
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.button} onPress={() => handleAnswer(true)}>
            <ThemedText>Sí</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleAnswer(false)}>
            <ThemedText>No</ThemedText>
          </TouchableOpacity>
        </View>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, padding:20, justifyContent:'center' },
  question:{ marginVertical:20, fontSize:16, textAlign:'center' },
  buttons: { flexDirection:'row', justifyContent:'space-around' },
  button:   { padding:12, margin:8, backgroundColor:'#212121', borderRadius:6, minWidth:100, alignItems:'center' },
});

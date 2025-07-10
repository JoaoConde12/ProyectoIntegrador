import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Stack, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Button, StyleSheet, TouchableOpacity, View } from 'react-native';

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
  {
    text: 'Una web que simula ser de tu red social te pide que ingreses tus credenciales. ¿Es phishing?',
    answer: true,
  },
  {
    text: 'Un email que contiene solo emojis y sin mensaje. ¿Es phishing?',
    answer: false,
  },
  {
    text: 'Una oferta de trabajo sospechosamente generosa con enlace desconocido. ¿Es phishing?',
    answer: true,
  },
  {
    text: 'Recibes una factura inesperada en PDF de una empresa que no conoces. ¿Es phishing?',
    answer: true,
  },
];

export default function QuizPhishing() {
  const router = useRouter();
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const q = QUESTIONS[idx];

  const handleAnswer = (choice: boolean) => {
    const isCorrect = choice === q.answer;
    const newScore = score + (isCorrect ? 1 : 0);

    if (idx + 1 < QUESTIONS.length) {
      setIdx(idx + 1);
      setScore(newScore);
    } else {
      setScore(newScore);
      setFinished(true);
    }
  };

  const getFinalMessage = () => {
    if (score <= 3) {
      return 'Hay que estudiar más acerca del phishing en la sección de contenido.';
    } else if (score <= 5) {
      return 'Tienes una base sobre qué es el phishing.';
    } else {
      return '¡Excelente! Sabes qué es el phishing y puedes detectarlo.';
    }
  };

  if (finished) {
    return (
      <>
        <Stack.Screen options={{ title: 'Resultado del Quiz' }} />
        <ThemedView style={styles.container}>
          <ThemedText type="title">¡Has finalizado el quiz!</ThemedText>
          <ThemedText style={styles.question}>
            Tu puntaje: {score} de {QUESTIONS.length}
          </ThemedText>
          <ThemedText style={styles.result}>{getFinalMessage()}</ThemedText>

          <View style={{ marginTop: 30 }}>
            <Button title="Volver" onPress={() => router.back()} />
          </View>
        </ThemedView>
      </>
    );
  }

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
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  question: { marginVertical: 20, fontSize: 16, textAlign: 'center' },
  result:   { fontSize: 16, color: '#e6e6e6', textAlign: 'center', marginTop: 10 },
  buttons:  { flexDirection: 'row', justifyContent: 'space-around' },
  button: {
    padding: 12,
    margin: 8,
    backgroundColor: '#212121',
    borderRadius: 6,
    minWidth: 100,
    alignItems: 'center',
  },
});

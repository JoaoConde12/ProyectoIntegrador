import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Stack, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Button, StyleSheet, TouchableOpacity, View } from 'react-native';

const QUESTIONS = [
  {
    options: [
      { ssid: 'CiberCafe_Free', wpa2: false },
      { ssid: 'CasaJuan_WPA2', wpa2: true },
      { ssid: 'WiFiGratisBiblioteca', wpa2: false },
      { ssid: 'TiendaGratisNet', wpa2: false },
    ],
  },
  {
    options: [
      { ssid: 'Aeropuerto_WiFi', wpa2: false },
      { ssid: 'HospitalSeguroNet', wpa2: true },
      { ssid: 'FreeAirportNet', wpa2: false },
      { ssid: 'ZonaPublica', wpa2: false },
    ],
  },
  {
    options: [
      { ssid: 'Escuela_Segura', wpa2: true },
      { ssid: 'BibliotecaLibre', wpa2: false },
      { ssid: 'WiFiAbierto', wpa2: false },
      { ssid: 'CafeGratis123', wpa2: false },
    ],
  },
  {
    options: [
      { ssid: 'HospitalWiFiLibre', wpa2: false },
      { ssid: 'CentroMedico_WPA2', wpa2: true },
      { ssid: 'ClínicaFreeWiFi', wpa2: false },
      { ssid: 'ParqueLibreNet', wpa2: false },
    ],
  },
  {
    options: [
      { ssid: 'RedLibrePizzeria', wpa2: false },
      { ssid: 'SupermercadoWiFi', wpa2: false },
      { ssid: 'Farmacia_Segura', wpa2: true },
      { ssid: 'BarZonaWiFi', wpa2: false },
    ],
  },
  {
    options: [
      { ssid: 'WiFiEstaciónLibre', wpa2: false },
      { ssid: 'TerminalWPA2Net', wpa2: true },
      { ssid: 'MetroGratis123', wpa2: false },
      { ssid: 'BusLibre', wpa2: false },
    ],
  },
];

export default function DetectaWifi() {
  const router = useRouter();
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [chosen, setChosen] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [finished, setFinished] = useState(false);

  const q = QUESTIONS[idx];

  const handleAnswer = (ssid: string) => {
    const selected = q.options.find(opt => opt.ssid === ssid);
    const correct = q.options.find(opt => opt.wpa2);

    if (selected?.wpa2) {
      setScore(score + 1);
      nextQuestion();
    } else {
      setFeedback(`La red más segura era: ${correct?.ssid}`);
      setTimeout(() => {
        setFeedback(null);
        nextQuestion();
      }, 1200);
    }
  };

  const nextQuestion = () => {
    if (idx + 1 < QUESTIONS.length) {
      setIdx(idx + 1);
      setChosen(null);
    } else {
      setFinished(true);
    }
  };

  const getFinalMessage = () => {
    if (score <= 2) {
      return 'Debes aprender más sobre redes Wi-Fi seguras. Revisa la sección de contenido.';
    } else if (score <= 4) {
      return '¡Bien hecho! Tienes una buena idea de lo que es una red segura.';
    } else {
      return '¡Excelente! Eres un experto en detectar redes Wi-Fi seguras.';
    }
  };

  if (finished) {
    return (
      <>
        <Stack.Screen options={{ title: 'Resultado del Juego' }} />
        <ThemedView style={styles.container}>
          <ThemedText type="title">¡Has terminado el juego!</ThemedText>
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
      <Stack.Screen options={{ title: 'Detecta Wi-Fi Falsas' }} />
      <ThemedView style={styles.container}>
        <ThemedText type="title">Red {idx + 1} de {QUESTIONS.length}</ThemedText>
        <ThemedText style={styles.question}>
          ¿Cuál de estas redes parece más segura?
        </ThemedText>

        {q.options.map(opt => (
          <TouchableOpacity
            key={opt.ssid}
            style={[
              styles.button,
              chosen === opt.ssid && styles.selected,
            ]}
            onPress={() => {
              setChosen(opt.ssid);
              handleAnswer(opt.ssid);
            }}
          >
            <ThemedText>{opt.ssid}</ThemedText>
          </TouchableOpacity>
        ))}

        {feedback && (
          <ThemedText style={styles.feedback}>{feedback}</ThemedText>
        )}
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  question: { marginVertical: 20, fontSize: 16, textAlign: 'center' },
  result: { fontSize: 16, color: '#e6e6e6', textAlign: 'center', marginTop: 10 },
  feedback: { marginTop: 20, fontSize: 16, color: 'orange', textAlign: 'center' },
  button: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: '#212121',
    borderRadius: 6,
    alignItems: 'center',
  },
  selected: { backgroundColor: '#aac' },
});

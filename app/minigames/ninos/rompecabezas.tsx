import { Stack, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const QUESTIONS = [
  {
    question: '¿Por qué no debes compartir tu contraseña?',
    options: [
      'Porque la puedo olvidar',
      'Porque es información secreta',
      'Porque es muy larga',
    ],
    answer: 1,
    explanation: 'Las contraseñas son secretas y solo tú debes conocerlas para proteger tus cuentas.'
  },
  {
    question: '¿Qué debes hacer si un desconocido te escribe en Internet?',
    options: [
      'Responderle rápido',
      'Ignorarlo y contárselo a un adulto',
      'Darle tu dirección',
    ],
    answer: 1,
    explanation: 'Nunca hables con desconocidos en Internet y cuéntale a un adulto si ocurre.'
  },
  {
    question: '¿Qué datos personales nunca debes compartir en Internet?',
    options: [
      'Tu nombre completo y dirección',
      'El nombre de tu mascota',
      'Tu color favorito',
    ],
    answer: 0,
    explanation: 'No compartas tu nombre completo, dirección ni información privada.'
  },
  {
    question: '¿Qué haces si ves algo raro o que te da miedo en la pantalla?',
    options: [
      'No digo nada',
      'Pido ayuda a un adulto de confianza',
      'Intento arreglarlo yo solo',
    ],
    answer: 1,
    explanation: 'Siempre pide ayuda a un adulto si ves algo extraño en Internet.'
  },
  {
    question: '¿Por qué no debes descargar aplicaciones sin permiso?',
    options: [
      'Porque pueden ser peligrosas',
      'Porque son aburridas',
      'Porque no tengo espacio',
    ],
    answer: 0,
    explanation: 'Algunas aplicaciones pueden ser peligrosas. Pide permiso a un adulto antes de descargar.'
  },
  {
    question: '¿Por qué es importante usar apodos en los juegos en línea?',
    options: [
      'Porque es divertido y protege mi identidad',
      'Para confundir a mis amigos',
      'Para ganar más puntos',
    ],
    answer: 0,
    explanation: 'Usar apodos te ayuda a mantener tu nombre real en secreto y estar más seguro.'
  },
  {
    question: '¿Está bien aceptar a cualquier persona como amigo en redes sociales?',
    options: [
      'Sí, mientras juegue conmigo',
      'No, solo a personas que conozco en la vida real',
      'Sí, si me manda un mensaje bonito',
    ],
    answer: 1,
    explanation: 'Solo acepta como amigos a personas que realmente conoces en la vida real.'
  },
  {
    question: '¿Qué debes hacer si recibes un mensaje con un enlace extraño?',
    options: [
      'Abrirlo rápido',
      'Ignorarlo o preguntar a un adulto',
      'Compartirlo con todos',
    ],
    answer: 1,
    explanation: 'No abras enlaces extraños, podrían ser peligrosos. Pregunta a un adulto.'
  },
  {
    question: '¿Qué es el ciberacoso?',
    options: [
      'Hacer amigos en Internet',
      'Molestar o insultar a alguien por Internet',
      'Jugar juegos en línea',
    ],
    answer: 1,
    explanation: 'El ciberacoso es molestar, insultar o hacer sentir mal a alguien usando Internet.'
  },
  {
    question: '¿Por qué hay que pensar antes de publicar algo?',
    options: [
      'Porque puede quedarse en Internet para siempre',
      'Porque lo borro cuando quiera',
      'Porque nadie lo ve',
    ],
    answer: 0,
    explanation: 'Todo lo que subes puede quedarse mucho tiempo en Internet. ¡Piensa antes de publicar!'
  },
];

export default function TriviaScreen() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const router = useRouter();

  const question = QUESTIONS[current];

  const handleOption = (idx: number) => {
    setSelected(idx);
    setShowExplanation(true);
  };

  const handleNext = () => {
    setSelected(null);
    setShowExplanation(false);
    if (current < QUESTIONS.length - 1) {
      setCurrent(current + 1);
    } else {
      router.back();
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Trivia de Seguridad' }} />
      <Text style={styles.question}>{question.question}</Text>
      {question.options.map((opt, idx) => (
        <TouchableOpacity
          key={idx}
          style={[
            styles.option,
            selected === idx
              ? (idx === question.answer ? styles.correct : styles.incorrect)
              : {},
          ]}
          onPress={() => handleOption(idx)}
          disabled={selected !== null}
        >
          <Text style={styles.optionText}>{opt}</Text>
        </TouchableOpacity>
      ))}
      {showExplanation && (
        <View style={styles.explanation}>
          <Text>
            {selected === question.answer
              ? '¡Correcto! '
              : 'Incorrecto. '}
            {question.explanation}
          </Text>
          <Button title={current < QUESTIONS.length - 1 ? 'Siguiente' : 'Terminar'} onPress={handleNext} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  question: { fontSize: 20, fontWeight: 'bold', marginBottom: 24 },
  option: {
    backgroundColor: '#f2f2f2',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  optionText: { fontSize: 16 },
  correct: { backgroundColor: '#b9f6ca', borderColor: '#00c853' },
  incorrect: { backgroundColor: '#ffccbc', borderColor: '#d84315' },
  explanation: { marginTop: 20, alignItems: 'center' },
});


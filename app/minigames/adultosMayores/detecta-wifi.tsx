// app/minigames/adultosMayores/detecta-wifi.tsx

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Stack, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, StyleSheet, TouchableOpacity } from 'react-native';

const NETWORKS = [
  { ssid: 'Biblioteca_Publica', wpa2: false },
  { ssid: 'Cafe_Seguro', wpa2: true },
  { ssid: 'MiWiFi_Free', wpa2: false },
];

export default function DetectaWifi() {
  const router = useRouter();
  const [chosen, setChosen] = useState<string | null>(null);

  const handleConnect = () => {
    const net = NETWORKS.find(n => n.ssid === chosen);
    if (net?.wpa2) {
      Alert.alert('Conexión segura', `Conectado a ${net.ssid}`, [{ text: 'Volver', onPress: () => router.back() }]);
    } else {
      Alert.alert('Red no segura', `Evita conectarte a ${net?.ssid}`, [{ text: 'Volver', onPress: () => router.back() }]);
    }
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Detecta Wi-Fi Falsas' }} />
      <ThemedView style={styles.container}>
        <ThemedText type="title">Elige la red más segura</ThemedText>
        {NETWORKS.map(n => (
          <TouchableOpacity
            key={n.ssid}
            style={[styles.network, chosen === n.ssid && styles.selected]}
            onPress={() => setChosen(n.ssid)}
          >
            <ThemedText>{n.ssid}</ThemedText>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          style={styles.connectBtn}
          disabled={!chosen}
          onPress={handleConnect}
        >
          <ThemedText>Conectar</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container:  { flex:1, padding:20, justifyContent:'center' },
  network:    { padding:12, marginVertical:6, backgroundColor:'#212121', borderRadius:6 },
  selected:   { backgroundColor:'#cce' },
  connectBtn: { marginTop:20, padding:12, backgroundColor:'#8f8', borderRadius:6, alignItems:'center' },
});

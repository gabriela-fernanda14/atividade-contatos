import React from 'react';
import { Stack } from "expo-router";
import { Pressable, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

export default function Layout() {
    const router = useRouter();

    return (

    <PaperProvider theme={DefaultTheme}>
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#B39DDB" },
        headerTintColor: "#fff", //
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "📱 Meus Contatos",
          headerRight: () => (
            <Pressable
              onPress={() => router.push("/settings")} 
              style={styles.gearButton}
            >
              <Text style={styles.gearText}>⚙️</Text>
            </Pressable>
          ),
        }}
      />
      <Stack.Screen
        name="settings"
        options={{ title: "⚙️ Configurações" }} 
      />
    </Stack>
    </PaperProvider>
  );
}

// Estilos aplicados
const styles = StyleSheet.create({
  gearButton: {
    marginRight: 16, 
  },
  gearText: {
    color: "#fff", 
    fontSize: 18, 
  },
});
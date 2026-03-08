import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View, Pressable, Linking } from 'react-native';

const WEB_URL = process.env.EXPO_PUBLIC_WEB_URL || 'http://localhost:3000';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>MegaXolotls Expo Bridge</Text>
        <Text style={styles.subtitle}>
          Expo-ready shell that can deep-link into the web app until native screens are expanded.
        </Text>

        <Pressable style={styles.button} onPress={() => Linking.openURL(WEB_URL)}>
          <Text style={styles.buttonText}>Open MegaXolotls</Text>
        </Pressable>

        <Text style={styles.note}>Set EXPO_PUBLIC_WEB_URL to your deployed URL. Defaults to localhost:3000.</Text>
      </View>
      <StatusBar style="light" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1f1536',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    width: '100%',
    maxWidth: 420,
    borderRadius: 24,
    padding: 20,
    backgroundColor: '#2f1f50',
    borderWidth: 1,
    borderColor: 'rgba(255, 173, 208, 0.5)',
  },
  title: {
    color: '#ffe9f3',
    fontSize: 28,
    fontWeight: '800',
  },
  subtitle: {
    marginTop: 12,
    color: '#f8d7ea',
    fontSize: 14,
    lineHeight: 20,
  },
  button: {
    marginTop: 24,
    borderRadius: 14,
    paddingVertical: 12,
    backgroundColor: '#ec4899',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
  },
  note: {
    marginTop: 14,
    color: '#f8d7ea',
    fontSize: 12,
    opacity: 0.85,
  },
});

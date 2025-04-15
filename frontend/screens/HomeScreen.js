import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.centerContainer}>
        <TouchableOpacity style={styles.customButton} onPress={() => navigation.navigate('Bejelentkezes')}>
          <Text style={styles.buttonText}>Bejelentkezés</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.customButton} onPress={() => navigation.navigate('Regisztralas')}>
          <Text style={styles.buttonText}>Regisztrálás</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.customButton} onPress={() => navigation.navigate('Fomenu')}>
          <Text style={styles.buttonText}>Folytatás vendégként</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dde6f0', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerContainer: {
    width: 320,
    padding: 30,
    backgroundColor: '#2b6cb0', 
    alignItems: 'center',
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6, 
  },
  customButton: {
    width: '100%',
    backgroundColor: '#ffffff', 
    paddingVertical: 15,
    marginVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
  },
  buttonText: {
    color: 'black',
    fontSize: 20, 
    fontWeight: 'bold',
  },
});

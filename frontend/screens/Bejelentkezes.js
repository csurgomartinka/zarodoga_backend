import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ipcim from './Ipcim';

const Bejelentkezes = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });

  // Bejelentkezés kezelése
  const handleLogin = async () => {
    let valid = true;
    let newErrors = { email: '', password: '' };

    if (!email) {
      newErrors.email = 'Az e-mail megadása kötelező';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Érvénytelen e-mail cím';
      valid = false;
    }
    if (!password) {
      newErrors.password = 'A jelszó megadása kötelező';
      valid = false;
    }

    setErrors(newErrors);

    if (valid) {
      try {
        const response = await fetch(Ipcim.Ipcim + 'login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
          const userData = { id: data.id, jogosultsag: data.jogosultsag, email: data.email };
          await AsyncStorage.setItem('userToken', JSON.stringify(userData));
          navigation.navigate('Bejelentkezett');
        } else {
          Alert.alert('Hiba', data || 'Hiba történt a bejelentkezés során.');
        }
      } catch (error) {
        console.error('Hálózati hiba:', error);
        Alert.alert('Hiba', 'Hiba történt a hálózati kapcsolat során.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.loginBox}>
        <Text style={styles.header}>Bejelentkezés</Text>

        <TextInput
          style={styles.input}
          placeholder="E-mail"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        {errors.email ? <Text style={styles.error}>{errors.email}</Text> : null}

        <TextInput
          style={styles.input}
          placeholder="Jelszó"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        {errors.password ? <Text style={styles.error}>{errors.password}</Text> : null}

        <TouchableOpacity onPress={() => navigation.navigate("ElfelejtettJelszo")}>
          <Text style={styles.forgotPassword}>Elfelejtettem a jelszavam</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Bejelentkezés</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dde6f0',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loginBox: {
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
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  input: {
    width: '100%', 
    padding: 14,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    backgroundColor: '#ffffff',
    fontSize: 16,
  },
  error: {
    color: 'red',
    alignSelf: 'flex-start',
    marginLeft: 10,
    marginBottom: 5,
    fontSize: 14,
  },
  forgotPassword: {
    color: '#f1c40f',
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  button: {
    width: '100%',
    backgroundColor: '#ffffff',
    paddingVertical: 14,
    marginTop: 20,
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
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Bejelentkezes;

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ipcim from './Ipcim';

const Bejelentkezes = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });

  const handleLogin = async () => {
    let valid = true;
    let newErrors = {
      email: '',
      password: ''
    };
  
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
          // Elmentjük a userToken mellett a jogosultságot is
          const userData = {
            id: data.id,
            jogosultsag: data.jogosultsag,
            email: data.email
          };
  
          await AsyncStorage.setItem('userToken', JSON.stringify(userData));
  
          Alert.alert('Sikeres bejelentkezés');
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
        <Text>Elfelejtettem a jelszavam</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Bejelentkezés</Text>
      </TouchableOpacity>
      
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Bejelentkezes;

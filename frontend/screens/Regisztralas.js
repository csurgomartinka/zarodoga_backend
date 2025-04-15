import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import Ipcim from './Ipcim';

const Regisztralas = ({navigation}) => {
  const jogosultsag = "felhasználó"
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });

  // Regisztráció kezelése
  const handleRegister = async () => {
    let valid = true;
    let newErrors = {
      email: '',
      password: ''
    };

    // Validáció
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
    } else {
      if (password.length < 5) {
        newErrors.password = 'A jelszónak legalább 5 karakter hosszúnak kell lennie';
        valid = false;
      } else if (!/[A-Z]/.test(password)) {
        newErrors.password = 'A jelszónak tartalmaznia kell legalább egy nagybetűt';
        valid = false;
      } else if (!/[0-9]/.test(password)) {
        newErrors.password = 'A jelszónak tartalmaznia kell legalább egy számot';
        valid = false;
      }
    }

    setErrors(newErrors);

    
    if (valid) {
      try {
        const response = await fetch(Ipcim.Ipcim + 'register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
            jogosultsag
          }),
        });

        const data = await response.json();

        if (response.ok) {
          Alert.alert('Sikeres regisztráció', data.message);
          navigation.navigate('Bejelentkezes')
        } else {
          Alert.alert('Hiba', data.message || 'Hiba történt a regisztráció során.');
        }
      } catch (error) {
        console.error('Hálózati hiba:', error);
        Alert.alert('Hiba', 'Hiba történt a hálózati kapcsolat során.');
      }
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Regisztráció</Text>

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

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Regisztrálok</Text>
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

export default Regisztralas
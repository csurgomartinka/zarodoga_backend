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

    // Ha minden mező helyes, regisztrálás
    if (valid) {
      try {
        // API hívás a regisztrációhoz a fetch használatával
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
          // Sikeres regisztráció után
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
      <View style={styles.registerBox}>
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
  registerBox: {
    width: 320,
    padding: 30,
    backgroundColor: '#2b6cb0', // Sötétkék háttér
    alignItems: 'center',
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6, // Android árnyék
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: 'white',
  },
  input: {
    width: '100%', 
    padding: 14,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    backgroundColor: '#f9f9f9',
    fontSize: 16,
  },
  error: {
    color: 'red',
    marginBottom: 10,
    fontSize: 14,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 12,
    marginTop: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});


export default Regisztralas
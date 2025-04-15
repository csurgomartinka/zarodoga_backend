import React from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useState, useEffect } from 'react';
import Ipcim from './Ipcim';

export default function UjJelszoBeallitasa({ navigation, route }) { // route paraméter hozzáadva
    const [email, setEmail] = useState('');
    const [jelszo, setJelszo] = useState('');
    const [ujjelszo, setUjjelszo] = useState('');
    const [errors, setErrors] = useState({
        jelszo: ''
    });

    const jelszoModositas = async () => {
        let valid = true;
        let newErrors = {
            jelszo: ''
        };

        if (jelszo === "" || ujjelszo === "") {
            newErrors.jelszo = "A jelszó megadása kötelező!";
            valid = false;
        } else {
            if (jelszo.length < 5) {
                newErrors.jelszo = 'A jelszónak legalább 5 karakter hosszúnak kell lennie';
                valid = false;
            } else if (!/[A-Z]/.test(jelszo)) {
                newErrors.jelszo = 'A jelszónak tartalmaznia kell legalább egy nagybetűt';
                valid = false;
            } else if (!/[0-9]/.test(jelszo)) {
                newErrors.jelszo = 'A jelszónak tartalmaznia kell legalább egy számot';
                valid = false;
            }
        }

        if (jelszo !== ujjelszo) {
            newErrors.jelszo = "A két jelszó nem egyezik!";
            valid = false;
        }

        setErrors(newErrors);

        if (valid) {
            try {
                const response = await fetch(Ipcim.Ipcim + 'jelszoModositas', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email,
                        jelszo
                    }),
                });

                const data = await response.json();

                if (response.ok) {
                    Alert.alert('Sikeres jelszó módosítás!', data.message);
                    navigation.navigate('Bejelentkezes');
                } else {
                    Alert.alert('Hiba', data.message || 'Hiba történt a jelszó módosítás során.');
                }
            } catch (error) {
                console.error('Hálózati hiba:', error);
                Alert.alert('Hiba', 'Hiba történt a hálózati kapcsolat során.');
            }
        }
    };

    useEffect(() => {
        if (route.params?.email) {
            setEmail(route.params.email);
        }
    }, [route.params?.email]);

    return (
        <View>
            <Text>Új jelszó</Text>
            <TextInput
                placeholder="Jelszó"
                value={jelszo}
                secureTextEntry
                onChangeText={setJelszo}
            />
            {errors.jelszo ? <Text style={{ color: 'red' }}>{errors.jelszo}</Text> : null}

            <Text>Új jelszó megint</Text>
            <TextInput
                placeholder="Jelszó megint"
                value={ujjelszo}
                secureTextEntry
                onChangeText={setUjjelszo}
            />
            {errors.jelszo ? <Text style={{ color: 'red' }}>{errors.jelszo}</Text> : null}

            <Button title='Küldés' onPress={jelszoModositas} />
        </View>
    );
}
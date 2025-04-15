import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import Ipcim from './Ipcim';

export default function UjJelszoBeallitasa({ navigation, route }) {
    const [email, setEmail] = useState('');
    const [jelszo, setJelszo] = useState('');
    const [ujjelszo, setUjjelszo] = useState('');
    const [errors, setErrors] = useState({ jelszo: '' });
    const [showPassword, setShowPassword] = useState(false);

    const jelszoModositas = async () => {
        let valid = true;
        let newErrors = { jelszo: '' };

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
        <View style={styles.container}>
            <View style={styles.card}>
                <MaterialCommunityIcons 
                    name="lock-reset" 
                    size={50} 
                    color="#0056b3" 
                    style={styles.icon}
                />
                
                <Text style={styles.title}>Új jelszó beállítása</Text>
                <Text style={styles.subtitle}>Kérjük, adj meg egy erős jelszót</Text>
                
                <View style={styles.inputContainer}>
                    <MaterialCommunityIcons 
                        name="lock" 
                        size={20} 
                        color="#0056b3" 
                        style={styles.inputIcon}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Új jelszó"
                        placeholderTextColor="#888"
                        value={jelszo}
                        secureTextEntry={!showPassword}
                        onChangeText={setJelszo}
                    />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <MaterialCommunityIcons 
                            name={showPassword ? "eye-off" : "eye"} 
                            size={20} 
                            color="#888" 
                        />
                    </TouchableOpacity>
                </View>
                
                <View style={styles.inputContainer}>
                    <MaterialCommunityIcons 
                        name="lock" 
                        size={20} 
                        color="#0056b3" 
                        style={styles.inputIcon}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Új jelszó megerősítése"
                        placeholderTextColor="#888"
                        value={ujjelszo}
                        secureTextEntry={!showPassword}
                        onChangeText={setUjjelszo}
                    />
                </View>
                
                {errors.jelszo ? (
                    <View style={styles.errorContainer}>
                        <MaterialCommunityIcons 
                            name="alert-circle" 
                            size={20} 
                            color="#dc3545" 
                        />
                        <Text style={styles.errorText}>{errors.jelszo}</Text>
                    </View>
                ) : null}
                
                <View style={styles.passwordRules}>
                    <Text style={styles.ruleText}>A jelszónak tartalmaznia kell:</Text>
                    <Text style={jelszo.length >= 5 ? styles.ruleValid : styles.ruleInvalid}>
                        ✓ Legalább 5 karaktert
                    </Text>
                    <Text style={/[A-Z]/.test(jelszo) ? styles.ruleValid : styles.ruleInvalid}>
                        ✓ Legalább 1 nagybetűt
                    </Text>
                    <Text style={/[0-9]/.test(jelszo) ? styles.ruleValid : styles.ruleInvalid}>
                        ✓ Legalább 1 számot
                    </Text>
                </View>
                
                <TouchableOpacity 
                    style={styles.button} 
                    onPress={jelszoModositas}
                >
                    <Text style={styles.buttonText}>Jelszó módosítása</Text>
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
        padding: 20,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
        alignItems: 'center',
    },
    icon: {
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#0056b3',
        marginBottom: 5,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#555',
        marginBottom: 25,
        textAlign: 'center',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 15,
    },
    inputIcon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        height: 50,
        fontSize: 16,
        color: '#333',
    },
    button: {
        backgroundColor: '#007bff',
        paddingVertical: 14,
        paddingHorizontal: 30,
        borderRadius: 8,
        width: '100%',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
        marginTop: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    errorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f8d7da',
        padding: 10,
        borderRadius: 5,
        marginBottom: 15,
        width: '100%',
    },
    errorText: {
        color: '#dc3545',
        marginLeft: 10,
        fontSize: 14,
    },
    passwordRules: {
        width: '100%',
        marginTop: 10,
        padding: 10,
        backgroundColor: '#f8f9fa',
        borderRadius: 5,
    },
    ruleText: {
        color: '#6c757d',
        marginBottom: 5,
        fontWeight: 'bold',
    },
    ruleValid: {
        color: '#28a745',
        marginLeft: 10,
        marginBottom: 3,
    },
    ruleInvalid: {
        color: '#6c757d',
        marginLeft: 10,
        marginBottom: 3,
    },
});
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Ipcim from './Ipcim';

export default function ElfelejtettJelszoKod({ navigation, route }) {
    const [kod, setKod] = useState("");
    const [elkuldottkod, setElkuldottkod] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const generateRandomCode = () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let code = '';
        for (let i = 0; i < 6; i++) {
            code += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        setElkuldottkod(code);
        return code;
    };

    const sendResetCodeTo = async (emailToSend, code) => {
        setLoading(true);
        try {
            const response = await axios.post(Ipcim.Ipcim + 'send-email',
                { email: emailToSend, resetCode: code },
                { headers: { 'Content-Type': 'application/json' } }
            );
            setElkuldottkod(code); // csak itt állítsd be a kódot, ha biztos sikeres volt
            setEmail(emailToSend); // itt állítsd be az emailt is
            console.log(response.data);
            Alert.alert("Siker", "A kódot elküldtük az email címedre!");
        } catch (error) {
            console.error('Error sending reset code:', error);
            Alert.alert("Hiba", error.response?.data?.message || "Nem sikerült elküldeni a kódot");
        } finally {
            setLoading(false);
        }
    };

  useEffect(() => {
    if (route.params?.email) {
        const newCode = generateRandomCode();
        sendResetCodeTo(route.params.email, newCode);
    }
}, [route.params?.email]);

    const handleCodeVerification = () => {
        if (!kod) {
            Alert.alert("Hiányzó adat", "Kérjük, add meg a kapott kódot!");
            return;
        }

        if (kod === elkuldottkod) {
            navigation.navigate("UjJelszoBeallitasa", { email: email });
        } else {
            Alert.alert("Hibás kód", "A megadott kód nem megfelelő. Kérjük, ellenőrizd újra!");
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <MaterialCommunityIcons 
                    name="email-check" 
                    size={50} 
                    color="#0056b3" 
                    style={styles.icon}
                />
                
                <Text style={styles.title}>Ellenőrző kód</Text>
                <Text style={styles.subtitle}>Küldtünk egy 6 karakteres kódot az email címedre</Text>
                <Text style={styles.emailText}>{email}</Text>
                
                <View style={styles.inputContainer}>
                    <MaterialCommunityIcons 
                        name="lock" 
                        size={20} 
                        color="#0056b3" 
                        style={styles.inputIcon}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Írd be a kódot"
                        placeholderTextColor="#888"
                        value={kod}
                        onChangeText={setKod}
                        maxLength={6}
                        keyboardType="default"
                        autoCapitalize="characters"
                    />
                </View>
                
                {loading ? (
                    <ActivityIndicator size="large" color="#0056b3" style={styles.loader} />
                ) : (
                    <TouchableOpacity 
                        style={styles.button} 
                        onPress={handleCodeVerification}
                        disabled={loading}
                    >
                        <Text style={styles.buttonText}>Ellenőrzés</Text>
                    </TouchableOpacity>
                )}
                
                <TouchableOpacity 
                    style={styles.resendButton} 
                    onPress={() => {
                        const newCode = generateRandomCode();
                        sendResetCodeTo(email, newCode);
                    }}
                    disabled={loading}
                >
                    <Text style={styles.resendButtonText}>Új kód küldése</Text>
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
        marginBottom: 5,
        textAlign: 'center',
    },
    emailText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
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
        marginBottom: 20,
    },
    inputIcon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        height: 50,
        fontSize: 16,
        color: '#333',
        letterSpacing: 2,
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
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    loader: {
        marginVertical: 20,
    },
    resendButton: {
        marginTop: 15,
    },
    resendButtonText: {
        color: '#007bff',
        fontSize: 14,
        textDecorationLine: 'underline',
    },
});
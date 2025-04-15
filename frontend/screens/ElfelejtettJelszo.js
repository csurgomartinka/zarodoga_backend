import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Ipcim from './Ipcim';

export default function ElfelejtettJelszo({ navigation }) {
    const [email, setEmail] = useState('');
    const [adatok, setAdatok] = useState([]);
    const [loading, setLoading] = useState(false);
    const [fetched, setFetched] = useState(false);

    useEffect(() => {
        if (!fetched && !loading) {
            setLoading(true);
            fetch(Ipcim.Ipcim + 'felhasznaloLista', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then(response => response.json())
            .then(data => {
                setAdatok(data);
                setLoading(false);
                setFetched(true);
            })
            .catch(error => {
                console.error('Hiba történt a lekérésnél:', error);
                setLoading(false);
            });
        }
    }, [fetched, loading]);

    const checkEmailExists = (emailToCheck) => {
        const isEmailExists = adatok.some(item => item.email === emailToCheck);
        if (isEmailExists) {
            navigation.navigate("ElfelejtettJelszoKod", { email: email });
        } else {
            alert("Ez az email cím még nincs regisztrálva");
        }
    };

    const handleEmailCheck = () => {
        if (!fetched || loading) {
            alert("Az adatok még betöltés alatt vannak. Kérjük, várjon!");
            return;
        }
        
        if (!email) {
            alert("Kérjük, adja meg az email címét!");
            return;
        }
        
        checkEmailExists(email);
    };

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <MaterialCommunityIcons 
                    name="lock-reset" 
                    size={50} 
                    color="#0056b3" 
                    style={styles.icon}
                />
                
                <Text style={styles.title}>Elfelejtett jelszó</Text>
                <Text style={styles.subtitle}>Add meg a regisztrált email címed</Text>
                
                <View style={styles.inputContainer}>
                    <MaterialCommunityIcons 
                        name="email" 
                        size={20} 
                        color="#0056b3" 
                        style={styles.inputIcon}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Email cím"
                        placeholderTextColor="#888"
                        value={email}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        onChangeText={setEmail}
                    />
                </View>
                
                {loading ? (
                    <ActivityIndicator size="large" color="#0056b3" style={styles.loader} />
                ) : (
                    <TouchableOpacity 
                        style={styles.button} 
                        onPress={handleEmailCheck}
                        disabled={loading}
                    >
                        <Text style={styles.buttonText}>Küldés</Text>
                    </TouchableOpacity>
                )}
                
                <TouchableOpacity 
                    style={styles.backButton} 
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.backButtonText}>Vissza a bejelentkezéshez</Text>
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
    backButton: {
        marginTop: 20,
    },
    backButtonText: {
        color: '#007bff',
        fontSize: 14,
        textDecorationLine: 'underline',
    },
});
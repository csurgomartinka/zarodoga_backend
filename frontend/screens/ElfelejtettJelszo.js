import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Ipcim from './Ipcim';

export default function ElfelejtettJelszo({ navigation }) {
    const [email, setEmail] = useState('');
    const [adatok, setAdatok] = useState([]);
    const [loading, setLoading] = useState(false); // A betöltési állapot
    const [fetched, setFetched] = useState(false); // Jelzi, hogy a fetch már megtörtént

    // Fetch az adatok betöltéséhez
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
                setAdatok(data); // Betöltjük az adatokat
                setLoading(false); // Betöltési állapot vége
                setFetched(true); // Jelzés, hogy a fetch megtörtént
            })
            .catch(error => {
                console.error('Hiba történt a lekérésnél:', error);
                setLoading(false); // Ha hiba történt, a betöltési állapotot befejezzük
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
        checkEmailExists(email);
    };

    return (
        <View>
            <Text>Add meg az email címed</Text>
            <TextInput
                placeholder="Email cím"
                value={email}
                keyboardType="email-address"
                onChangeText={setEmail}
            />
            <Button title='Küldés' onPress={handleEmailCheck} disabled={loading} />
        </View>
    );
}
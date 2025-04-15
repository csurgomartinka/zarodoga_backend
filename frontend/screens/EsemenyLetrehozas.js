import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Button, StyleSheet, TextInput, ScrollView, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import Ipcim from './Ipcim';

const EsemenyLetrehozas = ({ navigation }) => {
    const [elsoPicker, setElsoPicker] = useState([]);
    const [elsoPickerValue, setElsoPickerValue] = useState("");
    const [masodikPicker, setMasodikPicker] = useState([]);
    const [masodikPickerValue, setMasodikPickerValue] = useState("");
    const [nev, setNev] = useState("");
    const [varos, setVaros] = useState("");
    const [leiras, setLeiras] = useState("");
    const [reszletek, setReszletek] = useState("");
    const [helyszin, setHelyszin] = useState("");
    const [userEmail, setUserEmail] = useState("");

    const [dateFrom, setDateFrom] = useState(new Date());
    const [dateTo, setDateTo] = useState(new Date());

    const elsoPickerBackend = Ipcim.Ipcim + 'varosLista';
    const masodikPickerBackend = Ipcim.Ipcim + 'tipusLista';

    
    useFocusEffect(
        useCallback(() => {
            const loadUser = async () => {
                try {
                    const storedUser = await AsyncStorage.getItem('userToken');
                    if (storedUser) {
                        const parsedUser = JSON.parse(storedUser);
                        setUserEmail(parsedUser.email);  // 🔹 Itt állítjuk be az e-mailt
                        //console.log("Bejelentkezett felhasználó:", parsedUser.email);
                    }
                } catch (error) {
                    console.error("Hiba a felhasználói adatok lekérésekor:", error);
                }
            };
            loadUser();
        }, [])
    );
    
    useEffect(() => {
        fetch(elsoPickerBackend)
            .then(res => res.json())
            .then(data => setElsoPicker(data))
            .catch(error => console.error('Hiba a városok betöltésekor:', error));

        fetch(masodikPickerBackend)
            .then(res => res.json())
            .then(data => setMasodikPicker(data))
            .catch(error => console.error('Hiba a típusok betöltésekor:', error));
    }, []);

    const validateForm = () => {
        if (!nev.trim()) {
            Alert.alert("Hiba", "Az esemény neve nem lehet üres.");
            return false;
        }
        if (!dateFrom || !dateTo) {
            Alert.alert("Hiba", "A dátumokat ki kell választani.");
            return false;
        }
        if (dateTo < dateFrom){
            Alert.alert("A végdátumnak nem lehet korábbinak lennie, mint a kezdődátum.");
            return false;
        }
        if (elsoPickerValue === "Sajatvaros" && !varos.trim()) {
            Alert.alert("Hiba", "Add meg a saját városodat.");
            return false;
        }
        if (elsoPickerValue !== "Sajatvaros" && varos.trim()) {
            Alert.alert("Hiba", "Válassz várost a listából, vagy add meg sajátot, ne mindkettőt.");
            return false;
        }
        if (!helyszin.trim()) {
            Alert.alert("Hiba", "A helyszín nem lehet üres.");
            return false;
        }
        return true;
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;

        const finalVaros = elsoPickerValue === "Sajatvaros" ? varos : elsoPickerValue;
        const finalTipus = masodikPickerValue === "Sajattipus" ? masodikPickerValue : masodikPickerValue;

        try {
            const response = await fetch(Ipcim.Ipcim + 'felhasznaloEsemenyFelvitel', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nev,
                    datum_mettol: dateFrom.toISOString().split('T')[0],
                    datum_meddig: dateTo.toISOString().split('T')[0],
                    varos: finalVaros,
                    tipus: finalTipus,
                    leiras,
                    reszletek,
                    helyszin,
                    felhasznalo: userEmail, 
                    elfogadott: 0
                }),
            });

            if (response.ok) {
                Alert.alert("Siker", "Az esemény létrehozása sikeres!");
                navigation.goBack();
            } else {
                const errorText = await response.text();
                Alert.alert("Hiba", `Hiba történt: ${errorText}`);
            }
        } catch (error) {
            console.error('Hiba:', error);
            Alert.alert("Hiba", "Nem sikerült elküldeni az adatokat.");
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                <Text>Esemény neve</Text>
                <TextInput style={styles.textinput} value={nev} onChangeText={setNev} />

                <Text>Dátum</Text>
                <DateTimePicker 
                    value={dateFrom} 
                    mode="date" 
                    display="default" 
                    onChange={(event, date) => {
                        if (date) setDateFrom(date);
                    }} 
                />
                <DateTimePicker 
                    value={dateTo} 
                    mode="date" 
                    display="default" 
                    onChange={(event, date) => {
                        if (date) setDateTo(date);
                    }} 
                />

                <Text>Város</Text>
                <Picker
                    style={styles.picker}
                    selectedValue={elsoPickerValue}
                    onValueChange={(itemValue) => setElsoPickerValue(itemValue)}
                >
                    <Picker.Item label="Saját megadása" value="Sajatvaros" />
                    {elsoPicker.map((item, index) => (
                        <Picker.Item key={index} label={item.vnev} value={item.vnev} />
                    ))}
                </Picker>
                <TextInput
                    style={styles.textinput}
                    value={varos}
                    onChangeText={(text) => setVaros(text)}
                />

                <Text>Típus</Text>
                <Picker
                    style={styles.picker}
                    selectedValue={masodikPickerValue}
                    onValueChange={(itemValue) => setMasodikPickerValue(itemValue)}
                >
                    {masodikPicker.map((item, index) => (
                        <Picker.Item key={index} label={item.tipus_nev} value={item.tipus_nev} />
                    ))}
                </Picker>

                <Text>Leírás</Text>
                <TextInput style={styles.textinput} value={leiras} onChangeText={setLeiras} multiline />

                <Text>Részletek</Text>
                <TextInput style={styles.textinput} value={reszletek} onChangeText={setReszletek} multiline />

                <Text>Helyszín</Text>
                <TextInput style={styles.textinput} value={helyszin} onChangeText={setHelyszin} />

                <Button title="Esemény létrehozása" onPress={handleSubmit} />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    header: {
        fontSize: 24,
        marginBottom: 20,
    },
    picker: {
        width: '100%', // A Picker szélessége
        height: 40,
        marginBottom: 200,
    },
    textinput: {
        width: '100%', // A TextInput szélessége
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 200,
        paddingLeft: 10,
    },
});

export default EsemenyLetrehozas;
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
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
    const [showDateFromPicker, setShowDateFromPicker] = useState(false);
    const [showDateToPicker, setShowDateToPicker] = useState(false);

    const elsoPickerBackend = Ipcim.Ipcim + 'varosLista';
    const masodikPickerBackend = Ipcim.Ipcim + 'tipusLista';

    useFocusEffect(
        useCallback(() => {
            const loadUser = async () => {
                try {
                    const storedUser = await AsyncStorage.getItem('userToken');
                    if (storedUser) {
                        const parsedUser = JSON.parse(storedUser);
                        setUserEmail(parsedUser.email);
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
            Alert.alert("Hiba", "A végdátumnak nem lehet korábbinak lennie, mint a kezdődátum.");
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
        const finalTipus = masodikPickerValue;

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

    const formatDate = (date) => {
        return date.toLocaleDateString('hu-HU', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.header}>Új esemény létrehozása</Text>
                
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Esemény neve</Text>
                    <TextInput 
                        style={styles.input} 
                        value={nev} 
                        onChangeText={setNev} 
                        placeholder="Esemény neve"
                        placeholderTextColor="#888"
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Dátum</Text>
                    <TouchableOpacity 
                        style={styles.dateInput} 
                        onPress={() => setShowDateFromPicker(true)}
                    >
                        <MaterialCommunityIcons name="calendar" size={20} color="#0056b3" />
                        <Text style={styles.dateText}>{formatDate(dateFrom)}</Text>
                    </TouchableOpacity>
                    {showDateFromPicker && (
                        <DateTimePicker 
                            value={dateFrom} 
                            mode="date" 
                            display="default" 
                            onChange={(event, date) => {
                                setShowDateFromPicker(false);
                                if (date) setDateFrom(date);
                            }} 
                        />
                    )}

                    <Text style={styles.label}>Végdátum</Text>
                    <TouchableOpacity 
                        style={styles.dateInput} 
                        onPress={() => setShowDateToPicker(true)}
                    >
                        <MaterialCommunityIcons name="calendar" size={20} color="#0056b3" />
                        <Text style={styles.dateText}>{formatDate(dateTo)}</Text>
                    </TouchableOpacity>
                    {showDateToPicker && (
                        <DateTimePicker 
                            value={dateTo} 
                            mode="date" 
                            display="default" 
                            onChange={(event, date) => {
                                setShowDateToPicker(false);
                                if (date) setDateTo(date);
                            }} 
                        />
                    )}
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Város</Text>
                    <Picker
                        style={styles.picker}
                        selectedValue={elsoPickerValue}
                        onValueChange={(itemValue) => setElsoPickerValue(itemValue)}
                    >
                        <Picker.Item label="Saját város megadása" value="Sajatvaros" />
                        {elsoPicker.map((item, index) => (
                            <Picker.Item key={index} label={item.vnev} value={item.vnev} />
                        ))}
                    </Picker>
                    
                    {elsoPickerValue === "Sajatvaros" && (
                        <TextInput
                            style={styles.input}
                            value={varos}
                            onChangeText={setVaros}
                            placeholder="Írd be a város nevét"
                            placeholderTextColor="#888"
                        />
                    )}
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Esemény típusa</Text>
                    <Picker
                        style={styles.picker}
                        selectedValue={masodikPickerValue}
                        onValueChange={(itemValue) => setMasodikPickerValue(itemValue)}
                    >
                        {masodikPicker.map((item, index) => (
                            <Picker.Item key={index} label={item.tipus_nev} value={item.tipus_nev} />
                        ))}
                    </Picker>
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Leírás</Text>
                    <TextInput 
                        style={[styles.input, styles.multilineInput]} 
                        value={leiras} 
                        onChangeText={setLeiras} 
                        multiline
                        placeholder="Rövid leírás az eseményről"
                        placeholderTextColor="#888"
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Részletek</Text>
                    <TextInput 
                        style={[styles.input, styles.multilineInput]} 
                        value={reszletek} 
                        onChangeText={setReszletek} 
                        multiline
                        placeholder="Részletes információk"
                        placeholderTextColor="#888"
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Helyszín</Text>
                    <TextInput 
                        style={styles.input} 
                        value={helyszin} 
                        onChangeText={setHelyszin} 
                        placeholder="Pontos helyszín"
                        placeholderTextColor="#888"
                    />
                </View>

                <TouchableOpacity 
                    style={styles.submitButton}
                    onPress={handleSubmit}
                >
                    <Text style={styles.submitButtonText}>Esemény létrehozása</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#dde6f0',
        padding: 15,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#0056b3',
        marginBottom: 20,
        textAlign: 'center',
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
    },
    input: {
        backgroundColor: '#f9f9f9',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        color: '#333',
    },
    multilineInput: {
        minHeight: 100,
        textAlignVertical: 'top',
    },
    picker: {
        backgroundColor: '#f9f9f9',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
    },
    dateInput: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        marginBottom: 10,
    },
    dateText: {
        fontSize: 16,
        color: '#333',
        marginLeft: 10,
    },
    submitButton: {
        backgroundColor: '#28a745',
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3,
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default EsemenyLetrehozas;
import React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput} from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import Ipcim from './Ipcim';


const EsemenyScreen = ({ navigation }) => {
    const [adatok, setAdatok] = useState([]);
    const [text, setText] = useState([])
    const [elsoPicker, setElsoPicker] = useState([])
    const [masodikPicker, setMasodikPicker] = useState([])
    const [elsoPickerValue, setElsoPickerValue] = useState("")
    const [masodikPickerValue, setMasodikPickerValue] = useState("")
    const [noResults, setNoResults] = useState(false)

    const keresesbackend = Ipcim.Ipcim + 'esemenyKereses'
    const elsoPickerBackend = Ipcim.Ipcim + 'varosLista'
    const varosSzerintKereses = Ipcim.Ipcim + 'varosSzerintKereses'
    const masodikPickerBackend = Ipcim.Ipcim + 'tipusLista'
    const tipusSzerintKereses = Ipcim.Ipcim + 'tipusSzerintKereses'
    const kozosKereses = Ipcim.Ipcim + 'kozosKereses'

    const EsemenyOldalaMegjelenit = (item) => {
        navigation.navigate('EsemenyOldala', { adatok: item })
    }

    const Betoltes = async () => {
        try {
            const response = await fetch(Ipcim.Ipcim + 'adatokListaM')
            const data = await response.json()
            setAdatok(data)
            setNoResults(data.length === 0)
        } catch (error) {
            console.log("Hiba:", error)
        }
    }

    const TextChange = async (inputText) => {
        setText(inputText)
        if (inputText == "") {
            Betoltes()
        }
        else {
            try {
                const response = await fetch(`${keresesbackend}?query=${inputText}`)
                const data = await response.json()
                setAdatok(data)
                setNoResults(data.length === 0)
            } catch (error) {
                console.error("Hiba történt az események lekérésekor:", error)
            }
        }
    }

    const elsoPickerChange = async (itemValue) => {
        if (itemValue == "Összes" && masodikPickerValue == "összes") {
            setElsoPickerValue(itemValue)
            Betoltes()
        }
        else if (masodikPickerValue == "összes" && itemValue != "Összes") {
            console.log("Kiválaszott érték:", itemValue)
            setElsoPickerValue(itemValue)
            try {
                const response = await fetch(`${varosSzerintKereses}?value=${itemValue}`)
                const data = await response.json()
                setAdatok(data)
                setNoResults(data.length === 0)
                //console.log('Első Picker adat:',data)
            } catch (error) {
                console.error('Hiba történt az első picker adatainak lekérésekor:', error)
            }
        }
        else if (masodikPickerValue != "összes" && itemValue == "Összes") {
            setElsoPickerValue(itemValue)
            try {
                const response = await fetch(`${tipusSzerintKereses}?value=${masodikPickerValue}`)
                const data = await response.json()
                setAdatok(data)
                setNoResults(data.length === 0)
            } catch (error) {
                console.error('Hiba történt a második picker adatainak lekérésekor:', error)
            }
        }
        else if (masodikPickerValue != "összes" && itemValue != "Összes") {
            setElsoPickerValue(itemValue)
            try {
                const response = await fetch(`${kozosKereses}?tipus=${masodikPickerValue}&varos=${itemValue}`)
                const data = await response.json()
                setAdatok(data)
                setNoResults(data.length === 0)
            } catch (error) {
                console.error('Hiba történt:', error)
            }
        }
    }

    const masodikPickerChange = async (itemValue) => {
        if (itemValue == "összes" && elsoPickerValue == "Összes") {
            setMasodikPickerValue(itemValue)
            Betoltes()
        }
        else if (elsoPickerValue == "Összes" && itemValue != "összes") {
            console.log("Kiválaszott érték:", itemValue)
            setMasodikPickerValue(itemValue)
            try {
                const response = await fetch(`${tipusSzerintKereses}?value=${itemValue}`)
                const data = await response.json()
                setAdatok(data)
                setNoResults(data.length === 0)
            } catch (error) {
                console.error('Hiba történt a második picker adatainak lekérésekor:', error)
            }
        }
        else if (elsoPickerValue != "Összes" && itemValue == "összes") {
            setMasodikPickerValue(itemValue)
            try {
                const response = await fetch(`${varosSzerintKereses}?value=${elsoPickerValue}`)
                const data = await response.json()
                setAdatok(data)
                setNoResults(data.length === 0)
                //console.log('Első Picker adat:',data)
            } catch (error) {
                console.error('Hiba történt az első picker adatainak lekérésekor:', error)
            }
        }
        else if (elsoPickerValue != "Összes" && itemValue != "összes") {
            setMasodikPickerValue(itemValue)
            try {
                const response = await fetch(`${kozosKereses}?tipus=${itemValue}&varos=${elsoPickerValue}`)
                const data = await response.json()
                setAdatok(data)
                setNoResults(data.length === 0)
            } catch (error) {
                console.error('Hiba történt:', error)
            }
        }
    }


    useEffect(() => {
        const elsoPickerFetch = async () => {
            try {
                const response = await fetch(elsoPickerBackend)
                const data = await response.json()
                setElsoPicker(data)
            } catch (error) {
                console.error('Hiba történt az első picker adatok lekérésekor:', error);
            }
        };

        const masodikPickerFetch = async () => {
            try {
                const response = await fetch(masodikPickerBackend)
                const data = await response.json()
                setMasodikPicker(data)
            } catch (error) {
                console.error('Hiba történt a második picker adatok lekérésekor:', error);
            }
        }

        axios.get(Ipcim.Ipcim + 'adatokListaM')
            .then(response => {
                setAdatok(response.data);
            })
            .catch(error => {
                console.error('Hiba történt az adatok lekérésekor:', error);
            });
        elsoPickerFetch()
        masodikPickerFetch()
        setElsoPickerValue("Összes")
        setMasodikPickerValue("összes")
    }, []);

    return (
        <View style={styles.container1}>
    <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.kijelentkezes} onPress={() => navigation.navigate('HomeScreen')}>
            <Text style={styles.kijelentkezestext}>Bejelentkezés/Regisztráció</Text>
        </TouchableOpacity>

        <TextInput
            style={styles.textInput}
            placeholder="Keresés eseményekre"
            value={text}
            onChangeText={TextChange}
        />

        <View style={styles.pickerContainer}>
            <Picker
                style={styles.picker}
                selectedValue={elsoPickerValue}
                onValueChange={elsoPickerChange}
            >
                <Picker.Item label='Összes' value="Összes" />
                {elsoPicker.map((item, index) => (
                    <Picker.Item key={index} label={item.vnev} value={item.vnev} />
                ))}
            </Picker>

            <Picker
                style={styles.picker}
                selectedValue={masodikPickerValue}
                onValueChange={masodikPickerChange}
            >
                <Picker.Item label='összes' value="összes" />
                {masodikPicker.map((item, index) => (
                    <Picker.Item key={index} label={item.tipus_nev} value={item.tipus_nev} />
                ))}
            </Picker>
        </View>

    </View>

    <View style={styles.listContainer}>
        {noResults ? (
            <Text style={styles.noResultsText}>Nem található ilyen esemény</Text>
        ) : (
            <FlatList
                data={adatok}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => EsemenyOldalaMegjelenit(item)} style={styles.eventItem}>
                        <View style={styles.adatokdoboz}>
                            <Text style={styles.eventName}>{item.nev}</Text>
                            <Text style={styles.eventDatevnev}>{item.vnev}</Text>
                            <Text style={styles.eventDate}>{item.helyszin_nev}</Text>
                            <Text style={styles.eventDatedatum}>{item.datum}</Text>
                            <Text style={styles.eventDateleiras}>{item.leiras}...</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        )}
    </View>
</View>
    );
};

const styles = StyleSheet.create({
    container1: {
        flex: 1,
        backgroundColor: '#dde6f0',
        padding: 20,
    },
    headerContainer: {
        width: '100%',
        marginBottom: 10,
    },
    kijelentkezes: {
        backgroundColor: '#007bff',
        paddingVertical: 14,
        paddingHorizontal: 30,
        borderRadius: 12,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
    kijelentkezestext: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    pickerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 150,
        
    },
    picker: {
        flex: 1,
        height: 40, 
        borderRadius: 6, 
        fontSize: 14, 
    },
    textInput: {
        height: 45,
        borderColor: '#9ccc65',
        borderWidth: 1,
        borderRadius: 6,
        paddingHorizontal: 10,
        backgroundColor: '#ffffff',
    },
    eventItem: {
        backgroundColor: '#ffffff',
        marginBottom: 12,
        borderRadius: 10,
        padding: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    adatokdoboz: {
        paddingBottom: 5,
    },
    eventName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    eventDatevnev: {
        fontSize: 15,
        marginBottom: 2,
    },
    eventDate: {
        fontSize: 14,
        color: '#333',
    },
    eventDatedatum: {
        fontSize: 14,
        color: '#1565c0',
        textDecorationLine: 'underline',
        marginTop: 2,
    },
    eventDateleiras: {
        fontSize: 13,
        fontStyle: 'italic',
        color: '#666',
        marginTop: 4,
    },
    noResultsText: {
        fontSize: 18,
        color: 'red',
        textAlign: 'center',
        marginTop: 20,
    },
    
});


export default EsemenyScreen
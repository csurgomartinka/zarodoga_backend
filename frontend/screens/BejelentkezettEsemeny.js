import React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput } from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ipcim from './Ipcim';
import { useFocusEffect } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';


const BejelentkezettEsemeny = ({ navigation }) => {
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
        navigation.navigate('BejelentkezettEsemenyOldala', { adatok: item })
    }

    const handleLogout = async () => {
        Alert.alert(
            "Kijelentkezés",
            "Biztosan ki szeretnél jelentkezni?",
            [
                {
                    text: "Mégse",
                    style: "cancel"
                },
                { 
                    text: "Kijelentkezés", 
                    onPress: async () => {
                        try {
                            await AsyncStorage.removeItem('userToken');
                            navigation.navigate('HomeScreen');
                        } catch (error) {
                            console.error('Kijelentkezési hiba:', error);
                        }
                    }
                }
            ]
        );
    };

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


    useFocusEffect(
        React.useCallback(() => {
            Betoltes();
        }, [])
    );


    return (
        <View style={styles.container1}>

            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <MaterialCommunityIcons name="logout" size={24} color="#fff" />
                <Text style={styles.logoutText}>Kijelentkezés</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.userEventButton}
                onPress={() => navigation.navigate('EsemenyFelhasznalo')}
            >
                <View style={styles.buttonContent}>
                    <MaterialCommunityIcons 
                        name="account-group" 
                        size={24} 
                        color="#fff" 
                        style={styles.buttonIcon}
                    />
                    <Text style={styles.userEventButtonText}>Felhasználók által létrehozott események</Text>
                </View>
            </TouchableOpacity>

            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20, paddingLeft: 10 }}
                placeholder="Keresés eseményekre"
                value={text}
                onChangeText={TextChange} // Változásra hívja meg a backend-et
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
                    onValueChange={masodikPickerChange} // Változásra meghívja az API-t
                >
                    <Picker.Item label='összes' value="összes" />
                    {masodikPicker.map((item, index) => (
                        <Picker.Item key={index} label={item.tipus_nev} value={item.tipus_nev} />
                    ))}
                </Picker>

                
            </View>
            

            {noResults ? (
                <Text style={{ fontSize: 18, color: 'red', textAlign: 'center' }}>Nem található ilyen esemény</Text>
            )
                :
                (
                    <FlatList
                        data={adatok}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.eventItem}>
                                <TouchableOpacity style={{ flex: 1 }} onPress={() => EsemenyOldalaMegjelenit(item)}>
                                    <View style={styles.adatokdoboz}>
                                        <Text style={styles.eventName}>{item.nev}</Text>
                                        <Text style={styles.eventDatevnev}>{item.vnev}</Text>
                                        <Text style={styles.eventDate}>{item.helyszin_nev}</Text>
                                        <Text style={styles.eventDatedatum}>{item.datum}</Text>
                                        <Text style={styles.eventDateleiras}>{item.leiras}...</Text>   
                                    </View>

                                </TouchableOpacity>
                            </View>
                        )}
                    />
                )}
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
    userEventButton: {
        backgroundColor: '#28a745',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
    buttonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonIcon: {
        marginRight: 10,
    },
    userEventButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#dc3545',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginBottom: 20,
        alignSelf: 'center',
    },
    logoutText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 10,
    },
});

export default BejelentkezettEsemeny
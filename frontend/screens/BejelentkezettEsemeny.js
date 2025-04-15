import React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button, FlatList, TextInput } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ipcim from './Ipcim';
import EsemenyFelhasznalo from './EsemenyFelhasznalo';
import { useFocusEffect } from '@react-navigation/native';


const Stack = createStackNavigator();

const BejelentkezettEsemeny = ({ navigation }) => {
    const [adatok, setAdatok] = useState([]);
    const [text,setText] = useState([])
    const [elsoPicker,setElsoPicker] = useState([])
    const [masodikPicker,setMasodikPicker] = useState([])
    const [elsoPickerValue,setElsoPickerValue] = useState("")
    const [masodikPickerValue,setMasodikPickerValue] = useState("")
    const [noResults, setNoResults] = useState(false)

    const keresesbackend = Ipcim.Ipcim + 'esemenyKereses'
    const elsoPickerBackend = Ipcim.Ipcim + 'varosLista'
    const varosSzerintKereses = Ipcim.Ipcim + 'varosSzerintKereses'
    const masodikPickerBackend = Ipcim.Ipcim + 'tipusLista'
    const tipusSzerintKereses = Ipcim.Ipcim + 'tipusSzerintKereses'
    const kozosKereses = Ipcim.Ipcim + 'kozosKereses'

    const EsemenyOldalaMegjelenit = (item) => {
        navigation.navigate('BejelentkezettEsemenyOldala', {adatok: item})
    }

    const handleLogout = async () => {
        try {
          await AsyncStorage.removeItem('userToken');
          navigation.navigate('HomeScreen');
        } catch (error) {
          console.error('Kijelentkezési hiba:', error);
        }
      };

    const Betoltes = async () => {
        try{
            const response = await fetch(Ipcim.Ipcim + 'adatokListaM')
            const data = await response.json()
            setAdatok(data)
            setNoResults(data.length === 0)
        }catch(error) {
            console.log("Hiba:",error)
        }
    }

    const TextChange = async (inputText) => {
        setText(inputText)
        if (inputText == "")
        {
            Betoltes()
        }
        else
        {
            try{
                const response = await fetch(`${keresesbackend}?query=${inputText}`)
                const data = await response.json()
                setAdatok(data)
                setNoResults(data.length === 0)
            } catch(error) {
                console.error("Hiba történt az események lekérésekor:",error)
            }
        }  
    }

    const elsoPickerChange = async (itemValue) => {
        if (itemValue == "Összes" && masodikPickerValue == "összes") {
            setElsoPickerValue(itemValue)
            Betoltes()
        }
        else if(masodikPickerValue == "összes" && itemValue != "Összes")
        {
            console.log("Kiválaszott érték:",itemValue)
        setElsoPickerValue(itemValue)
        try{
            const response = await fetch(`${varosSzerintKereses}?value=${itemValue}`)
            const data = await response.json()
            setAdatok(data)
            setNoResults(data.length === 0)
            //console.log('Első Picker adat:',data)
        }catch(error){
            console.error('Hiba történt az első picker adatainak lekérésekor:', error)
        }
        }
        else if(masodikPickerValue != "összes" && itemValue == "Összes")
        {
            setElsoPickerValue(itemValue)
            try{
                const response = await fetch(`${tipusSzerintKereses}?value=${masodikPickerValue}`)
                const data = await response.json()
                setAdatok(data)
                setNoResults(data.length === 0)
            }catch(error){
                console.error('Hiba történt a második picker adatainak lekérésekor:',error)
        }
        }
        else if(masodikPickerValue != "összes" && itemValue != "Összes")
        {
            setElsoPickerValue(itemValue)
            try{
                const response = await fetch(`${kozosKereses}?tipus=${masodikPickerValue}&varos=${itemValue}`)
                const data = await response.json()
                setAdatok(data)
                setNoResults(data.length === 0)
            }catch(error){
                console.error('Hiba történt:',error)
        }
        }
    }

    const masodikPickerChange = async (itemValue) => {
        if (itemValue == "összes" && elsoPickerValue == "Összes") {
            setMasodikPickerValue(itemValue)
            Betoltes()
        }
        else if(elsoPickerValue == "Összes" && itemValue != "összes")
        {
            console.log("Kiválaszott érték:",itemValue)
            setMasodikPickerValue(itemValue)
            try{
                const response = await fetch(`${tipusSzerintKereses}?value=${itemValue}`)
                const data = await response.json()
                setAdatok(data)
                setNoResults(data.length === 0)
            }catch(error){
                console.error('Hiba történt a második picker adatainak lekérésekor:',error)
        }
        }
        else if(elsoPickerValue != "Összes" && itemValue == "összes")
        {
            setMasodikPickerValue(itemValue)
            try{
                const response = await fetch(`${varosSzerintKereses}?value=${elsoPickerValue}`)
                const data = await response.json()
                setAdatok(data)
                setNoResults(data.length === 0)
                //console.log('Első Picker adat:',data)
            }catch(error){
                console.error('Hiba történt az első picker adatainak lekérésekor:', error)
            }
        }
        else if(elsoPickerValue != "Összes" && itemValue != "összes")
        {
            setMasodikPickerValue(itemValue)
            try{
                const response = await fetch(`${kozosKereses}?tipus=${itemValue}&varos=${elsoPickerValue}`)
                const data = await response.json()
                setAdatok(data)
                setNoResults(data.length === 0)
            }catch(error){
                console.error('Hiba történt:',error)
        }
        }
    }

  
    useEffect(() => {
        const elsoPickerFetch = async () => {
            try{
                const response = await fetch(elsoPickerBackend)
                const data = await response.json()
                setElsoPicker(data)
            } catch(error){
                console.error('Hiba történt az első picker adatok lekérésekor:', error);
            }
        };

        const masodikPickerFetch = async () => {
            try{
                const response = await fetch(masodikPickerBackend)
                const data = await response.json()
                setMasodikPicker(data)
            }catch(error){
                console.error('Hiba történt a második picker adatok lekérésekor:', error);
            }
        }

      axios.get( Ipcim.Ipcim +'adatokListaM')
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
        <Button title='Kijelentkezés' onPress={handleLogout}/>
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
                    <Picker.Item key={index} label={item.vnev} value={item.vnev}/>
                ))}
            </Picker>

        <Picker
                style={styles.picker}
                selectedValue={masodikPickerValue}
                onValueChange={masodikPickerChange} // Változásra meghívja az API-t
            >
                 <Picker.Item label='összes' value="összes" />
                {masodikPicker.map((item, index) => (
                    <Picker.Item key={index} label={item.tipus_nev} value={item.tipus_nev}/>
                ))}
            </Picker>

        <Button title='Felhasználók által létrehozott események' onPress={() => navigation.navigate('EsemenyFelhasznalo')}/>
            </View>
        <Text style={styles.header}>Magyarország Eseményei</Text>

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
              <Text style={styles.eventName}>{item.nev}</Text>
              <Text style={styles.eventDate}>{item.vnev}</Text>
              <Text style={styles.eventDate}>{item.helyszin_nev}</Text>
              <Text style={styles.eventDate}>{item.datum}</Text>
              <Text style={styles.eventDate}>{item.leiras}...</Text>
            </TouchableOpacity>
            </View>
          )}
        />
            )}
      </View>
    );
  };


  const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#d4edda', // Világoszöld háttérszín
        padding: 20,
        alignItems: 'center',
    },
    container1: {
        flex: 1,
        backgroundColor: '#d4edda', // Világoszöld háttérszín
        padding: 20,
    },
    container4: {
        flex: 1,
        padding: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#6200ea',
        marginBottom: 20,
        textAlign: 'center',
    },
    text: {
        fontSize: 18,
        color: '#333',
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#6200ea',
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    },
    eventCard: {
        backgroundColor: '#fff',
        padding: 15,
        marginVertical: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
    },
    eventTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    eventDate: {
        fontSize: 14,
        color: '#6200ea',
        marginTop: 5,
    },
    eventLocation: {
        fontSize: 14,
        color: '#777',
        marginTop: 5,
    },
    picker: {
        width: '48%', // A Picker szélessége
        height: 40,  // A Picker magassága
        fontSize: 14, // A font mérete a Pickerben
        marginBottom: 150, // Egy kis távolság a Picker és a következő tartalom között
      },
      pickerContainer: {
        flexDirection: 'row',  // Ez teszi lehetővé, hogy a Pickerek egymás mellett legyenek
        justifyContent: 'space-between',  // Az elemek közötti térköz
        width: '100%',  // A tartalom szélessége
        marginBottom: 20,  // A Picker és a következő tartalom közötti távolság
      },
});

  export default BejelentkezettEsemeny
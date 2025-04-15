import React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button, FlatList, TextInput } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import EsemenyOldala from './EsemenyOldala';
import EsemenyScreen from './EsemenyScreen';
import Ipcim from './Ipcim';


// Stack Navigator, hogy kezeljük az összes képernyőt
export default function Fomenu() {

// Főoldal képernyő
function HomeScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Button title='Bejelentkezés/Regisztráció' onPress={() => navigation.navigate('HomeScreen')}/>
            <Text style={styles.header}>Magyarország Eseményei</Text>
            <Text>Mi egy dinamikus és lelkes csapat vagyunk, akik elkötelezettek amellett, hogy a legjobb élményeket és információkat nyújtsuk Magyarország eseményeiről. A célunk, hogy a felhasználók könnyedén hozzáférhessenek a legfrissebb rendezvényekhez, fesztiválokhoz, koncertekhez és kulturális eseményekhez, mind weboldalon, mind mobil applikációban.Weboldalunk és telefonos applikációnk segítségével bármikor és bárhonnan tájékozódhatsz a legfontosabb eseményekről, amelyeket nem érdemes kihagyni! Az applikációnk és az oldalunk naprakész, könnyen navigálható, és biztosítja, hogy soha ne maradj le a legizgalmasabb programokról</Text>
            <View style={[styles.container4,
            {
                // Try setting `flexDirection` to `"row"`.
                flexDirection: 'column',
            },
            ]}>
                <View style={{ flex: 1, backgroundColor: 'red' }} />
                <View style={{ flex: 2, backgroundColor: 'darkorange' }} />
                <View style={{ flex: 3, backgroundColor: 'green' }} />
            </View>

        </View>

    );
}

// Kapcsolat képernyő
function ContactScreen({ navigation }) {

    const [message,setMessage] = useState('')

    const handleSendMessage = () => {
        if (message != "")
        {
            const felvitel = {
                nev: "Vendég",
                email: "Nincs",
                uzenet: message,
                datum: new Date()
            };
    
            fetch(Ipcim.Ipcim + 'kapcsolatFelvitel', {  
                method: "POST",
                headers: {
                    "Content-Type": "application/json; charset=UTF-8"
                },
                body: JSON.stringify(felvitel),
            })
            .then(response => response.text())
            .then(data => {
                console.log('Sikeres válasz:', data);
                alert("Sikeres feltöltés")
            })
            .catch(error => {
                console.error('Hiba történt:', error);
            });
        }
        else alert("Írj üzenetet!")
    };

    return (
        <View style={styles.container1}>
            <Button title='Bejelentkezés/Regisztráció' onPress={() => navigation.navigate('HomeScreen')}/>
            <Text style={styles.header}>Vedd fel  velünk a kapcsolatot!</Text>
            <Text style={styles.text}>Email: info@esemenyek.hu</Text>
            <Text style={styles.text}>Telefon: +36 30 123 4567</Text>
            <Text style={styles.text}>Cím: Budapest, Fő utca 1.</Text>
            <TextInput placeholder='Üzenet' value={message} onChangeText={text => setMessage(text)}/>
            <Button title='Küldés' onPress={handleSendMessage}/>
        </View>
    );
}

// Események képernyő


// Navigáció a fülökhöz
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// A fő navigációs képernyő
function FomenuTabs() {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Főoldal"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="home" size={24} color={color} />
                    ),

                }}
            />
            <Tab.Screen
                name="Esemenyek"
                component={EsemenyScreen}
                options={{
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="email" size={24} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Kapcsolat"
                component={ContactScreen}
                options={{
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="email" size={24} color={color} />
                    ),
                }}
            />

        </Tab.Navigator>
    );
}

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Főoldal és Kapcsolat"
                component={FomenuTabs}
                options={{ headerShown: false }}
            />

        <Stack.Screen name='EsemenyOldala' component={EsemenyOldala} />
        </Stack.Navigator>
    );
}



// Stílusok
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
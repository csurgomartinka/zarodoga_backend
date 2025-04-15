import React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button, FlatList, TextInput } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import EsemenyOldala from './EsemenyOldala';
import BejelentkezettEsemeny from './BejelentkezettEsemeny';
import SajatEsemeny from './SajatEsemeny';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ipcim from './Ipcim';


export default function Bejelentkezett() {

function HomeScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Button title='Kijelentkezés' onPress={() => navigation.navigate('HomeScreen')}/>
            <Text style={styles.header}>Magyarország Eseményei</Text>
            <Text>Mi egy dinamikus és lelkes csapat vagyunk, akik elkötelezettek amellett, hogy a legjobb élményeket és információkat nyújtsuk Magyarország eseményeiről. A célunk, hogy a felhasználók könnyedén hozzáférhessenek a legfrissebb rendezvényekhez, fesztiválokhoz, koncertekhez és kulturális eseményekhez, mind weboldalon, mind mobil applikációban.Weboldalunk és telefonos applikációnk segítségével bármikor és bárhonnan tájékozódhatsz a legfontosabb eseményekről, amelyeket nem érdemes kihagyni! Az applikációnk és az oldalunk naprakész, könnyen navigálható, és biztosítja, hogy soha ne maradj le a legizgalmasabb programokról</Text>
            <View style={[styles.container4,
            {
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
    const [email, setEmail] = useState('');
    const [nev, setNev] = useState('')
    const [user,setUser] = useState(null)

    useEffect(() => {
        const loadUser = async () => {
            try {
                const loggedInUser = await AsyncStorage.getItem('userToken');
                if (loggedInUser !== null) {
                    const parsedUser = JSON.parse(loggedInUser);
                    setUser(parsedUser); // Beállítjuk a felhasználó adatokat
                }
            } catch (error) {
                console.error("Hiba a felhasználó adatainak lekérésekor:", error);
            }
        };
    
        loadUser();
    }, []);
    
    useEffect(() => {
        if (!user) return; // Ha a user nem létezik, ne futtassuk a fetch-et
    
        const fetchEmail = async () => {
            try {
                const response = await fetch(Ipcim.Ipcim + `emailKereses?userId=${user.id}`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                });
    
                const text = await response.text(); // Először szövegként kérjük le a választ
    
                let data;
                try {
                    data = JSON.parse(text); // Próbáljuk JSON-ná alakítani
                } catch {
                    throw new Error(`Érvénytelen JSON válasz a szervertől: ${text}`);
                }
    
                if (data.error) {
                    console.error("Hiba:", data.error);
                } else {
                    setEmail(data.email);
                    setNev(data.email.split('@')[0]);
                }
            } catch (error) {
                console.error("Hiba történt a lekérésnél:", error);
            }
        };
    
        fetchEmail();
    }, [user]);
    

    const handleSendMessage = () => {
        if (message != "")
        {
            const felvitel = {
                nev: nev,
                email: email,
                uzenet: message,
                datum: new Date()
            };
    
            fetch( Ipcim.Ipcim + 'kapcsolatFelvitel', {  
                method: "POST",
                headers: {
                    "Content-Type": "application/json; charset=UTF-8"
                },
                body: JSON.stringify(felvitel),
            })
            .then(response => {
                if (!response.ok) {
                    return Promise.reject('Hiba történt a szerverrel: ' + response.statusText);
                }
                return response.text();
            })
            .then(data => {
                console.log('Sikeres válasz:', data);
                alert("Sikeres feltöltés");
            })
            .catch(error => {
                console.error('Hiba történt:', error);
                alert("Hiba történt! Kérlek próbáld újra.");
            });
        } else alert("Írj üzenetet!");
    };

    return (
        <View style={styles.container1}>
            <Button title='Kijelentkezés' onPress={() => navigation.navigate('HomeScreen')}/>
            <Text style={styles.header}>Vedd fel  velünk a kapcsolatot!</Text>
            <Text style={styles.text}>Email: info@esemenyek.hu</Text>
            <Text style={styles.text}>Telefon: +36 30 123 4567</Text>
            <Text style={styles.text}>Cím: Budapest, Fő utca 1.</Text>
            <Text style={styles.text}>Oszd meg velünk a véleményed!</Text>
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
                name="Események"
                component={BejelentkezettEsemeny}
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

            <Tab.Screen
                name="Profilom"
                component={SajatEsemeny}
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
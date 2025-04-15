import React from 'react';
import { useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import EsemenyOldala from './EsemenyOldala';
import EsemenyScreen from './EsemenyScreen';
import Ipcim from './Ipcim';


export default function Fomenu() {


function HomeScreen({ navigation }) {
    return (
        <ScrollView>
            <View style={styles.container1}>
            <TouchableOpacity 
                style={styles.kijelentkezes} 
                onPress={() => navigation.navigate('HomeScreen')}
            >
                <Text style={styles.kijelentkezestext}>Bejelentkezés/Regisztráció</Text>
            </TouchableOpacity>

            <View style={styles.infoBox}>
                <Text style={styles.infoTitle}>Üdvözlünk a Magyarország Eseményei alkalmazásban!</Text>
                <Text style={styles.infoText}>
                    Szeretnéd tudni, milyen izgalmas események zajlanak az ország különböző pontjain? 
                    Alkalmazásunk segítségével könnyedén böngészhetsz koncertek, fesztiválok, kiállítások 
                    és egyéb rendezvények között.
                </Text>
                <Text style={styles.infoText}>
                    🔹 Böngéssz események között – fedezd fel, mi történik a közeledben!{'\n'}
                    🔹 Regisztrálj és hozd létre saját eseményedet – oszd meg másokkal is a programjaidat!{'\n'}
                    🔹 Kapcsolatba léphetsz velünk – ha kérdésed van, írj nekünk üzenetet!
                </Text>
                <Text style={styles.infoText}>
                    📅 Ne maradj le a legjobb eseményekről! Fedezd fel Magyarország programkínálatát és tervezz előre!
                </Text>
            </View>
        </View>
        </ScrollView>
    );
}

// Kapcsolat képernyő
function ContactScreen({ navigation }) {
    const [message, setMessage] = useState('')

    const handleSendMessage = () => {
        if (message != "") {
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
                alert("Sikeres feltöltés");
                setMessage(''); // Üzenet mező ürítése küldés után
            })
            .catch(error => {
                console.error('Hiba történt:', error);
            });
        } else {
            alert("Írj üzenetet!");
        }
    };
    
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container1}>
                <TouchableOpacity style={styles.kijelentkezes} onPress={() => navigation.navigate('HomeScreen')}>
                    <Text style={styles.kijelentkezestext}>Bejelentkezés/Regisztráció</Text>
                </TouchableOpacity>
                <Text style={styles.header}>Vedd fel velünk a kapcsolatot!</Text>
                <Text style={styles.text}><Text style={styles.texthead}>Email:</Text> magyarorszagesemenyei@gmail.com</Text>
                <Text style={styles.text}><Text style={styles.texthead}>Telefon:</Text> 0652 533 148</Text>
                <Text style={styles.text}><Text style={styles.texthead}>Cím:</Text> Debrecen, Budai Ézsaiás u. 8/A, 4030</Text>

                <View style={styles.uzenetkuldesContainer}>
                    <Text style={styles.title}>Szeretnél nekünk üzenetet küldeni?</Text>
                    <Text style={styles.title}>Tedd meg most!</Text>
                    <TextInput 
                        placeholder='Üzenet' 
                        value={message} 
                        onChangeText={text => setMessage(text)} 
                        style={styles.textinput}
                        multiline={true}
                        numberOfLines={4}
                        autoCorrect={false}
                    />
                    <TouchableOpacity style={styles.kuldesGomb} onPress={handleSendMessage}>
                        <Text style={styles.kuldesGombSzoveg}>Üzenet küldése</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

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
                component={EsemenyScreen}
                options={{
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="calendar" size={24} color={color} />
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



const styles = StyleSheet.create({
    container1: {
        flex: 1,
        backgroundColor: '#dde6f0',
        padding: 20,
        alignItems: 'center',
    },
    header: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#0056b3',
        marginBottom: 20,
        textAlign: 'center',
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
    uzenetkuldesContainer: {
        width: '90%',
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
        marginTop: 20,
    },
    kuldesGomb: {
        backgroundColor: '#007bff',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 10,
        marginTop: 15,
        alignSelf: 'center',  // Középre igazítás
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
    kuldesGombSzoveg: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    textinput: {
        width: '100%',
        minHeight: 120,  
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        padding: 12,
        backgroundColor: '#f9f9f9',
        fontSize: 16,
        textAlignVertical: 'top', 
        marginVertical: 10,
        textContentType:"none",
    },
    button: {
        backgroundColor: '#28a745',
        paddingVertical: 14,
        paddingHorizontal: 30,
        borderRadius: 12,
        marginTop: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
    infoBox: {
        backgroundColor: '#ffffff',
        padding: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
        width: '90%',
        marginTop: 10,
    },
    infoTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 10,
        textAlign: 'center',
    },
    infoText: {
        fontSize: 16,
        color: '#333',
        marginBottom: 10,
    },
});

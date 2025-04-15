import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button, ScrollView, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ipcim from './Ipcim';

const BejelentkezettEsemenyOldala = ({ route, navigation }) => {
    const { adatok } = route.params;
    const [user, setUser] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const [erdekli, setErdekli] = useState(false);

    useEffect(() => {
        const loadUser = async () => {
            try {
                const loggedInUser = await AsyncStorage.getItem('userToken');
                if (loggedInUser !== null) {
                    const parsedUser = JSON.parse(loggedInUser);
                    setUser(parsedUser.id);
                    setUserRole(parsedUser.jogosultsag);
                }
            } catch (error) {
                console.error("Hiba a felhasználó adatainak lekérésekor:", error);
            }
        };
        loadUser();
    }, []);

    useEffect(() => {
        const Erdeklie = async () => {
            try {
                const response = await fetch(Ipcim.Ipcim + 'erdekeltLista');
                const data = await response.json();
                if (user && data.some(item => item.felhasznaloid === user && item.esemeny_nev === adatok.nev)) {
                    setErdekli(true);
                } else {
                    setErdekli(false);
                }
            } catch (error) {
                console.error('Hiba:', error);
            }
        };
        
        if (user) {
            Erdeklie();
        }
    }, [user, adatok.nev]);

    const Erdekles = async () => {
        try {
            const localDate = new Date(adatok.datum_kezdet);
            const datumKezdet = localDate.toLocaleString('sv-SE');
            
            const response = await fetch(Ipcim.Ipcim + 'ErdekeltFelvitel', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    felhasznaloid: user,
                    esemeny_nev: adatok.nev,
                    esemeny_datum: datumKezdet
                }),
            });
            
            if (response.ok) {
                alert('Siker', 'Sikeresen kezelte az érdeklődést!');
                setErdekli(true);
            } else {
                alert('Hiba', 'Nem sikerült rögzíteni az érdeklődést.');
            }
        } catch (error) {
            console.error('Hiba:', error);
            alert('Hálózati hiba', 'Nem sikerült kapcsolódni a szerverhez.');
        }
    };

    const NemErdekles = async () => {
        try {
            const response = await fetch(Ipcim.Ipcim + 'erdekeltEsemenyTorles', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    felhasznaloid: user,
                    esemeny_nev: adatok.nev
                })
            });
    
            if (response.ok) {
                console.log('Esemény sikeresen törölve');
                setErdekli(false);
            } else {
                console.error('Törlés nem sikerült:', await response.text());
            }
        } catch (error) {
            console.error('Hiba:', error);
        }
    };

    const handleEventDelete = async () => {
        try {
            // Az esemény törlésére irányuló kérés
            const response = await fetch(Ipcim.Ipcim + 'egyEsemenyTorles', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: adatok.id })
            });
    
            if (response.ok) {
                // Először lekérjük az érdeklődők listáját, hogy megnézzük, van-e érdeklődő az adott eseménynél
                const erdekeltListaResponse = await fetch(Ipcim.Ipcim + 'erdekeltLista');
                const erdekeltListaData = await erdekeltListaResponse.json();
    
                // Megnézzük, hogy az esemény neve szerepel-e a listán
                const vanErdeklo = erdekeltListaData.some(item => item.esemeny_nev === adatok.nev);
    
                if (vanErdeklo) {
                    // Ha van érdeklődő, akkor módosítjuk az érdeklődők listáját
                    const erdekeltResponse = await fetch(Ipcim.Ipcim + `erdekeltEsemenyModositas/${adatok.nev}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });
    
                    if (erdekeltResponse.ok) {
                        Alert.alert('Siker', 'Az esemény és az érdeklődés sikeresen törlésre került.', [
                            { 
                                text: 'OK', 
                                onPress: () => {
                                    navigation.replace('BejelentkezettEsemeny');
                                }
                            }
                        ]);
                    } else {
                        // Ha az érdeklődők módosítása nem sikerült, figyelmeztetjük a felhasználót
                        const errorText = await erdekeltResponse.text();
                        Alert.alert('Hiba', 'A rendszer nem tudta módosítani az érdeklődők listáját. Az esemény azonban sikeresen törlésre került.', [
                            { 
                                text: 'OK', 
                                onPress: () => {
                                    navigation.replace('BejelentkezettEsemeny');
                                }
                            }
                        ]);
                        console.error('Az érdeklődés törlés nem sikerült:', errorText);
                    }
                } else {
                    // Ha nincs érdeklődő, csak töröljük az eseményt
                    Alert.alert('Siker', 'Az esemény törlésre került, de nem volt érdeklődő, akit értesíteni kellett volna.', [
                        { 
                            text: 'OK', 
                            onPress: () => {
                                navigation.replace('BejelentkezettEsemeny');
                            }
                        }
                    ]);
                }
            } else {
                // Ha az esemény törlése nem sikerült
                const errorText = await response.text();
                Alert.alert('Hiba', 'Az esemény törlése nem sikerült.', [
                    { text: 'OK' }
                ]);
                console.error('Törlés nem sikerült:', errorText);
            }
        } catch (error) {
            // Hálózati hiba
            console.error('Hiba:', error);
            Alert.alert('Hálózati hiba', 'A hálózati kérés során hiba lépett fel. Kérjük próbálja újra később.');
        }
    };

    const handleLogout = async () => {
        try {
          await AsyncStorage.removeItem('userToken');
          navigation.navigate('HomeScreen');
        } catch (error) {
          console.error('Kijelentkezési hiba:', error);
        }
      };
    
    return (
        <ScrollView>
            <Button title='Kijelentkezés' onPress={handleLogout}/>
            <Text>{adatok.nev}</Text>
            <Text>{adatok.vnev}</Text>
            <Text>{adatok.helyszin_nev}</Text>
            <Text>{adatok.datum}</Text>
            <Text>{adatok.reszletek}</Text>
            {userRole === "admin" ? (
        <Button title="Esemény törlése" onPress={handleEventDelete} />
    ) : (
        <Button 
            title={erdekli ? "Nem érdekel" : "Érdekel"} 
            onPress={erdekli ? NemErdekles : Erdekles} 
        />
    )}
            
        </ScrollView>
    );
};

export default BejelentkezettEsemenyOldala;

import React from 'react';
import { View, Text, StyleSheet, ScrollView, Button } from 'react-native';
import { useState, useEffect } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ipcim from './Ipcim';

const EsemenyFelhasznaloOldala = ({ route, navigation }) => {
  const { adatok } = route.params;  // Az adatokat a navigáció által kaptuk

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
            const localDate = new Date(adatok.datum_mettol);
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

    const handleLogout = async () => {
        try {
          await AsyncStorage.removeItem('userToken');
          navigation.navigate('HomeScreen');
        } catch (error) {
          console.error('Kijelentkezési hiba:', error);
        }
      };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  };

  const handleDeny = async (eventId) => {
    try {
      const response = await fetch(Ipcim.Ipcim + 'felhasznaloEsemenyElutasitas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: eventId }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.error || 'Elutasítás nem sikerült');
      }
  
      console.log('Esemény sikeresen elutasítva');
      navigation.replace('EsemenyFelhasznalo');
    } catch (error) {
      console.error('Hiba:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Button title='Kijelentkezés' onPress={handleLogout}/>
      <Text style={styles.title}>{adatok.nev}</Text>
      <Text style={styles.text}>Dátum: {formatDate(adatok.datum_mettol)} - {formatDate(adatok.datum_meddig)}</Text>
      <Text style={styles.text}>Város: {adatok.varos}</Text>
      <Text style={styles.text}>Helyszín: {adatok.helyszin}</Text>
      <Text style={styles.text}>Típus: {adatok.tipus}</Text>
      <Text style={styles.text}>Leírás: {adatok.leiras}</Text>
      <Text style={styles.text}>Részletek: {adatok.reszletek}</Text>
      
      {userRole === "admin" ? (
        <Button title="Elutasítás" onPress={() => handleDeny(adatok.id)} />
    ) : (
        <Button 
            title={erdekli ? "Nem érdekel" : "Érdekel"} 
            onPress={erdekli ? NemErdekles : Erdekles} 
        />
    )}

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 8,
  },
});

export default EsemenyFelhasznaloOldala;

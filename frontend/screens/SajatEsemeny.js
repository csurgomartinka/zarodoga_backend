import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import Ipcim from './Ipcim';


const SajatEsemeny = ({ navigation }) => {
  const [userId, setUserId] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [adatok, setAdatok] = useState([]);
  const [adatok2,setAdatok2] = useState([]);
  const [email, setEmail] = useState(null);
  const [filterAccepted, setFilterAccepted] = useState(true);
  const [filterDenied, setFilterDenied] = useState(true);
  const [filterPending, setFilterPending] = useState(true);

  useFocusEffect(
    useCallback(() => {
      const loadUser = async () => {
        try {
          const loggedInUser = await AsyncStorage.getItem('userToken');
          if (loggedInUser) {
            const { id, jogosultsag, email } = JSON.parse(loggedInUser);
            setUserId(id);
            setUserRole(jogosultsag);
            setEmail(email)
          }
        } catch (error) {
          console.error("Hiba a felhasználó adatainak lekérésekor:", error);
        }
      };

      const loadData = async () => {
        try {
          const response = await fetch(Ipcim.Ipcim + 'erdekeltLista');
          if (!response.ok) {
            throw new Error('Hiba a lekérés során');
          }
          const data = await response.json();
          setAdatok(data);
        } catch (error) {
          console.error("Hiba:", error);
        }
      };

      const loadSajat = async () => {
        try{
          const response = await fetch(Ipcim.Ipcim + 'felhasznaloEsemenyLista');
          if (!response.ok) {
            throw new Error('Hiba a lekérés során');
          }
          const data = await response.json();
          setAdatok2(data);
        }
        catch (error){
          console.error("Hiba:",error)
        }
      }

      loadSajat();
      loadUser();
      loadData();

      return () => {
        setAdatok([]);
      };
    }, [])
  );

  const handleAccept = async (eventId) => {
    try {
      const response = await fetch(Ipcim.Ipcim + 'felhasznaloEsemenyElfogadas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: eventId }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.error || 'Elfogadás nem sikerült');
      }
  
      console.log('Esemény sikeresen elfogadva');
      setAdatok2(prevAdatok => prevAdatok.map(event => 
        event.id === eventId ? { ...event, elfogadott: 1 } : event
      ));
    } catch (error) {
      console.error('Hiba:', error);
    }
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
      setAdatok2(prevAdatok => prevAdatok.map(event => 
        event.id === eventId ? { ...event, elfogadott: 2 } : event
      ));
    } catch (error) {
      console.error('Hiba:', error);
    }
  };


  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  };


  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      navigation.navigate('HomeScreen');
    } catch (error) {
      console.error('Kijelentkezési hiba:', error);
    }
  };


  const Erdekelt_Navigation = async (esemenyNev, esemenyDatum) => {
    try {
      const response = await fetch(Ipcim.Ipcim + 'esemenyLista')
      if (!response.ok) {
        throw new Error('Hiba a lekérés során');
      }
      const data = await response.json();
      for (const elem of data) {
        if(elem.nev == esemenyNev && esemenyDatum == elem.datum_kezdet)
        {
          navigation.navigate('BejelentkezettEsemenyOldala', {adatok: elem})
        }
      }
      
      const response2 = await fetch(Ipcim.Ipcim + 'felhasznaloEsemenyLista')
      if (!response2.ok) {
        throw new Error('Hiba a lekérés során');
      }
      const data2 = await response2.json();
      for (const elem of data2) {
        if(elem.nev == esemenyNev && esemenyDatum == elem.datum_mettol)
        {
          navigation.navigate('EsemenyFelhasznaloOldala', {adatok: elem})
        }
      }
    } catch (error) {
      console.error("Hiba:",error)
    }

  }




  const filteredData = adatok2.filter((item) => {
    if (item.elfogadott === 1 && filterAccepted) return true;
    if (item.elfogadott === 2 && filterDenied) return true;
    if (item.elfogadott === 0 && filterPending) return true;
    return false;
  });




  return (
      <ScrollView>
         <Button title='Kijelentkezés' onPress={handleLogout}/>
        {userRole === 'admin' ? (
          <>
          <Text style={styles.header}>Admin felület</Text>


        <Text>Elfogadott</Text>
        <Switch value={filterAccepted} onValueChange={setFilterAccepted} />

        
        <Text>Elutasított</Text>
        <Switch value={filterDenied} onValueChange={setFilterDenied} />

        
        <Text>Még nem elfogadott</Text>
        <Switch value={filterPending} onValueChange={setFilterPending} />


          {filteredData.map((item, index) => (
            <View key={index} style={styles.card}>
              <Text style={styles.title}>Esemény: {item.nev}</Text>
              <Text>Dátum: {formatDate(item.datum_mettol)} - {formatDate(item.datum_meddig)}</Text>
              <Text>Város: {item.varos}</Text>
              <Text>Típus: {item.tipus}</Text>
              <Text>Leírás: {item.leiras}</Text>
              <Text>Részletek: {item.reszletek}</Text>
              <Text>Helyszín: {item.helyszin}</Text>
              <Text>Felhasználó: {item.felhasznalo}</Text>
              {item.elfogadott === 0 ? (
                <>
                  <Text style={styles.pending}>Még nem elfogadott</Text>
                  <Button title="Elfogadás" onPress={() => handleAccept(item.id)} />
                  <Button title="Elutasítás" onPress={() => handleDeny(item.id)} />
                </>
              ) : item.elfogadott === 1 ? (
                <>
                <Text style={styles.accepted}>Elfogadott</Text>
                <Button title="Elutasítás" onPress={() => handleDeny(item.id)} />
                </>
              ) : (
                <>
                <Text style={styles.denied}>Elutasított</Text>
                <Button title="Elfogadás" onPress={() => handleAccept(item.id)} />
                </>
              )}
            </View>
          ))}
        </>
        ) : (
          <>
            <Text style={styles.header}>Eseményeid</Text>
            <Button title="Saját esemény létrehozása" onPress={() => navigation.navigate('EsemenyLetrehozas')} />
            {adatok2.filter(item => email === item.felhasznalo).map((item, index) => (
              <View key={index}>
                <Text>Esemény: {item.nev}</Text>
                <Text>Dátum: {formatDate(item.datum_mettol)} - {formatDate(item.datum_meddig)}</Text>
                <Text>Város: {item.varos}</Text>
                <Text>Típus: {item.tipus}</Text>
                <Text>Helyszín: {item.helyszin}</Text>
                {item.elfogadott === 0 ? (
                  <Text>Még nem elfogadott</Text>
                ) : item.elfogadott === 1 ? (
                  <Text>Elfogadott</Text>
                ) : (
                  <Text>Elutasított</Text>
                )}
                <Button title="Törlés" onPress={async () => {
                  try {
                    const response = await fetch(Ipcim.Ipcim + 'felhasznaloEsemenyTorles', {
                      method: 'DELETE',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                        id : item.id
                      }),
                    });
  
                    if (!response.ok) {
                      const errorText = await response.text();
                      console.error('Törlés nem sikerült:', errorText);
                    } else {
                      console.log('Esemény sikeresen törölve');
                      setAdatok2(prevAdatok => prevAdatok.filter(event => event.id !== item.id));
                    }
                  } catch (error) {
                    console.error('Hiba:', error);
                  }
                }} />
              </View>
            ))}


            <Text style={styles.header}>Érdekelt események</Text>
            {adatok.filter(item => userId === item.felhasznaloid).map((item, index) => (
              <View key={index}>
                <TouchableOpacity onPress={() => Erdekelt_Navigation(item.esemeny_nev, item.esemeny_datum)}>
                  <Text>Esemény: {item.esemeny_nev}</Text>
                  <Text>Dátum: {formatDate(item.esemeny_datum)}</Text>
                  {item.torolt === 1 && (
                    <Text style={styles.deletedEvent}>Törölt esemény</Text>
                  )}
                </TouchableOpacity>
                <Button title="Nem érdekel" onPress={async () => {
                  try {
                    const response = await fetch(Ipcim.Ipcim + 'erdekeltEsemenyTorles', {
                      method: 'DELETE',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                        felhasznaloid: item.felhasznaloid,
                        esemeny_nev: item.esemeny_nev
                      }),
                    });
  
                    if (!response.ok) {
                      const errorText = await response.text();
                      console.error('Törlés nem sikerült:', errorText);
                    } else {
                      console.log('Esemény sikeresen törölve');
                      setAdatok(prevAdatok => prevAdatok.filter(event => event.esemeny_nev !== item.esemeny_nev));
                    }
                  } catch (error) {
                    console.error('Hiba:', error);
                  }
                }} />
              </View>
            ))}
          </>
        )}
      </ScrollView>
  );
};

const styles = StyleSheet.create({
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
  pending: {
    color: 'orange',
    fontWeight: 'bold',
  },
  accepted: {
    color: 'green',
    fontWeight: 'bold',
  },
  denied: {
    color: 'red',
    fontWeight: 'bold',
  },
});

export default SajatEsemeny;

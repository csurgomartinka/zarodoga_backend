import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import Ipcim from './Ipcim';
import { useFocusEffect } from '@react-navigation/native';

const EsemenyFelhasznalo = ({ navigation }) => {
  const [esemenyek, setEsemenyek] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Memoizált fetch függvény
  const fetchEsemenyek = useCallback(async () => {
    setLoading(true); // Új kérés előtt mindig beállítjuk a töltést
    try {
      const response = await fetch(Ipcim.Ipcim + 'felhasznaloEsemenyLista');
      if (!response.ok) {
        throw new Error('Hiba történt az adatok lekérése során');
      }
      const data = await response.json();
      const filteredData = data.filter(item => item.elfogadott === 1);
      setEsemenyek(filteredData);
      setError(null);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // useFocusEffect csak akkor hívja meg a fetchEsemenyek-et, ha az oldalra navigálunk
  useFocusEffect(
    useCallback(() => {
      fetchEsemenyek();
    }, []) // Üres tömb, mert a fetchEsemenyek már memoizált
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />;
  }

  if (error) {
    return <Text style={styles.error}>Hiba: {error}</Text>;
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  };

  const EsemenyOldalaMegjelenit = (item) => {
    navigation.navigate('EsemenyFelhasznaloOldala', { adatok: item });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {esemenyek.length > 0 ? (
        esemenyek.map((item) => (
          <View key={item.id} style={styles.card}>
            <TouchableOpacity onPress={() => EsemenyOldalaMegjelenit(item)}>
              <Text style={styles.title}>{item.nev}</Text>
              <Text style={styles.text}>Dátum: {formatDate(item.datum_mettol)} - {formatDate(item.datum_meddig)}</Text>
              <Text style={styles.text}>Város: {item.varos}</Text>
              <Text style={styles.text}>Helyszín: {item.helyszin}</Text>
              <Text style={styles.text}>Leírás: {item.leiras}</Text>
            </TouchableOpacity>
          </View>
        ))
      ) : (
        <Text style={styles.noEvents}>Nincsenek elérhető események.</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  card: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  text: {
    fontSize: 14,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    fontSize: 16,
    marginTop: 20,
  },
  noEvents: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 20,
    fontStyle: 'italic',
  },
});

export default EsemenyFelhasznalo;

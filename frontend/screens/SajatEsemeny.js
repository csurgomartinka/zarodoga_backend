import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import Ipcim from './Ipcim';

const SajatEsemeny = ({ navigation }) => {
  const [userId, setUserId] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [adatok, setAdatok] = useState([]);
  const [adatok2, setAdatok2] = useState([]);
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
            setEmail(email);
          }
        } catch (error) {
          console.error("Hiba a felhasználó adatainak lekérésekor:", error);
        }
      };

      const loadData = async () => {
        try {
          const response = await fetch(Ipcim.Ipcim + 'erdekeltLista');
          if (!response.ok) throw new Error('Hiba a lekérés során');
          const data = await response.json();
          setAdatok(data);
        } catch (error) {
          console.error("Hiba:", error);
        }
      };

      const loadSajat = async () => {
        try {
          const response = await fetch(Ipcim.Ipcim + 'felhasznaloEsemenyLista');
          if (!response.ok) throw new Error('Hiba a lekérés során');
          const data = await response.json();
          setAdatok2(data);
        } catch (error) {
          console.error("Hiba:", error);
        }
      };

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

      Alert.alert('Siker', 'Esemény sikeresen elfogadva!');
      setAdatok2(prevAdatok => prevAdatok.map(event =>
        event.id === eventId ? { ...event, elfogadott: 1 } : event
      ));
    } catch (error) {
      console.error('Hiba:', error);
      Alert.alert('Hiba', 'Az elfogadás nem sikerült.');
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

      Alert.alert('Siker', 'Esemény sikeresen elutasítva!');
      setAdatok2(prevAdatok => prevAdatok.map(event =>
        event.id === eventId ? { ...event, elfogadott: 2 } : event
      ));
    } catch (error) {
      console.error('Hiba:', error);
      Alert.alert('Hiba', 'Az elutasítás nem sikerült.');
    }
  };

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric'
    };
    return new Date(dateString).toLocaleDateString('hu-HU', options);
  };

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

  const Erdekelt_Navigation = async (esemenyNev, esemenyDatum) => {
    try {
      // Először próbáljuk meg az admin események között
      const response = await fetch(Ipcim.Ipcim + 'esemenyLista');
      if (!response.ok) throw new Error('Hiba a lekérés során');
      const data = await response.json();
      
      // Dátum összehasonlításhoz formázzuk ugyanúgy
      const formattedDatum = new Date(esemenyDatum).toLocaleDateString('hu-HU', {
        year: 'numeric', 
        month: 'long', 
        day: 'numeric'
      });
      
      for (const elem of data) {
        const elemDatum = new Date(elem.datum_kezdet).toLocaleDateString('hu-HU', {
          year: 'numeric', 
          month: 'long', 
          day: 'numeric'
        });
        
        if (elem.nev === esemenyNev && formattedDatum === elemDatum) {
          navigation.navigate('BejelentkezettEsemenyOldala', { adatok: elem });
          return;
        }
      }

      // Ha nem találtuk az admin események között, próbáljuk a felhasználói eseményeket
      const response2 = await fetch(Ipcim.Ipcim + 'felhasznaloEsemenyLista');
      if (!response2.ok) throw new Error('Hiba a lekérés során');
      const data2 = await response2.json();
      
      for (const elem of data2) {
        const elemDatum = new Date(elem.datum_mettol).toLocaleDateString('hu-HU', {
          year: 'numeric', 
          month: 'long', 
          day: 'numeric'
        });
        
        if (elem.nev === esemenyNev && formattedDatum === elemDatum) {
          navigation.navigate('EsemenyFelhasznaloOldala', { adatok: elem });
          return;
        }
      }
      
      Alert.alert('Hiba', 'Nem található az esemény');
    } catch (error) {
      console.error("Hiba:", error);
      Alert.alert('Hiba', 'Nem sikerült megnyitni az eseményt');
    }
  };

  const handleDelete = async (id) => {
    Alert.alert(
      "Esemény törlése",
      "Biztosan törölni szeretnéd ezt az eseményt?",
      [
        {
          text: "Mégse",
          style: "cancel"
        },
        { 
          text: "Törlés", 
          onPress: async () => {
            try {
              const response = await fetch(Ipcim.Ipcim + 'felhasznaloEsemenyTorles', {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id }),
              });

              if (!response.ok) {
                const errorText = await response.text();
                console.error('Törlés nem sikerült:', errorText);
                Alert.alert('Hiba', 'A törlés nem sikerült.');
              } else {
                Alert.alert('Siker', 'Esemény sikeresen törölve!');
                setAdatok2(prevAdatok => prevAdatok.filter(event => event.id !== id));
              }
            } catch (error) {
              console.error('Hiba:', error);
              Alert.alert('Hiba', 'A törlés nem sikerült.');
            }
          }
        }
      ]
    );
  };

  const handleUninterested = async (felhasznaloid, esemeny_nev) => {
    Alert.alert(
      "Érdeklődés visszavonása",
      "Biztosan nem érdekel már ez az esemény?",
      [
        {
          text: "Mégse",
          style: "cancel"
        },
        { 
          text: "Megerősítés", 
          onPress: async () => {
            try {
              const response = await fetch(Ipcim.Ipcim + 'erdekeltEsemenyTorles', {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  felhasznaloid,
                  esemeny_nev
                }),
              });

              if (!response.ok) {
                const errorText = await response.text();
                console.error('Törlés nem sikerült:', errorText);
                Alert.alert('Hiba', 'Az érdeklődés visszavonása nem sikerült.');
              } else {
                Alert.alert('Siker', 'Sikeresen visszavontad az érdeklődésedet!');
                setAdatok(prevAdatok => prevAdatok.filter(event => event.esemeny_nev !== esemeny_nev));
              }
            } catch (error) {
              console.error('Hiba:', error);
              Alert.alert('Hiba', 'Az érdeklődés visszavonása nem sikerült.');
            }
          }
        }
      ]
    );
  };

  const filteredData = adatok2.filter((item) => {
    if (item.elfogadott === 1 && filterAccepted) return true;
    if (item.elfogadott === 2 && filterDenied) return true;
    if (item.elfogadott === 0 && filterPending) return true;
    return false;
  });

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <MaterialCommunityIcons name="logout" size={20} color="#fff" />
        <Text style={styles.logoutText}>Kijelentkezés</Text>
      </TouchableOpacity>

      {userRole === 'admin' ? (
        <>
          <Text style={styles.header}>Admin felület</Text>
          
          <View style={styles.filterContainer}>
            <View style={styles.filterItem}>
              <Text style={styles.filterText}>Elfogadott</Text>
              <Switch 
                trackColor={{ false: "#767577", true: "#28a745" }}
                thumbColor={filterAccepted ? "#fff" : "#f4f3f4"}
                value={filterAccepted} 
                onValueChange={setFilterAccepted} 
              />
            </View>
            
            <View style={styles.filterItem}>
              <Text style={styles.filterText}>Elutasított</Text>
              <Switch 
                trackColor={{ false: "#767577", true: "#dc3545" }}
                thumbColor={filterDenied ? "#fff" : "#f4f3f4"}
                value={filterDenied} 
                onValueChange={setFilterDenied} 
              />
            </View>
            
            <View style={styles.filterItem}>
              <Text style={styles.filterText}>Függőben</Text>
              <Switch 
                trackColor={{ false: "#767577", true: "#ffc107" }}
                thumbColor={filterPending ? "#fff" : "#f4f3f4"}
                value={filterPending} 
                onValueChange={setFilterPending} 
              />
            </View>
          </View>

          {filteredData.map((item, index) => (
            <View key={index} style={styles.card}>
              <Text style={styles.eventTitle}>{item.nev}</Text>
              
              <View style={styles.infoRow}>
                <MaterialCommunityIcons name="calendar" size={18} color="#0056b3" />
                <Text style={styles.infoText}>
                  {formatDate(item.datum_mettol)} - {formatDate(item.datum_meddig)}
                </Text>
              </View>
              
              <View style={styles.infoRow}>
                <MaterialCommunityIcons name="map-marker" size={18} color="#0056b3" />
                <Text style={styles.infoText}>{item.varos}, {item.helyszin}</Text>
              </View>
              
              <View style={styles.infoRow}>
                <MaterialCommunityIcons name="tag" size={18} color="#0056b3" />
                <Text style={styles.infoText}>{item.tipus}</Text>
              </View>
              
              <View style={styles.infoRow}>
                <MaterialCommunityIcons name="account" size={18} color="#0056b3" />
                <Text style={styles.infoText}>{item.felhasznalo}</Text>
              </View>
              
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Leírás</Text>
                <Text style={styles.description}>{item.leiras}</Text>
              </View>
              
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Részletek</Text>
                <Text style={styles.description}>{item.reszletek}</Text>
              </View>
              
              <View style={styles.statusContainer}>
                {item.elfogadott === 0 ? (
                  <Text style={styles.pendingStatus}>Függőben</Text>
                ) : item.elfogadott === 1 ? (
                  <Text style={styles.acceptedStatus}>Elfogadott</Text>
                ) : (
                  <Text style={styles.deniedStatus}>Elutasított</Text>
                )}
              </View>
              
              <View style={styles.buttonContainer}>
                {item.elfogadott !== 1 && (
                  <TouchableOpacity 
                    style={[styles.actionButton, styles.acceptButton]}
                    onPress={() => handleAccept(item.id)}
                  >
                    <MaterialCommunityIcons name="check" size={18} color="#fff" />
                    <Text style={styles.buttonText}>Elfogadás</Text>
                  </TouchableOpacity>
                )}
                
                {item.elfogadott !== 2 && (
                  <TouchableOpacity 
                    style={[styles.actionButton, styles.denyButton]}
                    onPress={() => handleDeny(item.id)}
                  >
                    <MaterialCommunityIcons name="close" size={18} color="#fff" />
                    <Text style={styles.buttonText}>Elutasítás</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          ))}
        </>
      ) : (
        <>
          <Text style={styles.header}>Eseményeid</Text>
          
          <TouchableOpacity 
            style={styles.createButton}
            onPress={() => navigation.navigate('EsemenyLetrehozas')}
          >
            <MaterialCommunityIcons name="plus" size={20} color="#fff" />
            <Text style={styles.createButtonText}>Új esemény létrehozása</Text>
          </TouchableOpacity>
          
          {adatok2.filter(item => email === item.felhasznalo).length > 0 ? (
            adatok2.filter(item => email === item.felhasznalo).map((item, index) => (
              <View key={index} style={styles.card}>
                <Text style={styles.eventTitle}>{item.nev}</Text>
                
                <View style={styles.infoRow}>
                  <MaterialCommunityIcons name="calendar" size={18} color="#0056b3" />
                  <Text style={styles.infoText}>
                    {formatDate(item.datum_mettol)} - {formatDate(item.datum_meddig)}
                  </Text>
                </View>
                
                <View style={styles.infoRow}>
                  <MaterialCommunityIcons name="map-marker" size={18} color="#0056b3" />
                  <Text style={styles.infoText}>{item.varos}, {item.helyszin}</Text>
                </View>
                
                <View style={styles.infoRow}>
                  <MaterialCommunityIcons name="tag" size={18} color="#0056b3" />
                  <Text style={styles.infoText}>{item.tipus}</Text>
                </View>
                
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Leírás</Text>
                  <Text style={styles.description}>{item.leiras}</Text>
                </View>
                
                <View style={styles.statusContainer}>
                  {item.elfogadott === 0 ? (
                    <Text style={styles.pendingStatus}>Függőben lévő jóváhagyás</Text>
                  ) : item.elfogadott === 1 ? (
                    <Text style={styles.acceptedStatus}>Elfogadva</Text>
                  ) : (
                    <Text style={styles.deniedStatus}>Elutasítva</Text>
                  )}
                </View>
                
                <TouchableOpacity 
                  style={[styles.actionButton, styles.deleteButton]}
                  onPress={() => handleDelete(item.id)}
                >
                  <MaterialCommunityIcons name="delete" size={18} color="#fff" />
                  <Text style={styles.buttonText}>Esemény törlése</Text>
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <Text style={styles.noEventsText}>Még nincsenek saját eseményeid</Text>
          )}

          <View style={styles.divider} />
          
          <Text style={styles.header}>Érdekelt események</Text>
          
          {adatok.filter(item => userId === item.felhasznaloid).length > 0 ? (
            adatok.filter(item => userId === item.felhasznaloid).map((item, index) => (
              <View key={index} style={styles.card}>
                <TouchableOpacity onPress={() => Erdekelt_Navigation(item.esemeny_nev, item.esemeny_datum)}>
                  <Text style={styles.eventTitle}>{item.esemeny_nev}</Text>
                  
                  <View style={styles.infoRow}>
                    <MaterialCommunityIcons name="calendar" size={18} color="#0056b3" />
                    <Text style={styles.infoText}>{formatDate(item.esemeny_datum)}</Text>
                  </View>
                  
                  {item.torolt === 1 && (
                    <Text style={styles.deletedStatus}>Ez az esemény törölve lett</Text>
                  )}
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={[styles.actionButton, styles.uninterestedButton]}
                  onPress={() => handleUninterested(item.felhasznaloid, item.esemeny_nev)}
                >
                  <MaterialCommunityIcons name="heart-broken" size={18} color="#fff" />
                  <Text style={styles.buttonText}>Nem érdekel</Text>
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <Text style={styles.noEventsText}>Még nincsenek érdekelt eseményeid</Text>
          )}
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dde6f0',
    padding: 15,
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
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0056b3',
    marginBottom: 20,
    textAlign: 'center',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  filterItem: {
    alignItems: 'center',
    flex: 1,
  },
  filterText: {
    fontSize: 14,
    marginBottom: 5,
    color: '#333',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  eventTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0056b3',
    marginBottom: 15,
    textAlign: 'center',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 15,
    marginLeft: 10,
    color: '#333',
  },
  section: {
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0056b3',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    color: '#444',
  },
  statusContainer: {
    alignItems: 'center',
    marginVertical: 15,
  },
  pendingStatus: {
    color: '#ffc107',
    fontWeight: 'bold',
    fontSize: 16,
  },
  acceptedStatus: {
    color: '#28a745',
    fontWeight: 'bold',
    fontSize: 16,
  },
  deniedStatus: {
    color: '#dc3545',
    fontWeight: 'bold',
    fontSize: 16,
  },
  deletedStatus: {
    color: '#dc3545',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
    fontStyle: 'italic',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  acceptButton: {
    backgroundColor: '#28a745',
    flex: 1,
    marginRight: 5,
  },
  denyButton: {
    backgroundColor: '#dc3545',
    flex: 1,
    marginLeft: 5,
  },
  deleteButton: {
    backgroundColor: '#dc3545',
  },
  uninterestedButton: {
    backgroundColor: '#6c757d',
    marginTop: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0056b3',
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
  createButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  divider: {
    height: 1,
    backgroundColor: '#0056b3',
    marginVertical: 25,
    opacity: 0.3,
  },
  noEventsText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#6c757d',
    marginTop: 20,
    fontStyle: 'italic',
  },
});

export default SajatEsemeny;
import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Alert
} from 'react-native';
import { useState, useEffect } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ipcim from './Ipcim';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const EsemenyFelhasznaloOldala = ({ route, navigation }) => {
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
        Alert.alert('Siker', 'Sikeresen kezelte az érdeklődést!');
        setErdekli(true);
      } else {
        Alert.alert('Hiba', 'Nem sikerült rögzíteni az érdeklődést.');
      }
    } catch (error) {
      console.error('Hiba:', error);
      Alert.alert('Hálózati hiba', 'Nem sikerült kapcsolódni a szerverhez.');
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
        Alert.alert('Siker', 'Sikeresen törölte az érdeklődést!');
        setErdekli(false);
      } else {
        Alert.alert('Hiba', 'Nem sikerült törölni az érdeklődést.');
      }
    } catch (error) {
      console.error('Hiba:', error);
      Alert.alert('Hiba', 'Hálózati hiba történt.');
    }
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
  };

  const handleDeny = async (eventId) => {
    Alert.alert(
      "Esemény elutasítása",
      "Biztosan el szeretnéd utasítani ezt az eseményt?",
      [
        {
          text: "Mégse",
          style: "cancel"
        },
        { 
          text: "Elutasítás", 
          onPress: async () => {
            try {
              const response = await fetch(Ipcim.Ipcim + 'felhasznaloEsemenyElutasitas', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: eventId }),
              });
          
              if (!response.ok) {
                throw new Error('Elutasítás nem sikerült');
              }
          
              Alert.alert('Siker', 'Esemény sikeresen elutasítva!');
              navigation.replace('EsemenyFelhasznalo');
            } catch (error) {
              console.error('Hiba:', error);
              Alert.alert('Hiba', 'Nem sikerült elutasítani az eseményt.');
            }
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container1}>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <MaterialCommunityIcons name="logout" size={24} color="#fff" />
        <Text style={styles.logoutText}>Kijelentkezés</Text>
      </TouchableOpacity>

      <View style={styles.eventCard}>
        <Text style={styles.eventName}>{adatok.nev}</Text>
        
        <View style={styles.detailRow}>
          <MaterialCommunityIcons name="calendar-range" size={20} color="#666" />
          <Text style={styles.detailText}>
            {formatDate(adatok.datum_mettol)} - {formatDate(adatok.datum_meddig)}
          </Text>
        </View>
        
        <View style={styles.detailRow}>
          <MaterialCommunityIcons name="map-marker" size={20} color="#666" />
          <Text style={styles.detailText}>{adatok.varos}, {adatok.helyszin}</Text>
        </View>
        
        <View style={styles.detailRow}>
          <MaterialCommunityIcons name="shape" size={20} color="#666" />
          <Text style={styles.detailText}>{adatok.tipus}</Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Leírás</Text>
          <Text style={styles.sectionContent}>{adatok.leiras}</Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Részletek</Text>
          <Text style={styles.sectionContent}>{adatok.reszletek}</Text>
        </View>

        {userRole === "admin" ? (
          <TouchableOpacity 
            style={[styles.actionButton, styles.denyButton]}
            onPress={() => handleDeny(adatok.id)}
          >
            <Text style={styles.actionButtonText}>Esemény elutasítása</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity 
            style={[styles.actionButton, erdekli ? styles.notInterestedButton : styles.interestedButton]}
            onPress={erdekli ? NemErdekles : Erdekles}
          >
            <MaterialCommunityIcons 
              name={erdekli ? "heart-off" : "heart"} 
              size={20} 
              color="#fff" 
              style={styles.buttonIcon}
            />
            <Text style={styles.actionButtonText}>
              {erdekli ? "Nem érdekel" : "Érdekel"}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    backgroundColor: '#dde6f0',
    padding: 20,
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
  eventCard: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  eventName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  detailText: {
    fontSize: 16,
    color: '#555',
    marginLeft: 10,
  },
  section: {
    marginTop: 15,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 5,
  },
  sectionContent: {
    fontSize: 15,
    color: '#666',
    lineHeight: 22,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  interestedButton: {
    backgroundColor: '#28a745',
  },
  notInterestedButton: {
    backgroundColor: '#6c757d',
  },
  denyButton: {
    backgroundColor: '#dc3545',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonIcon: {
    marginRight: 10,
  },
});

export default EsemenyFelhasznaloOldala;
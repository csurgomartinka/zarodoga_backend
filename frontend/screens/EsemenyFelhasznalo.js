import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  FlatList, 
  ActivityIndicator,
  Alert
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ipcim from './Ipcim';
import { useFocusEffect } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const EsemenyFelhasznalo = ({ navigation }) => {
    const [esemenyek, setEsemenyek] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchEsemenyek = async () => {
        try {
            const response = await fetch(Ipcim.Ipcim + 'felhasznaloEsemenyLista');
            const data = await response.json();
            const filteredData = data.filter(item => item.elfogadott === 1);
            setEsemenyek(filteredData);
            setError(null);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
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

    useFocusEffect(
        React.useCallback(() => {
            fetchEsemenyek();
        }, [])
    );

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    };

    const EsemenyOldalaMegjelenit = (item) => {
        navigation.navigate('EsemenyFelhasznaloOldala', { adatok: item });
    };

    if (loading) {
        return (
            <View style={styles.container1}>
                <ActivityIndicator size="large" color="#007bff" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.container1}>
                <Text style={styles.errorText}>{error}</Text>
                <TouchableOpacity style={styles.retryButton} onPress={fetchEsemenyek}>
                    <Text style={styles.retryButtonText}>Újrapróbálkozás</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.container1}>
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <MaterialCommunityIcons name="logout" size={24} color="#fff" />
                <Text style={styles.logoutText}>Kijelentkezés</Text>
            </TouchableOpacity>

            

            {esemenyek.length > 0 ? (
                <FlatList
                    data={esemenyek}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.eventItem}>
                            <TouchableOpacity style={{ flex: 1 }} onPress={() => EsemenyOldalaMegjelenit(item)}>
                                <View style={styles.adatokdoboz}>
                                    <Text style={styles.eventName}>{item.nev}</Text>
                                    <Text style={styles.eventDatevnev}>{item.varos}</Text>
                                    <Text style={styles.eventDate}>{item.helyszin}</Text>
                                    <Text style={styles.eventDatedatum}>
                                        {formatDate(item.datum_mettol)} - {formatDate(item.datum_meddig)}
                                    </Text>
                                    <Text style={styles.eventDateleiras}>{item.leiras}...</Text>   
                                </View>
                            </TouchableOpacity>
                        </View>
                    )}
                />
            ) : (
                <Text style={styles.noResultsText}>Nincsenek felhasználói események</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container1: {
        flex: 1,
        backgroundColor: '#dde6f0',
        padding: 20,
    },
    eventItem: {
        backgroundColor: '#ffffff',
        marginBottom: 12,
        borderRadius: 10,
        padding: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    adatokdoboz: {
        paddingBottom: 5,
    },
    eventName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    eventDatevnev: {
        fontSize: 15,
        marginBottom: 2,
    },
    eventDate: {
        fontSize: 14,
        color: '#333',
    },
    eventDatedatum: {
        fontSize: 14,
        color: '#1565c0',
        textDecorationLine: 'underline',
        marginTop: 2,
    },
    eventDateleiras: {
        fontSize: 13,
        fontStyle: 'italic',
        color: '#666',
        marginTop: 4,
    },
    noResultsText: {
        fontSize: 18,
        color: 'red',
        textAlign: 'center',
        marginTop: 20,
    },
    backButton: {
        backgroundColor: '#007bff',
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
    buttonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonIcon: {
        marginRight: 10,
    },
    userEventButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
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
    errorText: {
        fontSize: 18,
        color: 'red',
        textAlign: 'center',
        marginTop: 20,
    },
    retryButton: {
        backgroundColor: '#007bff',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginTop: 20,
        alignSelf: 'center',
    },
    retryButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default EsemenyFelhasznalo;
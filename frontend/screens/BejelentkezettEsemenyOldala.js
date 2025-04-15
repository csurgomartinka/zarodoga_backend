import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Alert, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
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
            // Dátum formázása YYYY-MM-DD formátumba
            const formatDate = (dateString) => {
                const date = new Date(dateString);
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const day = String(date.getDate()).padStart(2, '0');
                return `${year}-${month}-${day}`;
            };
    
            const formattedDate = formatDate(adatok.datum_kezdet);
            
            const response = await fetch(Ipcim.Ipcim + 'ErdekeltFelvitel', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    felhasznaloid: user,
                    esemeny_nev: adatok.nev,
                    esemeny_datum: formattedDate
                }),
            });
            
            if (response.ok) {
                setErdekli(true);
                Alert.alert('Siker', 'Sikeresen jelölted az eseményt!');
            } else {
                const errorData = await response.json();
                Alert.alert('Hiba', errorData.message || 'Nem sikerült rögzíteni az érdeklődést.');
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
                setErdekli(false);
            } else {
                Alert.alert('Hiba', 'Nem sikerült eltávolítani az érdeklődést.');
            }
        } catch (error) {
            console.error('Hiba:', error);
            Alert.alert('Hálózati hiba', 'Nem sikerült kapcsolódni a szerverhez.');
        }
    };

    const handleEventDelete = async () => {
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
                            const response = await fetch(Ipcim.Ipcim + 'egyEsemenyTorles', {
                                method: 'DELETE',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({ id: adatok.id })
                            });
                    
                            if (response.ok) {
                                const erdekeltListaResponse = await fetch(Ipcim.Ipcim + 'erdekeltLista');
                                const erdekeltListaData = await erdekeltListaResponse.json();
                                const vanErdeklo = erdekeltListaData.some(item => item.esemeny_nev === adatok.nev);
                    
                                if (vanErdeklo) {
                                    await fetch(Ipcim.Ipcim + `erdekeltEsemenyModositas/${adatok.nev}`, {
                                        method: 'PUT',
                                        headers: {
                                            'Content-Type': 'application/json',
                                        },
                                    });
                                }
                                
                                Alert.alert('Siker', 'Az esemény sikeresen törlésre került.', [
                                    { 
                                        text: 'OK', 
                                        onPress: () => navigation.replace('BejelentkezettEsemeny')
                                    }
                                ]);
                            } else {
                                const errorText = await response.text();
                                Alert.alert('Hiba', 'Az esemény törlése nem sikerült.');
                                console.error('Törlés nem sikerült:', errorText);
                            }
                        } catch (error) {
                            console.error('Hiba:', error);
                            Alert.alert('Hálózati hiba', 'A hálózati kérés során hiba lépett fel.');
                        }
                    }
                }
            ]
        );
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

    return (
        <ScrollView style={styles.container}>
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <MaterialCommunityIcons name="logout" size={24} color="#fff" />
                <Text style={styles.logoutText}>Kijelentkezés</Text>
            </TouchableOpacity>

            <View style={styles.card}>
                <Text style={styles.eventTitle}>{adatok.nev}</Text>
                
                <View style={styles.infoRow}>
                    <MaterialCommunityIcons name="map-marker" size={20} color="#0056b3" />
                    <Text style={styles.infoText}>{adatok.vnev}, {adatok.helyszin_nev}</Text>
                </View>
                
                <View style={styles.infoRow}>
                    <MaterialCommunityIcons name="calendar" size={20} color="#0056b3" />
                    <Text style={styles.infoText}>
                       {adatok.datum}
                    </Text>
                </View>
                
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Részletek</Text>
                    <Text style={styles.description}>{adatok.reszletek}</Text>
                </View>

                {userRole === "admin" ? (
                    <TouchableOpacity 
                        style={[styles.actionButton, styles.deleteButton]}
                        onPress={handleEventDelete}
                    >
                        <MaterialCommunityIcons name="delete" size={20} color="#fff" />
                        <Text style={styles.actionButtonText}>Esemény törlése</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity 
                        style={[styles.actionButton, erdekli ? styles.uninterestedButton : styles.interestedButton]}
                        onPress={erdekli ? NemErdekles : Erdekles}
                    >
                        <MaterialCommunityIcons 
                            name={erdekli ? "heart-broken" : "heart"} 
                            size={20} 
                            color="#fff" 
                        />
                        <Text style={styles.actionButtonText}>
                            {erdekli ? "Nem érdekel" : "Érdekel"}
                        </Text>
                    </TouchableOpacity>
                )}
            </View>
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
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    eventTitle: {
        fontSize: 24,
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
        fontSize: 16,
        marginLeft: 10,
        color: '#333',
    },
    section: {
        marginTop: 20,
        paddingTop: 15,
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#0056b3',
        marginBottom: 10,
    },
    description: {
        fontSize: 15,
        lineHeight: 22,
        color: '#444',
        textAlign: 'justify',
    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginTop: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3,
    },
    interestedButton: {
        backgroundColor: '#28a745',
    },
    uninterestedButton: {
        backgroundColor: '#6c757d',
    },
    deleteButton: {
        backgroundColor: '#dc3545',
    },
    actionButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 10,
    },
});

export default BejelentkezettEsemenyOldala;
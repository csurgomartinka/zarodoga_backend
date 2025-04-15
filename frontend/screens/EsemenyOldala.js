import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';

const EsemenyOldala = ({ route }) => {
    const { adatok } = route.params;

    return (
        <ScrollView style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.title}>{adatok.nev}</Text>
                
                <View style={styles.infoRow}>
                    <MaterialCommunityIcons name="account" size={20} color="#0056b3" />
                    <Text style={styles.infoText}>Szervező: {adatok.vnev}</Text>
                </View>
                
                <View style={styles.infoRow}>
                    <MaterialCommunityIcons name="map-marker" size={20} color="#0056b3" />
                    <Text style={styles.infoText}>Helyszín: {adatok.helyszin_nev}</Text>
                </View>
                
                <View style={styles.infoRow}>
                    <MaterialCommunityIcons name="calendar" size={20} color="#0056b3" />
                    <Text style={styles.infoText}>Dátum: {adatok.datum}</Text>
                </View>
                
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Részletek</Text>
                    <Text style={styles.description}>{adatok.reszletek}</Text>
                </View>
                
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#dde6f0',
        padding: 15,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#0056b3',
        marginBottom: 20,
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
    },
    imagePlaceholder: {
        height: 200,
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    imageText: {
        color: '#888',
        marginTop: 10,
    },
});

export default EsemenyOldala;
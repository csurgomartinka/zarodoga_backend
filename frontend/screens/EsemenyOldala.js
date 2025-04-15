import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

const EsemenyOldala = ({ route }) => {
    const { adatok } = route.params;

    return (
        <ScrollView>
            <Text>{adatok.nev}</Text>
            <Text>{adatok.vnev}</Text>
            <Text>{adatok.helyszin_nev}</Text>
            <Text>{adatok.datum}</Text>
            <Text>{adatok.reszletek}</Text>
        </ScrollView>
    );
}

export default EsemenyOldala;

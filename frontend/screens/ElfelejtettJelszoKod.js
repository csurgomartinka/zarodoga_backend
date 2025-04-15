import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function ElfelejtettJelszoKod({ navigation, route }) {
    const [kod,setKod] = useState("")
    const [elkuldottkod,setElkuldottkod] = useState("")
    const [email,setEmail] = useState("")

    const generateRandomCode = () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let code = '';
        for (let i = 0; i < 6; i++) {
          code += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        setElkuldottkod(code);
      };

      const sendResetCode = async () => {
        try {
          const response = await axios.post(Ipcim.Ipcim +'send-email', {
            email: email,
            resetCode: elkuldottkod,
          });
          console.log(response.data);
        } catch (error) {
          console.error('Error sending reset code:', error);
          alert('Hiba történt a kód küldése során.');
        }
      };

      useEffect(() => {
        if (route.params?.email) {
          setEmail(route.params.email);
          generateRandomCode()
        }
      }, [route.params?.email]);

      useEffect(() => {
        if (email && elkuldottkod) {
            sendResetCode();
        }
    }, [email, elkuldottkod]);


    return (
        <View>
            <Text>Küldtünk egy kódot az email címedre, kérlek add meg itt a kapott kódott.</Text>
            <TextInput
        placeholder="Kód"
        value={kod}
        onChangeText={setKod}
      />
      <Button title='Küldés' onPress={() => {
        if (kod == elkuldottkod)
        {
            alert("Sikerült")
            navigation.navigate("UjJelszoBeallitasa", {email: email})
        }
        else alert("Hibás kód")
      }}/>
        </View>
  );
}
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "#ff7043" }}>
      <View style={styles.circleTopLeft} />
      <View style={styles.circleBottomRight} />

      <View style={styles.centerContainer}>
        <View style={{ margin: 20 }}>
          <Button
            title="Bejelentkezés"
            onPress={() => navigation.navigate('Bejelentkezes')}
          />
        </View>

        <Button
          title="Regisztrálás"
          onPress={() => navigation.navigate('Regisztralas')}
        />
        <View style={{ margin: 20 }}>
        <Button
          title="Folytatás vendégként"
          onPress={() => navigation.navigate('Fomenu')}
        />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e7e1df', // Background color
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleTopLeft: {
    position: 'absolute',
    top: -100, // Adjusted position to accommodate larger size
    left: -100,
    width: 300, // Increased size
    height: 300, // Increased size
    backgroundColor: '#1f8dd6',
    borderRadius: 150, // Half of the width/height for a perfect circle
  },
  circleBottomRight: {
    position: 'absolute',
    bottom: -100, // Adjusted position to accommodate larger size
    right: -100,
    width: 300, // Increased size
    height: 300, // Increased size
    backgroundColor: '#1f8dd6',
    borderRadius: 150, // Half of the width/height for a perfect circle
  },
  centerContainer: {
    width: 250,
    height: 230,
    backgroundColor: '#ADD8E6', // Center rectangle color
    padding: 20,
    alignItems: 'center',
    borderRadius: 40,
  },
  button: {
    width: '100%',
    backgroundColor: 'red',
    paddingVertical: 10,
    marginVertical: 5,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

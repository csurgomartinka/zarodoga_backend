import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import Bejelentkezes from './screens/Bejelentkezes';
import Regisztralas from './screens/Regisztralas';
import Fomenu from './screens/Fomenu';
import Bejelentkezett from './screens/Bejelentkezett';
import SajatEsemeny from './screens/SajatEsemeny';
import EsemenyLetrehozas from './screens/EsemenyLetrehozas';
import BejelentkezettEsemeny from './screens/BejelentkezettEsemeny';
import BejelentkezettEsemenyOldala from './screens/BejelentkezettEsemenyOldala';
import ElfelejtettJelszo from './screens/ElfelejtettJelszo';
import ElfelejtettJelszoKod from './screens/ElfelejtettJelszoKod';
import UjJelszoBeallitasa from './screens/UjJelszoBeallitasa';
import EsemenyFelhasznalo from './screens/EsemenyFelhasznalo';
import EsemenyFelhasznaloOldala from './screens/EsemenyFelhasznaloOldala';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();



export default function App() {
  return (
    
      <NavigationContainer>
        <Stack.Navigator >
          <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ title: 'Home',headerShown: false }} />
          <Stack.Screen name="Bejelentkezes" component={Bejelentkezes} />
          <Stack.Screen name="Regisztralas" component={Regisztralas} />
          <Stack.Screen name="Fomenu" component={Fomenu} options={{ headerShown: false }}/>
          <Stack.Screen name='Bejelentkezett' component={Bejelentkezett} options={{ headerShown: false }}/>
          <Stack.Screen name="SajatEsemeny" component={SajatEsemeny} />
          <Stack.Screen name="EsemenyLetrehozas" component={EsemenyLetrehozas} />
          <Stack.Screen name="BejelentkezettEsemeny" component={BejelentkezettEsemeny} />
          <Stack.Screen name="BejelentkezettEsemenyOldala" component={BejelentkezettEsemenyOldala} />
          <Stack.Screen name='ElfelejtettJelszo' component={ElfelejtettJelszo} />
          <Stack.Screen name='ElfelejtettJelszoKod' component={ElfelejtettJelszoKod} />
          <Stack.Screen name='UjJelszoBeallitasa' component={UjJelszoBeallitasa} />
          <Stack.Screen name='EsemenyFelhasznalo' component={EsemenyFelhasznalo} />
          <Stack.Screen name="EsemenyFelhasznaloOldala" component={EsemenyFelhasznaloOldala} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}
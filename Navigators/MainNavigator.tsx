// Importar las dependencias necesarias
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

// Importar tus componentes de pantallas

import BienvenidaScreen from '../screens/BienvenidaScreen';
import LoginScreen from '../screens/LoginScreen';
import RegistroScreen from '../screens/RegistroScreen';
import PerfilScreen from '../screens/PerfilScreen';

// Configurar el Stack Navigator para la bienvenida, login y registro
const Stack = createStackNavigator();
const StackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Bienvenida" component={BienvenidaScreen} />
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Registro" component={RegistroScreen} />

  </Stack.Navigator>
);

// Configurar el Bottom Tab Navigator para la ventana de bienvenida y perfil
const Tab = createBottomTabNavigator();
const TabNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen name="Bienvenida" component={StackNavigator} />
    <Tab.Screen name="Perfil" component={PerfilScreen} />
  </Tab.Navigator>
);

// Configurar el Drawer Navigator para el menú lateral
const Drawer = createDrawerNavigator();
const AppNavigator = () => (
  <Drawer.Navigator>
    <Drawer.Screen name="Inicio" component={TabNavigator} />
  </Drawer.Navigator>
);

// Envolver todo en el contenedor de navegación
const App = () => (
  <NavigationContainer>
    <AppNavigator />
  </NavigationContainer>
);

export default App;

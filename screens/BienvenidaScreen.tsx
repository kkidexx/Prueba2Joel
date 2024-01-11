import React from 'react';
import { StyleSheet, Text, View, Button, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LoginScreen from './LoginScreen';
import RegistroScreen from './RegistroScreen';

export default function BienvenidaScreen() {
  const navigation = useNavigation();

  const goToLogin = () => {
    // Navegar a la ventana de Login
    navigation.navigate('Login');
  };

  const goToRegistro = () => {
    // Navegar a la ventana de Registro
    navigation.navigate('Registro');
  };

  return (
    <ImageBackground
      source={{ uri: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' }}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text></Text>
        <Button title="Ir a Login" onPress={goToLogin} />
        <Button title="Ir a Registro" onPress={goToRegistro} />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // Ajusta el valor alpha para la transparencia
    padding: 20,
    borderRadius: 10,
  },
});

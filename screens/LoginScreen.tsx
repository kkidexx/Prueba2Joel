import React, { useState } from 'react';
import { Button, StyleSheet, Text, View, TextInput, ImageBackground, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../config/Config';
import { Alert } from 'react-native';

export default function LoginScreen({ navigation }: any) {
  const [correo, setCorreo] = useState('');
  const [contrasenia, setContrasenia] = useState('');

  function login() {
    // Validación básica
    if (!correo || !contrasenia) {
      Alert.alert("Advertencia", "Por favor, ingresa correo y contraseña.");
      return;
    }

    signInWithEmailAndPassword(auth, correo, contrasenia)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);

        navigation.navigate("Drawer_Welcome");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);

        if (errorCode === "auth/invalid-credential") {
          Alert.alert("ERROR", "Credenciales incorrectas");
        } else if (errorCode === "auth/missing-password") {
          Alert.alert("ERROR", "Contraseña perdida");
        } else {
          Alert.alert("ERROR");
        }
      });
  }

  return (
    <ImageBackground
      source={{uri:'https://images.pexels.com/photos/41951/solar-system-emergence-spitzer-telescope-telescope-41951.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'}} // Reemplaza con la ruta correcta de tu imagen de fondo
      style={styles.container}
    >
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <View style={styles.overlay}>
          <Text style={styles.title}>Login</Text>
          <TextInput
            style={styles.input}
            placeholder='Ingresar email'
            keyboardType='email-address'
            onChangeText={(texto: any) => setCorreo(texto)}
          />

          <TextInput
            style={styles.input}
            placeholder="Ingresar contraseña"
            onChangeText={(texto: any) => setContrasenia(texto)}
            secureTextEntry
          />

          <Button title='Ingresar' onPress={() => login()} />

          <TouchableOpacity onPress={() => navigation.navigate('Registro')}>
            <Text style={styles.registerLink}></Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  title: {
    fontSize: 30,
    color: 'white',
    marginBottom: 20,
  },
  input: {
    backgroundColor: 'white',
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
  },
  registerLink: {
    color: 'white',
    marginTop: 10,
    textAlign: 'center',
  },
});

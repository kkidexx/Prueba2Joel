import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, ImageBackground } from 'react-native';
import { createUserWithEmailAndPassword } from "firebase/auth";
import {  database, set, ref } from '../config/Config';
import { auth } from '../config/Config';

export default function RegistroScreen({ navigation }: any) {
  const [correo, setCorreo] = useState('');
  const [contrasenia, setContrasenia] = useState('');
  const [nick, setNick] = useState('');
  const [edad, setEdad] = useState('');

  const guar = (nick: string, email: string, edad: string, nombre: string) => {
    set(ref(database, 'usuarios/' + nick), {
      correo_elec: email,
      edad: edad,
      nombre: nombre
    });
  };

  const handleRegistro = () => {
    createUserWithEmailAndPassword(auth, correo, contrasenia)
      .then((userCredential) => {
        const user = userCredential.user;
        const uid = user.uid;

        // Almacena los datos del usuario en la Realtime Database
        const userRef = ref(database, `users/${uid}`);
        set(userRef, {
          email: correo,
          nick: nick,
          age: edad,
        });

        // Llama a la función guar para almacenar información adicional en la base de datos
        guar(nick, correo, edad, 'Usuario');

        console.log("REGISTRO CORRECTO");
        // También llama a la función guar cuando se registra para almacenar la información adicional
        navigation.navigate('Drawer_Welcome');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        if (errorCode === 'auth/weak-password') {
          Alert.alert("Error", "La contraseña debe poseer 6 caracteres");
        } else if (errorCode === 'auth/email-already-in-use') {
          Alert.alert("Error", "El correo ya está en uso");
        } else {
          Alert.alert("Error", errorMessage);
        }
      });
  };

  return (
    <ImageBackground
      source={{ uri: 'https://images.pexels.com/photos/7736062/pexels-photo-7736062.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' }}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Registro</Text>
        <TextInput
          style={styles.input}
          placeholder='Ingrese email'
          onChangeText={(texto) => setCorreo(texto)}
        />
        <TextInput
          style={styles.input}
          placeholder='Ingrese contraseña'
          onChangeText={(texto) => setContrasenia(texto)}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="Ingrese un nick"
          onChangeText={(texto) => setNick(texto)}
        />
        <TextInput
          style={styles.input}
          placeholder="Edad"
          onChangeText={(texto) => setEdad(texto)}
        />

        {/* Agrega un botón adicional para llamar a la función guar */}
        <Button title='Guardar' onPress={() => guar(nick, correo, edad, 'Usuario')} />

        {/* El botón de registro llama a handleRegistro que también llama a la función guar */}
        <Button title='Registrarse' onPress={handleRegistro} />
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 8,
    backgroundColor: 'white',
  },
});

import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ImageBackground } from 'react-native';

export default function PerfilScreen() {
  const [userData, setUserData] = useState({
    nombre: 'Usuario',
    correo: 'usuario@example.com',
  });

  const handleEdit = () => {
    // Implementa la lógica para guardar los cambios en la base de datos o en el estado global de la aplicación
    console.log('Datos editados:', userData);
  };

  return (
    <ImageBackground
      source={{ uri: 'https://images.pexels.com/photos/36717/amazing-animal-beautiful-beautifull.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' }}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.title}>Perfil de Usuario</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Nombre:</Text>
          <Text style={styles.text}>{userData.nombre}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Correo:</Text>
          <Text style={styles.text}>{userData.correo}</Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Nuevo nombre"
          onChangeText={(text) => setUserData({ ...userData, nombre: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Nuevo correo"
          onChangeText={(text) => setUserData({ ...userData, correo: text })}
        />
        <Button title="Editar" onPress={handleEdit} />
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
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Fondo blanco semitransparente
    padding: 16,
    borderRadius: 10,
    width: '80%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
    textAlign: 'center',
  },
  infoContainer: {
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'black',
  },
  text: {
    fontSize: 16,
    color: 'black',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
    backgroundColor: 'white', // Fondo blanco para hacer visible el texto
    borderRadius: 8,
  },
});

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert,} from 'react-native';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {

      //infos para teste!
      if (email === 'veetorsystems@auxilia.med' && password === '123456') {
        navigation.navigate('ListaHospitais');
      } else {
        Alert.alert('Erro de Login', 'Credenciais inválidas');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Faça o Login na Aplicação!</Text>
      <Text style={styles.info}>" Email e Senha de teste estão presentes no "LoginScreen.js" "</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFD6D6'
  },

  title: {
    fontSize: 24,
    marginBottom: 16,
  },

  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 4,
    marginBottom: 16,
    padding: 8,
  },

  info: {
    color: "#5A5858",
    fontStyle: 'italic',
    marginBottom: 16
  }
});

export default LoginScreen;

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NovoHospitalScreen = ({ navigation }) => {
  const [nome, setNome] = useState('');
  const [login, setLogin] = useState('');
  const [cadastro, setCadastro] = useState('');
  const [consulta, setConsulta] = useState('');
  const [exame, setExame] = useState('');
  const [localidade, setLocalidade] = useState('');


  const adicionarHospital = async () => {
    try {
      const id = Math.random().toString(36).substring(7);
      const novoHospital = { id, nome, login, cadastro, consulta, exame, localidade };
      const hospitalJson = await AsyncStorage.getItem('hospitais');
      let listaHospitais = [];
      if (hospitalJson) {
        listaHospitais = JSON.parse(hospitalJson);
      }
      listaHospitais.push(novoHospital);
      await AsyncStorage.setItem('hospitais', JSON.stringify(listaHospitais));
      navigation.goBack();
    } catch (error) {
      console.error('Erro ao adicionar hospital:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Novo Médico</Text>
      <TextInput
        placeholder="Nome"
        value={nome}
        onChangeText={(text) => setNome(text)}
      />
      <TextInput
        placeholder="Login"
        value={login}
        onChangeText={(text) => setLogin(text)}
      />

      <TextInput
        placeholder="Cadastro"
        value={cadastro}
        onChangeText={(text) => setCadastro(text)}
      />

      <TextInput
        placeholder="Consulta"
        value={consulta}
        onChangeText={(text) => setConsulta(text)}
      />

      <TextInput
        placeholder="Exame"
        value={exame}
        onChangeText={(text) => setExame(text)}
      />

            <TextInput
        placeholder="Localidade"
        value={localidade}
        onChangeText={(text) => setLocalidade(text)}
      />
      <Button title="Adicionar Médico" onPress={adicionarHospital} />
    </View>
  );
};

const styles = StyleSheet.create({

  container: {
    padding: 25,
    height: '100%',
    //flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFD6D6'
  },

});


export default NovoHospitalScreen;

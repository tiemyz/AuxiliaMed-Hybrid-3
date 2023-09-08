import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DetalhesHospitalScreen = ({ route, navigation }) => {
  const { hospital } = route.params;
  const [nome, setNome] = useState(hospital.nome);
  const [login, setLogin] = useState(hospital.login);
  const [cadastro, setCadastro] = useState(hospital.cadastro);
  const [consulta, setConsulta] = useState(hospital.consulta);
  const [exame, setExame] = useState(hospital.exame);
  const [localidade, setLocalidade] = useState(hospital.localidade);



  const atualizarHospital = async () => {
    try {
      const hospitalAtualizado = { ...hospital, nome, login, cadastro, consulta, exame, localidade };
      const hospitalJson = await AsyncStorage.getItem('hospitais');
      let listaHospitais = [];
      if (hospitalJson) {
        listaHospitais = JSON.parse(hospitalJson);
        const index = listaHospitais.findIndex((m) => m.id === hospital.id);
        if (index !== -1) {
          listaHospitais[index] = hospitalAtualizado;
          await AsyncStorage.setItem('hospitais', JSON.stringify(listaHospitais));
          navigation.goBack();
        }
      }
    } catch (error) {
      console.error('Erro ao atualizar hospital:', error);
    }
  };

  const excluirHospital = async () => {
    try {
      const hospitalJson = await AsyncStorage.getItem('hospitais');
      if (hospitalJson) {
        const listaHospitais = JSON.parse(hospitalJson);
        const novaListaHospitais = listaHospitais.filter((m) => m.id !== hospital.id);
        await AsyncStorage.setItem('hospitais', JSON.stringify(novaListaHospitais));
        navigation.goBack();
      }
    } catch (error) {
      console.error('Erro ao excluir hospital:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Detalhes do hospital</Text>
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
      <Button title="Atualizar hospital" onPress={atualizarHospital} />
      <Button title="Excluir hospital" onPress={excluirHospital} />
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

export default DetalhesHospitalScreen;
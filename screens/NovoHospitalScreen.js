import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';

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
      <Text style={styles.titulo}>Cadastro de Hospital</Text>

      <ScrollView>
        <View style={styles.contentView}>
          <Text style={styles.inputTitle}>Nome do Hospital:</Text>
          <TextInput
            style={styles.inputHospital} // input
            placeholder="Nome do hospital"
            value={nome}
            onChangeText={(text) => setNome(text)}
          />

          <Text style={styles.inputTitle}>Detalhes de Login:</Text>
          <TextInput
            style={styles.inputHospitalText} // input
            multiline={true} 
            placeholder="Como fazer Login no site do hospital"
            value={login}
            onChangeText={(text) => setLogin(text)}
          />

          <Text style={styles.inputTitle}>Detalhes de Cadastro:</Text>
          <TextInput
            style={styles.inputHospitalText} // input
            multiline={true} 
            placeholder="Como fazer Cadastro no site do hospital"
            value={cadastro}
            onChangeText={(text) => setCadastro(text)}
          />

          <Text style={styles.inputTitle}>Detalhes de Consulta:</Text>
          <TextInput
            style={styles.inputHospitalText} // input
            multiline={true} 
            placeholder="Como marcar uma Consulta no site do hospital"
            value={consulta}
            onChangeText={(text) => setConsulta(text)}
          />

          <Text style={styles.inputTitle}>Detalhes de Exame:</Text>
          <TextInput
            style={styles.inputHospitalText} // input
            multiline={true} 
            placeholder="Como acessar um Exame no site do hospital"
            value={exame}
            onChangeText={(text) => setExame(text)}
          />
  
          <Text style={styles.inputTitle}>Detalhes de Localidade:</Text>
          <TextInput
            style={styles.inputHospitalText} // input
            multiline={true} 
            placeholder="Localidade do hospital"
            value={localidade}
            onChangeText={(text) => setLocalidade(text)}
          />
        </View>
      </ScrollView>

      <View style={styles.viewDetalhes}>
        <TouchableOpacity
          style={styles.botaoDetalhes}
          onPress={adicionarHospital}
        >
          <Text style={styles.detalhesText}>Adicionar Hospital</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({

  container: {
    padding: 25,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFD6D6'
  },

  titulo: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  contentView: {
    flex: 1,
    padding: 16,
  },

  inputHospital: {
    width: 300,
    marginVertical: 15,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
  },

  inputHospitalText: {
    width: 300,
    height: 200, 
    borderWidth: 1,
    borderColor: '#000000',
    marginVertical: 15,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    fontStyle: 'italic'
  },

  inputTitle: {
    fontWeight: 'bold',
    fontSize: 20
  },

  viewDetalhes: {
    flexDirection: 'row'
  },

  botaoDetalhes: {
    backgroundColor: 'lightblue',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
  },

  detalhesText: {
    fontWeight: 'bold'
  }

});


export default NovoHospitalScreen;

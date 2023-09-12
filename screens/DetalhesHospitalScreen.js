import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
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
      <Text style={styles.titulo}>Detalhes do hospital</Text>

      <ScrollView>
        <View style={styles.contentView}>
            <Text style={styles.inputTitle}>Nome do Hospital:</Text>
            <TextInput
              style={styles.inputHospital} 
              placeholder="Nome do hospital"
              value={nome}
              onChangeText={(text) => setNome(text)}
            />

            <Text style={styles.inputTitle}>Detalhes de Login:</Text>
            <TextInput
              style={styles.inputHospitalText} 
              multiline={true} 
              placeholder="Como fazer Login no site do hospital"
              value={login}
              onChangeText={(text) => setLogin(text)}
            />

            <Text style={styles.inputTitle}>Detalhes de Cadastro:</Text>
            <TextInput
              style={styles.inputHospitalText} 
              multiline={true} 
              placeholder="Como fazer Cadastro no site do hospital"
              value={cadastro}
              onChangeText={(text) => setCadastro(text)}
            />

            <Text style={styles.inputTitle}>Detalhes de Consulta:</Text>
            <TextInput
              style={styles.inputHospitalText} 
              multiline={true} 
              placeholder="Como marcar uma Consulta no site do hospital"
              value={consulta}
              onChangeText={(text) => setConsulta(text)}
            />

            <Text style={styles.inputTitle}>Detalhes de Exame:</Text>
            <TextInput
              style={styles.inputHospitalText}
              multiline={true} 
              placeholder="Como acessar um Exame no site do hospital"
              value={exame}
              onChangeText={(text) => setExame(text)}
            />

            <Text style={styles.inputTitle}>Detalhes de Localidade:</Text>
            <TextInput
              style={styles.inputHospitalText} 
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
          onPress={atualizarHospital}
        >
          <Text style={styles.detalhesText}>Atualizar hospital</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botaoDetalhes}
          onPress={excluirHospital}
        >
          <Text style={styles.detalhesText}>Excluir hospital</Text>
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

export default DetalhesHospitalScreen;
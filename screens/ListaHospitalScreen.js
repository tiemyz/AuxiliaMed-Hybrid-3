import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const ListaHospitalScreen = ({ navigation }) => {
  const [hospitais, setHospitais] = useState([]); //pesquisa só pelo nome do hospital
  const [searchQuery, setSearchQuery] = useState('');

  const carregarHospitais = async () => {
    try {
      const hospitalJson = await AsyncStorage.getItem('hospitais');
      if (hospitalJson) {
        setHospitais(JSON.parse(hospitalJson));
      }
    } catch (error) {
      console.error('Erro ao buscar hospital:', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      carregarHospitais();
    }, [])
  );

  const filtrarHospitais = () => {
    if (searchQuery.trim() === '') {
      carregarHospitais();
    } else {
      const hospitaisFiltrados = hospitais.filter((hospital) =>
        hospital.nome.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setHospitais(hospitaisFiltrados);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.hospitalItem}>
      <TouchableOpacity
        onPress={() => navigation.navigate('DetalhesHospital', { hospital: item })}
      >
        <Text style={styles.itemText}>{item.nome}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.botaoDetalhes}
        onPress={() => navigation.navigate('DetalhesHospital', { hospital: item })}
      >
        <Text>Detalhes</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.superior}>
        <View style={styles.barraAcao}>
            <TextInput
              placeholder="Pesquisar por nome do hospital"
              style={styles.inputPesquisa}
              value={searchQuery}
              onChangeText={(text) => setSearchQuery(text)}
            />

            <TouchableOpacity
              style={styles.botaoPesquisa}
              onPress={filtrarHospitais}
            >
              <Text>Pesquisar</Text>
            </TouchableOpacity>

            
            <TouchableOpacity
              style={styles.botaoLimpar}
              onPress={() => {
                setSearchQuery('');
                carregarHospitais();
              }}
            >
              <Text>Limpar</Text>
            </TouchableOpacity>
        </View>

        
          <TouchableOpacity
            style={styles.botaoRosa}
            onPress={() => navigation.navigate('NovoHospital')}
          >
            <Text style={styles.textoBotaoRosa}>Adicionar Hospital</Text>
          </TouchableOpacity>
      </View>
      
      <Text style={styles.titulo}>Lista de Hospitais Cadastrados</Text>

      <FlatList
        data={hospitais}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({

  superior: {
    //backgroundColor: 'green',
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 10,
  },

  container: {
    padding: 25,
    height: '100%',
    //flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFD6D6'
  },

  barraAcao: {
    flexDirection: 'row',
    //alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },

  inputPesquisa: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  botaoPesquisa: {
    marginLeft: 10,
    backgroundColor: 'pink',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botaoLimpar: {
    marginLeft: 10,
    backgroundColor: 'lightgray',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  hospitalItem: {
    //backgroundColor: 'green',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 450,
    marginBottom: 10,
  },

  itemText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20

  },

  botaoDetalhes: {
    backgroundColor: 'lightblue',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botaoRosa: {
    backgroundColor: 'pink',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  textoBotaoRosa: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ListaHospitalScreen;
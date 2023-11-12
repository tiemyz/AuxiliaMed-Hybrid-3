import React, { useState, useReducer, createContext, useContext, useEffect } from 'react';
import { Button, StyleSheet, Text, TextInput, View, TouchableOpacity, FlatList, Image } from 'react-native';
import { object, string } from 'yup';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { Entypo as Icon } from '@expo/vector-icons';
import HeartImage from './assets/heart.png';  

const estadoInicio = {
  upas: []
};

const contextoInicial = {
  id: "",
  setId: (valor) => { },
  nome: "",
  setNome: (valor) => { },
  localidade: "",
  setLocalidade: (valor) => { },
  estado: {},
  dispatcher: (action) => { },
  salvar: () => { }
};

const Contexto = createContext(contextoInicial);

const funcaoReducer = (estado, { type, payload }) => {
  if (type === "LISTA_LIMPAR") {
    return { upas: [] };
  } if (type === "LISTA_ADICIONAR") {
    return { upas: [...estado.upas, payload] };
  }
  throw new Error("Tipo inválido na funçãoReducer");
};

const { Screen, Navigator } = createBottomTabNavigator();

const UpaSchema = object({
  nome: string().required().min(5),
  localidade: string().required().min(5)
});

const persistenciaRestAPI = () => {
  const api = axios.create({
    baseURL: "https://auxiliamed-database-default-rtdb.firebaseio.com"
  });

  const salvarAPI = (obj) => {
    return api.post("/upas.json", obj);
  };

  const atualizarAPI = (id, obj) => {
    return api.put(`/upas/${id}.json`, obj);
  };

  const apagarAPI = (id) => {
    return api.delete(`/upas/${id}.json`);
  };

  const carregarAPI = () => {
    return api.get("/upas.json");
  };

  return {
    salvarAPI,
    atualizarAPI,
    apagarAPI,
    carregarAPI
  };
};

const useUpaControl = () => {
  const [id, setId] = useState(null);
  const [nome, setNome] = useState("");
  const [localidade, setLocalidade] = useState("");

  const [estado, dispatcher] = useReducer(funcaoReducer, estadoInicio);

  const { salvarAPI, atualizarAPI, apagarAPI, carregarAPI } = persistenciaRestAPI();

  const limparCampos = () => {
    setId(null);
    setNome("");
    setLocalidade("");
  };

  const salvar = () => {
    const obj = { nome, localidade };

    try {
      UpaSchema.validateSync(obj, { abortEarly: false }); 
      salvarAPI(obj)
        .then(() => {
          alert("UPA salva com sucesso!");
          limparCampos();
          carregar();
        })
        .catch((error) => {
          console.log("Erro ao Salvar ", error);
          alert("Erro: " + error);
        });
    } catch (error) {
      console.log("Erro de validação: ", error.errors);
      alert("Erro de validação: " + error.errors.join(', '));
    }
  };

  const atualizar = () => {
    const obj = { nome, localidade };
    atualizarAPI(id, obj)
      .then(() => {
        alert("UPA atualizada com sucesso!");
        limparCampos();
        carregar();
      })
      .catch((error) => {
        console.log("Erro ao Atualizar ", error);
        alert("Erro: " + error);
      });
  };

  const apagar = (id) => {
    apagarAPI(id)
      .then(() => {
        carregar();
      });
  };

  const carregar = () => {
    carregarAPI()
      .then((response) => {
        dispatcher({ type: "LISTA_LIMPAR" });
        for (const chave in response.data) {
          const obj = response.data[chave];
          obj.id = chave;
          dispatcher({ type: "LISTA_ADICIONAR", payload: obj });
        }
      })
      .catch((erro) => { alert("Erro ao carregar dados"); });
  };

  useEffect(() => {
    carregar();
  }, []);

  return {
    id, setId,
    nome, setNome,
    localidade, setLocalidade,
    estado, dispatcher,
    salvar,
    atualizar,
    apagar,
    carregar
  };
};

const Formulario = () => {
  const { id, nome, setNome, localidade, setLocalidade, salvar, atualizar } = useContext(Contexto);

  const nomeBotao = id ? "Atualizar" : "Cadastrar";

  const handleSalvar = () => {
    if (id) {
      atualizar();
    } else {
      salvar();
    }
  };

  return (
    <View style={styles.formsArea}>
      <View style={styles.cabecalho}>
        <Text style={{fontSize: 45, fontWeight: 'bold'}}>AuxiliaMed</Text>
        <Image source={HeartImage} style={{ width: 65, height: 65}}></Image>
        <Text style={{fontSize: 20, color: '#FE3839', fontWeight: 'medium', margin: 50}}>Cadastro de UPAs</Text>
      </View>

      <View style={styles.inputsArea}>
        <TextInput placeholder="Nome da Upa" value={nome} onChangeText={setNome} style={styles.inputs}/>
        <TextInput placeholder="Localidade" value={localidade} onChangeText={setLocalidade} style={styles.inputs}/>
      </View>

      <View>
        <Text style={{marginTop: 7, color: 'rgba(0, 0, 0, 0.5)', fontStyle: 'italic'
}}>* cadastrar apenas UPAs localizadas no estado de São Paulo!</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSalvar}>
        <Text style={styles.buttonText}>{nomeBotao}</Text>
      </TouchableOpacity>    
    </View>
  );
};

const Item = (props) => {

  const navigation = useNavigation();

  return (
    <View>
      <View key={props.index} style={styles.itemContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.itemText} numberOfLines={5}>{props.item.nome}</Text>
          <Text style={styles.itemText} numberOfLines={5}>{props.item.localidade}</Text>
        </View>
        <View style={styles.iconContainer}>
          <Icon name="trash" size={28} onPress={() => props.apagar(props.item.id)} />
          <Icon name="pencil" size={28} onPress={() => { props.editar(props.item); navigation.navigate('Cadastro');}}/>
        </View>
      </View>
    </View>
  );
};

const Listagem = () => {
  const { estado, apagar, atualizar, setId, setNome, setLocalidade } = useContext(Contexto);

  const editar = (item) => {
    setId(item.id);
    setNome(item.nome);
    setLocalidade(item.localidade);
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList data={estado.upas} renderItem={
        (propsItem) => <Item {...propsItem} apagar={apagar} editar={editar}/>
      } />
    </View>
  );
};

export default function App() {

  const control = useUpaControl();

  return (
    <Contexto.Provider value={control}>
      <NavigationContainer>
        <View style={styles.container}>
          <View style={{ flex: 3 }}>
            <Navigator>
              <Screen name="Cadastro" component={Formulario}/>
              <Screen name="Listagem" component={Listagem}/>
            </Navigator>
          </View>
        </View>
      </NavigationContainer>
    </Contexto.Provider>
  );
}

const styles = StyleSheet.create({

  formsArea: {
    backgroundColor: '#FFFFFF',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },

  cabecalho: {
    alignItems: 'center'
  },

  inputsArea: {
    width: '75%'
  },

  inputs: {
    backgroundColor: 'white', 
    borderBottomWidth: 2,      
    borderBottomColor: 'black',
    color: 'rgba(0, 0, 0, 0.6)',
    marginTop: 30,
    fontSize: 20,
    padding: 10
  },

  button: {
    width: '30%',
    borderRadius: 30,
    backgroundColor: '#FE3839',
    padding: 15,
    alignItems: 'center',
    marginTop: 60,
  },

  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  
  itemContainer: {
    margin: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 2,
    borderColor: '#FE3839',
    padding: 20,
    backgroundColor: '#FFE9E9'
  },

  itemText: {
    fontSize: 20,
    fontWeight: 'medium',
    marginBottom: 5
  },

  iconContainer: {
    flexDirection: 'row'
  },

  textContainer: {
    flex: 1,
  }
});
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ListaHospitalScreen from './screens/ListaHospitalScreen';
import NovoHospitalScreen from './screens/NovoHospitalScreen';
import DetalhesHospitalScreen from './screens/DetalhesHospitalScreen';

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ListaHospitais">
        <Stack.Screen name="ListaHospitais" component={ListaHospitalScreen} />
        <Stack.Screen name="NovoHospital" component={NovoHospitalScreen} />
        <Stack.Screen name="DetalhesHospital" component={DetalhesHospitalScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;

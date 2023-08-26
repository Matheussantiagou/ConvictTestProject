import React from 'react';
import Dashboard from '../screens/Dashboard/Dashboard';
import BottomBar from '../components/layout/BottomBar/BottomBar';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AddProducer from '../screens/AddProducer/AddProducer';

export type AppStackParamList = {
  Dashboard: undefined;
  Produtores: undefined;
  BottomBar: undefined;
};

export type StackScreens = keyof AppStackParamList;

const AppStack = createNativeStackNavigator<AppStackParamList>();

export function AppStackNavigator() {
  return (
    <AppStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <AppStack.Screen name="BottomBar" component={BottomBar} />
      <AppStack.Screen name="AddProducer" component={AddProducer} />
    </AppStack.Navigator>
  );
}

export default AppStackNavigator;

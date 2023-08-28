import React from 'react';
import Dashboard from '../screens/Dashboard/Dashboard';
import BottomBar from '../components/layout/BottomBar/BottomBar';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AddProducer from '../screens/AddProducer/AddProducer';
import UpdateProducer from '../screens/UpdateProducer/UpdateProducer';
import Settings from '../screens/Settings/Settings';
import MilkPriceHistory from '../screens/MilkPriceHistory/MilkPriceHistory';

export type AppStackParamList = {
  Dashboard: undefined;
  BottomBar: undefined;
  AddProducer: undefined;
  UpdateProducer: undefined;
  Settings: undefined;
  Produtores: undefined;
  MilkPriceHistory: undefined;
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
      <AppStack.Screen name="UpdateProducer" component={UpdateProducer} />
      <AppStack.Screen name="Settings" component={Settings} />
      <AppStack.Screen name="MilkPriceHistory" component={MilkPriceHistory} />
    </AppStack.Navigator>
  );
}

export default AppStackNavigator;

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import Dashboard from '../screens/Dashboard/Dashboard';
import BottomBar from '../components/layout/BottomBar/BottomBar';

export type AppStackParamList = {
  Dashboard: undefined;
};

export type StackScreens = keyof AppStackParamList;

export function AppStackNavigator() {
  return <BottomBar />;
}

export default AppStackNavigator;

import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {AppStackParamList} from '../../../routes/AppStack';
import Dashboard from '../../../screens/Dashboard/Dashboard';

const Tab = createBottomTabNavigator<AppStackParamList>();

const BottomBar = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
      })}>
      <Tab.Screen name="Dashboard" component={Dashboard} />
    </Tab.Navigator>
  );
};

export default BottomBar;

const styles = StyleSheet.create({});

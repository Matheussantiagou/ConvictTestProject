import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {AppStackParamList} from '../../../routes/AppStack';
import Dashboard from '../../../screens/Dashboard/Dashboard';
import Producers from '../../../screens/Producers/Producers';
import Icon from 'react-native-vector-icons/Entypo';
import {Styles, useAppTheme} from '../../../theme';

const Tab = createBottomTabNavigator<AppStackParamList>();

const BottomBar = () => {
  const theme = useAppTheme();
  const styles = createStyles({theme});

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarActiveTintColor: theme.colors.onPrimary,
        tabBarStyle: {
          backgroundColor: theme.colors.primary,
          borderTopColor: theme.colors.outline,
          height: 60,
        },
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          if (route.name === 'Dashboard') {
            iconName = focused ? 'bar-graph' : 'bar-graph';
          } else if (route.name === 'Produtores') {
            iconName = focused ? 'list' : 'list';
          }
          return <Icon name={`${iconName}`} size={size} color={color} />;
        },
      })}>
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="Produtores" component={Producers} />
    </Tab.Navigator>
  );
};

export default BottomBar;

const createStyles = ({theme}: Styles) => StyleSheet.create({});

import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {AppStackParamList} from '../../../routes/AppStack';
import Dashboard from '../../../screens/Dashboard/Dashboard';
import Producers from '../../../screens/Producers/Producers';
import Icon from 'react-native-vector-icons/Entypo';
import {Styles, useAppTheme} from '../../../theme';
import Chart from '../../../../assets/images/icons/Chart.svg';
import List from '../../../../assets/images/icons/List.svg';

const Tab = createBottomTabNavigator<AppStackParamList>();

const BottomBar = () => {
  const theme = useAppTheme();
  const styles = createStyles({theme});

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarActiveTintColor: theme.colors.onPrimary,
        tabBarInactiveTintColor: theme.colors.outline,
        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: '500',
        },
        tabBarLabelPosition: 'below-icon',
        tabBarIconStyle: {
          marginTop: 5,
        },
        tabBarStyle: {
          backgroundColor: theme.colors.primary,
          borderTopColor: theme.colors.outline,
          height: 65,
        },

        tabBarIcon: ({color, size}) => {
          if (route.name === 'Dashboard') {
            return <Chart width={size} height={size} fill={color} />;
          } else if (route.name === 'Produtores') {
            return <List width={size} height={size} fill={color} />;
          }
        },
      })}>
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="Produtores" component={Producers} />
    </Tab.Navigator>
  );
};

export default BottomBar;

const createStyles = ({theme}: Styles) => StyleSheet.create({});

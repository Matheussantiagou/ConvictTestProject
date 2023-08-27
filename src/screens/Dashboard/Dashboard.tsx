import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import React, {useEffect} from 'react';
import {Styles, useAppTheme} from '../../theme';
import MonthlyRevenue from './components/MonthlyRevenue';
import {RegionsList} from '../../components';
import MilkPrice from './components/MilkPrice';
import Button from './components/Button';

import {useNavigation} from '@react-navigation/native';
import useDatabase from '../../hooks/useDatabase';
import {useAppSelector} from '../../store/redux';

const Dashboard = () => {
  const theme = useAppTheme();
  const styles = createStyles({theme});
  const navigation = useNavigation();
  const {getAllProducers, getMilkPrice, totalProduction, getDairies} =
    useDatabase();
  const {milkPrice, defaultRegion} = useAppSelector(state => state.dataBase);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('Dashboard focused');
      getMilkPrice();
      getDairies();
    });
    getAllProducers();
    return unsubscribe;
  }, [navigation, defaultRegion, milkPrice]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Dashboard</Text>
        <RegionsList isAtHome />
        <MonthlyRevenue value={totalProduction} />
        <View style={styles.line} />
        <MilkPrice />
      </View>
      <View style={styles.body}>
        <View style={styles.buttonsContainer}>
          <Button
            title={'Adicionar Produtor'}
            toScreen={'AddProducer'}
            iconName={'plus'}
          />
          <Button title={'Ajustes'} toScreen={'Settings'} iconName={'cog'} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Dashboard;

const createStyles = ({theme}: Styles) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      alignItems: 'center',
      // paddingTop: 10,
    },
    header: {
      minHeight: 200,
      width: '100%',
      backgroundColor: theme.colors.primary,
      borderRadius: 30,
      borderTopEndRadius: 0,
      borderTopStartRadius: 0,
      paddingTop: 35,
      paddingBottom: 25,
      gap: 17,
      marginBottom: 20,
    },
    body: {
      flex: 1,
      width: '100%',
    },
    title: {
      fontSize: 22,
      color: theme.colors.onPrimary,
      fontWeight: '400',
      paddingLeft: 20,
    },
    line: {
      height: 1,
      width: '100%',
      backgroundColor: theme.colors.onPrimary,
      opacity: 0.3,
    },
    buttonsContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      paddingHorizontal: 20,
      gap: 10,
    },
  });

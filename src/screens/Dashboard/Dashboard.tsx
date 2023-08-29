import {StyleSheet, Text, View, SafeAreaView, ScrollView} from 'react-native';
import React from 'react';
import {Styles, useAppTheme} from '../../theme';
import MonthlyRevenue from './components/MonthlyRevenue';
import {RegionsList} from '../../components';
import MilkPrice from './components/MilkPrice';
import Button from './components/Button';

import {useNavigation} from '@react-navigation/native';
import useDatabase from '../../hooks/useDatabase';
import {useAppSelector} from '../../store/redux';
import {PieChartScreen} from './components/Chart';

const Dashboard = () => {
  const theme = useAppTheme();
  const styles = createStyles({theme});
  const navigation = useNavigation();
  const {
    getAllProducers,
    getMilkPrice,
    totalProduction,
    getDairies,
    negocitionDone,
    negocitionPending,
    negocitionRejected,
    getPercentageIncrease,
  } = useDatabase();
  const {milkPrice, defaultRegion} = useAppSelector(state => state.dataBase);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('Dashboard focused');
      getMilkPrice();
      getDairies();
      getPercentageIncrease();
      getAllProducers();
    });
    getMilkPrice();
    getDairies();
    getPercentageIncrease();
    getAllProducers();
    return unsubscribe;
  }, [navigation, defaultRegion, milkPrice]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        nestedScrollEnabled={true}
        scrollEnabled
        style={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Dashboard</Text>
          <RegionsList isAtHome />
          <MonthlyRevenue value={milkPrice !== 0 ? totalProduction : 0} />
          <View style={styles.line} />
          <MilkPrice />
        </View>
        <View style={styles.body}>
          <View style={styles.buttonsContainer}>
            <Button title={'Adicionar Produtor'} toScreen={'AddProducer'} />
            <Button title={'Ajustes'} toScreen={'Settings'} />
          </View>
          <View style={styles.footer}>
            <Text style={styles.footerText}>Status dos Produtores</Text>
            {negocitionDone + negocitionPending + negocitionRejected !== 0 && (
              <PieChartScreen
                done={negocitionDone}
                pending={negocitionPending}
                rejected={negocitionRejected}
                color={theme.colors.background}
              />
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Dashboard;

const createStyles = ({theme}: Styles) =>
  StyleSheet.create({
    scrollContent: {
      flexGrow: 1,
    },
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
      // flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      paddingHorizontal: 20,
      marginBottom: 20,
      gap: 10,
    },
    footerText: {
      fontSize: 16,
      fontWeight: '500',
      color: theme.colors.primary,
    },
    footer: {
      flex: 1,
      // borderWidth: 1,
      paddingHorizontal: 20,
    },
  });

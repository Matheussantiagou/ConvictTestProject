import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {Styles, useAppTheme} from '../../../theme';
import HeaderTitle from './HeaderTitle';

const MonthlyRevenue = ({value}: any) => {
  const theme = useAppTheme();
  const styles = createStyles({theme});

  return (
    <View style={styles.container}>
      <HeaderTitle title="Receita Mensal" />
      <Text style={styles.revenue}>
        R$ {value.toLocaleString('pt-Br') || 0}
      </Text>
    </View>
  );
};

export default MonthlyRevenue;

const createStyles = ({theme}: Styles) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 20,
    },
    revenue: {
      color: theme.colors.onPrimary,
      fontSize: 30,
      fontWeight: '500',
    },
  });

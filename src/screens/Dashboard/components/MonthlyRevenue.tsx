import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Styles, useAppTheme} from '../../../theme';
import HeaderTitle from './HeaderTitle';

const MonthlyRevenue = () => {
  const theme = useAppTheme();
  const styles = createStyles({theme});
  return (
    <View style={styles.container}>
      <HeaderTitle title="Receita Mensal" />
      <Text style={styles.revenue}>R$ 30.523,20</Text>
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

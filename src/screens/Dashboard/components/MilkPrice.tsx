import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Styles, useAppTheme} from '../../../theme';
import HeaderTitle from './HeaderTitle';

const MilkPrice = () => {
  const theme = useAppTheme();
  const styles = createStyles({theme});
  return (
    <View style={styles.container}>
      <HeaderTitle title="Preço do Leite" />
      <Text style={styles.price}>R$ 3,52 L</Text>
    </View>
  );
};

export default MilkPrice;

const createStyles = ({theme}: Styles) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 20,
    },
    price: {
      color: theme.colors.onPrimary,
      fontSize: 25,
      fontWeight: '500',
    },
  });

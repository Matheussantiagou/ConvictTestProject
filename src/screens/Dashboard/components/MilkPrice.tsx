import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {Styles, useAppTheme} from '../../../theme';
import HeaderTitle from './HeaderTitle';
import {useAppSelector} from '../../../store/redux';

const MilkPrice: FC = () => {
  const theme = useAppTheme();
  const styles = createStyles({theme});
  const {milkPrice} = useAppSelector(state => state.dataBase);

  return (
    <View style={styles.container}>
      <HeaderTitle title="Preço do Leite" />
      <Text style={styles.price}>R$ {milkPrice?.toLocaleString()} L</Text>
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

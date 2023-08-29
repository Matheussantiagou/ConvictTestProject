import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {FC} from 'react';
import {Styles, useAppTheme} from '../../../theme';
import HeaderTitle from './HeaderTitle';
import {useAppSelector} from '../../../store/redux';
import ArrowUp from '../../../../assets/images/icons/ArrowUp.svg';
import ArrowDown from '../../../../assets/images/icons/ArrowDown.svg';

import ChartUp from '../../../../assets/images/icons/ChartUp.svg';
import {useNavigation} from '@react-navigation/native';

const MilkPrice: FC = () => {
  const theme = useAppTheme();
  const styles = createStyles({theme});
  const {milkPrice, percentage} = useAppSelector(state => state.dataBase);
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('MilkPriceHistory');
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <View style={styles.headerContainer}>
          <HeaderTitle title="Preço do Leite" />
          {milkPrice !== 0 && (
            <>
              {percentage > 0 ? (
                <ArrowUp
                  height={15}
                  width={15}
                  fill={theme.colors.inversePrimary}
                  style={styles.icon}
                />
              ) : (
                <ArrowDown
                  height={15}
                  width={15}
                  fill={theme.colors.error}
                  style={styles.icon}
                />
              )}

              <Text
                style={[
                  styles.percentage,
                  {
                    color:
                      percentage > 0
                        ? theme.colors.inversePrimary
                        : theme.colors.error,
                  },
                ]}>
                {percentage}%
              </Text>
            </>
          )}
        </View>
        <Text style={styles.price}>
          R$ {milkPrice?.toLocaleString('pt-Br')} L
        </Text>
      </View>
      <View style={styles.rightContainer}>
        <TouchableOpacity onPress={handlePress} style={styles.button}>
          <Text numberOfLines={1} style={styles.seeHistoryText}>
            Ver histórico
          </Text>
          <ChartUp height={12} width={12} fill={theme.colors.inversePrimary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MilkPrice;

const createStyles = ({theme}: Styles) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 20,
      // borderWidth: 1,
      flexDirection: 'row',
    },
    price: {
      color: theme.colors.onPrimary,
      fontSize: 25,
      fontWeight: '500',
    },
    headerContainer: {
      flexDirection: 'row',
    },
    percentage: {
      color: theme.colors.inversePrimary,
      fontSize: 14,
      fontWeight: '700',
      paddingLeft: 5,
    },
    icon: {
      marginLeft: 10,
    },
    leftContainer: {
      flex: 1,
    },
    rightContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'flex-end',
      paddingRight: 5,
      // borderWidth: 1,
    },
    seeHistoryText: {
      color: theme.colors.inversePrimary,
      fontSize: 13,
      fontWeight: '400',
      // width: '100%',
      // alignSelf: 'flex-end',
      height: 30,
      textAlignVertical: 'center',

      textAlign: 'right',
    },
    button: {
      minWidth: 120,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
      padding: 10,
    },
  });

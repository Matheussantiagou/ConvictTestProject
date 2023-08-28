import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';
import withObservables from '@nozbe/with-observables';
import Icon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import {Styles, useAppTheme} from '../../../theme';
import Check from '../../../../assets/images/icons/Check.svg';
import CloseHexagon from '../../../../assets/images/icons/CloseHexagon.svg';
import Handshake from '../../../../assets/images/icons/Handshake.svg';

interface Props {
  producer: any;
}

function RawProducerListItem({item}: Props) {
  const theme = useAppTheme();
  const styles = createStyles({theme});
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('UpdateProducer', {item: item});
  };

  return (
    <TouchableOpacity onPress={() => handlePress()} style={styles.item}>
      <View style={styles.iconContainer}>
        {item.negociation == 'done' ? (
          <Check width={22} height={22} fill={theme.colors.primary} />
        ) : item.negociation == 'closed' ? (
          <CloseHexagon width={22} height={22} fill={theme.colors.primary} />
        ) : (
          <Handshake width={22} height={22} fill={theme.colors.primary} />
        )}
      </View>
      <View style={styles.rightContainer}>
        <View style={styles.titleView}>
          <Text style={styles.titleName}>{item.name}</Text>

          <Text style={styles.description}>
            {item.negociation == 'done'
              ? 'Contratado'
              : item.negociation == 'closed'
              ? 'Recusado'
              : 'Negociação'}
          </Text>
        </View>
        <View style={styles.dataContainer}>
          <Text style={styles.titleName}>{item.daily_production} L/dia</Text>
          <Text
            style={[
              styles.description,
              {
                color: theme.colors.outline,
              },
            ]}>
            {item.region}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export const ProducerListItem = withObservables(['item'], ({item}) => ({
  item: item.observe(),
}))(RawProducerListItem);

const createStyles = ({theme}: Styles) =>
  StyleSheet.create({
    item: {
      backgroundColor: theme.colors.surfaceVariant,
      padding: 10,
      width: '90%',
      alignSelf: 'center',
      flexDirection: 'row',
      borderRadius: 7,
    },
    iconContainer: {
      width: 50,
      height: 50,
      borderRadius: 50,
      backgroundColor: theme.colors.inversePrimary,
      alignItems: 'center',
      justifyContent: 'center',
    },
    titleName: {
      color: theme.colors.primary,
      fontSize: 15,
      fontWeight: 'bold',
      textAlignVertical: 'center',
    },
    description: {
      color: theme.colors.inversePrimary,
      fontWeight: 'bold',
      fontSize: 12,
    },
    titleView: {
      justifyContent: 'center',
      paddingLeft: 10,
      flex: 1,
      //   borderWidth: 1,
    },
    rightContainer: {
      flex: 1,
      borderRadius: 5,
      //   borderWidth: 1,
      flexDirection: 'row',
    },
    dataContainer: {
      flex: 1,
      //   borderWidth: 1,
      paddingRight: 10,
      alignItems: 'flex-end',
      justifyContent: 'center',
    },
  });

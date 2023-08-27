import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import React from 'react';
import {Styles, useAppTheme} from '../../../theme';
import Icon from 'react-native-vector-icons/Feather';
import {IProducers} from '../../../@types/model';
import {useNavigation} from '@react-navigation/native';
import {ProducerListItem} from './ProducerListItem';

export function ProducersList({producers}: any) {
  const theme = useAppTheme();
  const styles = createStyles({theme});

  return (
    <FlatList
      keyExtractor={item => item.id.toString()}
      data={producers}
      ItemSeparatorComponent={() => <View style={{height: 10}} />}
      renderItem={({item}) => <ProducerListItem item={item} />}
    />
  );
}

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
      flex: 2,
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

import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import React from 'react';
import {Styles, useAppTheme} from '../../../theme';
import Icon from 'react-native-vector-icons/Feather';

const ProducersList = () => {
  const theme = useAppTheme();
  const styles = createStyles({theme});
  const producers = [
    {
      id: 1,
      name: 'João Silva',
      region: 'Nordeste',
      daily_production: '1000',
      negociation: 'done',
    },
    {
      id: 2,
      name: 'Maria Silva',
      region: 'Nordeste',
      daily_production: '500',
      negociation: 'closed',
    },
    {
      id: 3,
      name: 'Carlos Silva',
      region: 'Sul',
      daily_production: '2000',
      negociation: 'in progress',
    },
  ];
  return (
    <FlatList
      data={producers}
      ItemSeparatorComponent={() => <View style={{height: 10}} />}
      renderItem={({item}) => (
        <TouchableOpacity style={styles.item}>
          <View style={styles.iconContainer}>
            <Icon name="check" size={30} color={theme.colors.primary} />
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
              <Text style={styles.titleName}>
                {item.daily_production} L/dia
              </Text>
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
      )}
    />
  );
};

export default ProducersList;

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

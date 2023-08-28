import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Styles, useAppTheme} from '../../../theme';

const RenderItem = ({item}) => {
  const theme = useAppTheme();
  const styles = createStyles({theme});
  const months = [
    {id: 1, nome: 'Janeiro'},
    {id: 2, nome: 'Fevereiro'},
    {id: 3, nome: 'Março'},
    {id: 4, nome: 'Abril'},
    {id: 5, nome: 'Maio'},
    {id: 6, nome: 'Junho'},
    {id: 7, nome: 'Julho'},
    {id: 8, nome: 'Agosto'},
    {id: 9, nome: 'Setembro'},
    {id: 10, nome: 'Outubro'},
    {id: 11, nome: 'Novembro'},
    {id: 12, nome: 'Dezembro'},
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{months[item.month].nome}</Text>
      <Text style={styles.text}>R$ {item.value.toLocaleString('pt-Br')}</Text>
    </View>
  );
};

export default RenderItem;

const createStyles = ({theme}: Styles) =>
  StyleSheet.create({
    container: {
      width: '90%',
      height: 50,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      alignSelf: 'center',
      //   marginBottom: 5,
      //   borderRadius: 10,
      paddingHorizontal: 20,
      backgroundColor: theme.colors.surfaceVariant,
    },
    text: {
      color: theme.colors.primary,
      fontSize: 14,
      fontWeight: '500',
    },
  });

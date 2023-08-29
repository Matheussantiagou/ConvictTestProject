import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Styles, useAppTheme} from '../../../theme';
import Cloud from '../../../../assets/images/icons/Cloud.svg';

const EmptyComponent = () => {
  const theme = useAppTheme();
  const styles = createStyles({theme});
  return (
    <View style={styles.container}>
      <Cloud width={45} height={50} fill={theme.colors.primary} />
      <Text style={styles.text}>Nenhum registro encontrado</Text>
      <Text style={[styles.text, {fontSize: 15}]}>
        Carregue os dados na tela de ajustes
      </Text>
    </View>
  );
};

export default EmptyComponent;

const createStyles = ({theme}: Styles) =>
  StyleSheet.create({
    container: {
      flex: 1,
      //   borderWidth: 1,
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.background,
      paddingVertical: 50,
    },
    text: {
      color: theme.colors.primary,
      fontSize: 20,
      fontWeight: '500',
      textAlign: 'center',
    },
  });

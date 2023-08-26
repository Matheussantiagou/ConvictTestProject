import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import React from 'react';
import {RegionsList, TopBar} from '../../components';
import {TextInput} from 'react-native-paper';
import {Styles, useAppTheme} from '../../theme';
import ProducersList from './components/ProducersList';

const Producers = () => {
  const theme = useAppTheme();
  const styles = createStyles({theme});
  const [value, setValue] = React.useState('');

  return (
    <SafeAreaView style={styles.container}>
      <TopBar title={'Produtores'} />
      <View style={styles.body}>
        <RegionsList />
        <TextInput
          placeholder={'Nome do Produtor...'}
          placeholderTextColor={theme.colors.outline}
          style={styles.input}
          value={value}
          onChangeText={text => setValue(text)}
          textColor={theme.colors.primary}
          keyboardType={'default'}
          underlineColor="transparent"
        />
        <ProducersList />
      </View>
    </SafeAreaView>
  );
};

export default Producers;

const createStyles = ({theme}: Styles) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    input: {
      backgroundColor: theme.colors.surfaceVariant,
      height: 55,
      borderRadius: 5,
      borderWidth: 0,
      marginBottom: 10,
      width: '90%',
      alignSelf: 'center',
    },
    body: {
      flex: 1,
      paddingVertical: 20,
      gap: 15,
    },
  });

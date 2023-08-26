import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {Styles, useAppTheme} from '../../theme';
import {TopBar} from '../../components';
import {TextInput} from 'react-native-paper';
import AddProducerInput from './components/AddProducerInput';
import AddProducerDropdown from './components/AddProducerDropdown';
import Button from './components/Button';

const AddProducer = () => {
  const theme = useAppTheme();
  const styles = createStyles({theme});
  const [name, setName] = React.useState('');
  const [milkProdution, setMilkProdution] = React.useState(0);

  return (
    <SafeAreaView style={styles.container}>
      <TopBar title={'Adicionar Produtor'} />
      <View style={styles.body}>
        <AddProducerInput
          value={name}
          setValue={setName}
          placeholder={'Nome do Produtor'}
          title={'Nome'}
        />
        <AddProducerInput
          value={milkProdution}
          setValue={setMilkProdution}
          placeholder={'Produção em Litros'}
          title={'Produção Mensal'}
        />
        <AddProducerDropdown id={2} title={'Região'} />
        <AddProducerDropdown id={1} title={'Laticínio'} />

        <Text style={styles.title}>Status do Acordo</Text>

        <View style={styles.buttonsContainer}>
          <Button title={'Recusado'} />
          <Button title={'Em negociação'} />
          <Button title={'Contratado'} />
        </View>
        <TouchableOpacity style={styles.footerButton}>
          <Text style={[styles.title, {color: theme.colors.onPrimary}]}>
            Cadastrar
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AddProducer;

const createStyles = ({theme}: Styles) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    body: {
      flex: 1,
      //   backgroundColor: theme.colors.error,
      padding: 20,
    },
    title: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.colors.primary,
    },
    buttonsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      flex: 1,
    },
    footerButton: {
      backgroundColor: theme.colors.primary,
      height: 50,
      width: '100%',
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

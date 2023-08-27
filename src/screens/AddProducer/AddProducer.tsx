import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {Styles, useAppTheme} from '../../theme';
import {TopBar} from '../../components';
import {TextInput} from 'react-native-paper';
import AddProducerInput from './components/AddProducerInput';
import AddProducerDropdown from './components/AddProducerDropdown';
import Button from './components/Button';
import {database} from '../../services/watermelon';
import {IProducer, IProducers} from '../../@types/model';
import {useNavigation} from '@react-navigation/native';

const AddProducer = () => {
  const theme = useAppTheme();
  const styles = createStyles({theme});
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [milkProdution, setMilkProdution] = useState(0);
  const [region, setRegion] = useState('');
  const [milkName, setMilkName] = useState('');
  const [negociationStatus, setNegociationStatus] = useState('');

  async function handlePressRegister() {
    await database.write(async () => {
      await database.collections.get('producers').create((producers: any) => {
        producers.name = name;
        producers.daily_production = milkProdution;
        producers.region = region;
        producers.dairies = milkName;
        producers.negociation = negociationStatus;
      });
    });
    navigation.goBack();
    setMilkName('');
    setMilkProdution(0);
    setName('');
    setRegion('');
    setNegociationStatus('');
  }

  return (
    <SafeAreaView style={styles.container}>
      <TopBar title={'Adicionar Produtor'} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
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
          <AddProducerDropdown
            id={2}
            title={'Região'}
            value={region}
            setValue={setRegion}
          />
          <AddProducerDropdown
            id={1}
            title={'Laticínio'}
            value={milkName}
            setValue={setMilkName}
          />

          <Text style={styles.title}>Status do Acordo</Text>

          <View style={styles.buttonsContainer}>
            <Button
              title={'Recusado'}
              value={'closed'}
              setNegociationStatus={setNegociationStatus}
            />
            <Button
              title={'Em negociação'}
              value={'in progress'}
              setNegociationStatus={setNegociationStatus}
            />
            <Button
              title={'Contratado'}
              value={'done'}
              setNegociationStatus={setNegociationStatus}
            />
          </View>
          <TouchableOpacity
            onPress={handlePressRegister}
            style={styles.footerButton}>
            <Text style={[styles.title, {color: theme.colors.onPrimary}]}>
              Cadastrar
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddProducer;

const createStyles = ({theme}: Styles) =>
  StyleSheet.create({
    scrollContent: {
      flexGrow: 1,
    },
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

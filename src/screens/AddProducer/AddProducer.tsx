import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Alert,
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
  const [milkProdution, setMilkProdution] = useState('');
  const [region, setRegion] = useState('');
  const [milkName, setMilkName] = useState('');
  const [negociationStatus, setNegociationStatus] = useState('');
  const [isScrollEnabled, setScrollEnabled] = useState(false);

  async function handlePressRegister() {
    if (name && milkProdution && region && negociationStatus) {
      console.log(typeof milkProdution);
      await database.write(async () => {
        await database.collections.get('producers').create((producers: any) => {
          producers.name = name;
          producers.daily_production = parseInt(milkProdution, 10);
          producers.region = region;
          producers.dairy_id = milkName;
          producers.negociation = negociationStatus;
        });
      });
      navigation.goBack();
    } else Alert.alert('Preencha todos os campos');
  }

  return (
    <SafeAreaView style={styles.container}>
      <TopBar title={'Adicionar Produtor'} />
      <ScrollView
        nestedScrollEnabled={true}
        scrollEnabled
        style={styles.scrollContent}>
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
            title={'Produção Diária'}
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
              negociationStatus={negociationStatus}
              setNegociationStatus={setNegociationStatus}
            />
            <Button
              title={'Em negociação'}
              value={'in progress'}
              negociationStatus={negociationStatus}
              setNegociationStatus={setNegociationStatus}
            />
            <Button
              title={'Contratado'}
              value={'done'}
              negociationStatus={negociationStatus}
              setNegociationStatus={setNegociationStatus}
            />
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
        onPress={handlePressRegister}
        style={styles.footerButton}>
        <Text style={[styles.title, {color: theme.colors.onPrimary}]}>
          Cadastrar
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default AddProducer;

const createStyles = ({theme}: Styles) =>
  StyleSheet.create({
    scrollContent: {
      flexGrow: 1,
      // borderWidth: 1,
    },
    container: {
      flex: 1,
      // borderWidth: 1,

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
      width: '90%',
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      marginBottom: 10,
    },
  });

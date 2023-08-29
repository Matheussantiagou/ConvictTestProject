import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Styles, useAppTheme} from '../../theme';
import {TopBar} from '../../components';
import AddProducerInput from '../AddProducer/components/AddProducerInput';
import AddProducerDropdown from '../AddProducer/components/AddProducerDropdown';
import Button from '../AddProducer/components/Button';
import {database} from '../../services/watermelon';
import {useNavigation} from '@react-navigation/native';
import {IProducer} from '../../@types/model';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ConfirmDeleteModal from './components/ConfirmDeleteModal';
import {useAppSelector} from '../../store/redux';

const UpdateProducer = ({route}: any) => {
  const theme = useAppTheme();
  const styles = createStyles({theme});
  const [isVisible, setIsVisible] = useState(false);
  const {name, daily_production, region, dairy_id, negociation, id} =
    route.params.data;
  const [producerName, setName] = useState(name);
  const [milkProdution, setMilkProdution] = useState(
    daily_production?.toString(),
  );
  const [producerRegion, setRegion] = useState(region);
  const [milkName, setMilkName] = useState(dairy_id);
  const [negociationStatus, setNegociationStatus] = useState(negociation);
  const navigation = useNavigation();

  async function handleUpdateRegister() {
    if (name && milkProdution && region && negociationStatus) {
      await database.write(async () => {
        const producers: any = await database.get('producers').find(id);
        await producers.update(() => {
          producers.name = producerName;
          producers.daily_production = parseInt(milkProdution, 10);
          producers.region = producerRegion;
          producers.dairy_id = milkName;
          producers.negociation = negociationStatus;
        });
      });

      navigation.goBack();
    } else Alert.alert('Preencha todos os campos');
  }

  async function handleDeleteRegister() {
    await database.write(async () => {
      const producers: any = await database.get('producers').find(id);
      await producers.destroyPermanently();
    });

    navigation.goBack();
  }

  return (
    <SafeAreaView style={styles.container}>
      <TopBar title={'Atualizar Produtor'} />
      <ConfirmDeleteModal
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        onConfirm={handleDeleteRegister}
      />
      <ScrollView
        nestedScrollEnabled={true}
        scrollEnabled
        style={styles.scrollContent}>
        <View style={styles.body}>
          <AddProducerInput
            value={producerName}
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
            value={producerRegion}
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
        onPress={() => setIsVisible(true)}
        style={styles.deleteButton}>
        <Text style={styles.deleteText}>Deletar Produtor</Text>
        <Icon name={'trash-can'} color={theme.colors.error} size={25} />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleUpdateRegister}
        style={styles.footerButton}>
        <Text style={[styles.title, {color: theme.colors.onPrimary}]}>
          Atualizar
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default UpdateProducer;

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
      width: '90%',
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      marginBottom: 10,
    },
    deleteButton: {
      paddingVertical: 20,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 10,
    },
    deleteText: {
      color: theme.colors.error,
      alignSelf: 'center',
      fontWeight: '500',
    },
  });

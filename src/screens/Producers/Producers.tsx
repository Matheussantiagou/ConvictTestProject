import {StyleSheet, View, SafeAreaView} from 'react-native';
import React from 'react';
import {RegionsList, TopBar} from '../../components';
import {TextInput} from 'react-native-paper';
import {Styles, useAppTheme} from '../../theme';
// WatermelonDB
import {database} from '../../services/watermelon';
import withObservables from '@nozbe/with-observables';
import {ProducersList} from './components/ProducersList';
import {Q} from '@nozbe/watermelondb';
import {useAppSelector} from '../../store/redux';
//

const producersDB = database.collections.get('producers');
// const observeCategories = () => db.query(Q.where('name', 'matheus')).observe(); //Para fazer buscar por coisas especificas

const regions = [
  {id: 1, nome: 'Nordeste'},
  {id: 2, nome: 'Sul'},
  {id: 3, nome: 'Sudeste'},
  {id: 4, nome: 'Norte'},
  {id: 5, nome: 'Centro-Oeste'},
];

const Producers = () => {
  const theme = useAppTheme();
  const styles = createStyles({theme});
  const [value, setValue] = React.useState('');
  const {defaultRegion} = useAppSelector(state => state.dataBase);

  const negociationTranslation = {
    contratado: 'done',
    recusado: 'closed',
    negociação: 'in progress',
    // Adicione mais traduções se necessário
  };

  const observeProducers = () => {
    const regionCondition = Q.where(
      'region',
      `${regions[defaultRegion - 1]?.nome.toLowerCase()}`,
    );

    let translatedNegociation = negociationTranslation[value.toLowerCase()];

    const nameCondition = Q.where('name', Q.like(`%${value.toLowerCase()}%`));
    const negociationStatusCondition = Q.where(
      'negociation',
      Q.like(`%${translatedNegociation}%`),
    );

    let filteredQuery;

    if (translatedNegociation) {
      // Se a tradução existe, filtre apenas pelo status de negociação
      filteredQuery = Q.and(regionCondition, negociationStatusCondition);
    } else {
      // Senão, continue buscando pelo nome
      filteredQuery = Q.and(regionCondition, nameCondition);
    }

    return producersDB.query(filteredQuery).observe();
  };

  const enchanceWithProducers = withObservables([], () => ({
    producers: observeProducers(),
  }));
  const ProducersListRender = enchanceWithProducers(ProducersList);

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
        <ProducersListRender />
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
      paddingTop: 20,
      gap: 15,
    },
  });

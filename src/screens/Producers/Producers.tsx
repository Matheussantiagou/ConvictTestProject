import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import React from 'react';
import {RegionsList, TopBar} from '../../components';
import {TextInput} from 'react-native-paper';
import {Styles, useAppTheme} from '../../theme';
// WatermelonDB
import {database} from '../../services/watermelon';
import withObservables from '@nozbe/with-observables';
import {ProducersList} from './components/ProducersList';
import {Q} from '@nozbe/watermelondb';
//

const producersDB = database.collections.get('producers');
// const observeCategories = () => db.query(Q.where('name', 'matheus')).observe(); //Para fazer buscar por coisas especificas

const Producers = () => {
  const theme = useAppTheme();
  const styles = createStyles({theme});
  const [value, setValue] = React.useState('');
  const [region, setRegionState] = React.useState('Nordeste');

  const observeProducers = () =>
    producersDB.query(Q.where('region', `${region}`)).observe();
  const enchanceWithProducers = withObservables([], () => ({
    producers: observeProducers(),
  }));
  const ProducersListRender = enchanceWithProducers(ProducersList);

  return (
    <SafeAreaView style={styles.container}>
      <TopBar title={'Produtores'} />
      <View style={styles.body}>
        <RegionsList setRegionState={setRegionState} />
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
      paddingVertical: 20,
      gap: 15,
    },
  });

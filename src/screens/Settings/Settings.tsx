import {SafeAreaView, StyleSheet, View, Text, Alert} from 'react-native';
import React, {useState} from 'react';
import {Styles, useAppTheme} from '../../theme';
import {TopBar} from '../../components';
import BoxOptions from './components/BoxOptions';
import OptionsItem from './components/OptionsItem';
import {database} from '../../services/watermelon';
import RegionPicker from './components/RegionPicker';
import SwitchOption from './components/SwitchOption';
import {useThemeContext} from '../../hooks/useThemeContext';
import ConfirmDeleteModal from '../UpdateProducer/components/ConfirmDeleteModal';

const Settings = () => {
  const theme = useAppTheme();
  const styles = createStyles({theme});
  const [isVisible, setIsVisible] = useState(false);

  const {isThemeDark, toggleTheme} = useThemeContext();

  async function handleDeleteBD() {
    try {
      await database.write(async () => {
        const tables = ['producers', 'milk_price', 'dairies']; // Add all table names here

        for (const table of tables) {
          const collection = await database.collections.get(table);
          const records = await collection.query().fetch();

          if (records.length === 0) {
            console.log(`No records found for ${table}`);
            continue;
          }

          await Promise.all(records.map(record => record.destroyPermanently()));
        }
      });
      setIsVisible(false);
      Alert.alert('Sucesso', 'Dados excluídos com sucesso.');
    } catch (e) {
      Alert.alert('Erro', 'Erro ao excluir dados.');
      console.error('Database Delete: ', e);
    }
  }

  async function loadDataFromJson() {
    try {
      const data = require('../../mock/data.json');
      const validTables = ['producers', 'milk_price'];

      // Loading producers and milk_price tables
      await database.write(async () => {
        for (const key of Object.keys(data)) {
          if (!validTables.includes(key)) {
            console.log(`Skipping invalid table: ${key}`);
            continue;
          }
          const collection = database.get(key);
          if (!collection) {
            console.log(`Collection for ${key} is null`);
            continue;
          }
          for (const record of data[key]) {
            await collection.create((newRecord: any) => {
              for (const field of Object.keys(record)) {
                newRecord[field] = record[field];
              }
            });
            console.log(`Record inserted for table ${key}`);
          }
        }
      });

      //Loading dairies table
      await database.write(async () => {
        const dairiesCollection = database.get('dairies');
        if (!dairiesCollection) {
          console.log(`Collection for dairies is null`);
          return;
        }

        for (const record of data['dairies']) {
          const {id, name} = record; // Assuming your data structure has 'id' and 'name' fields
          await dairiesCollection.create((newRecord: any) => {
            newRecord.dairy_id = id;
            newRecord.name = name;
          });
          console.log(`Record inserted for table dairies`);
        }
      });

      Alert.alert('Sucesso', 'Dados carregados com sucesso.');
      console.log('Data loaded successfully.');
    } catch (e) {
      Alert.alert('Erro', 'Erro ao carregar dados.');
      console.error(`An error occurred: ${e}`);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <TopBar title="Ajustes" />
      <ConfirmDeleteModal
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        onConfirm={handleDeleteBD}
      />
      <View style={styles.body}>
        <BoxOptions title="Dados">
          <OptionsItem
            title="Carregar Dados"
            color={theme.colors.inversePrimary}
            iconName="file-upload"
            onPress={loadDataFromJson}
          />
          <View style={styles.line} />
          <OptionsItem
            title="Excluir Dados"
            color={theme.colors.error}
            iconName="trash-alt"
            onPress={() => setIsVisible(true)}
          />
        </BoxOptions>
        <BoxOptions title="Preferências">
          <View style={styles.options}>
            <Text
              numberOfLines={1}
              style={[
                styles.optionText,
                {
                  color: theme.colors.primary,
                  flex: 1,
                },
              ]}>
              Região Padrão
            </Text>
            <RegionPicker />
          </View>
          <View style={styles.line} />
          <View
            style={[
              styles.options,
              {
                paddingRight: 30,
              },
            ]}>
            <Text
              numberOfLines={1}
              style={[
                styles.optionText,
                {flex: 1, color: theme.colors.primary},
              ]}>
              Dark Mode
            </Text>
            <SwitchOption
              label="Tema Escuro"
              switchProps={{
                value: isThemeDark,
                onValueChange: toggleTheme,
              }}
            />
          </View>
        </BoxOptions>
      </View>
    </SafeAreaView>
  );
};

export default Settings;

const createStyles = ({theme}: Styles) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    body: {
      flex: 1,
      width: '100%',
      paddingVertical: 20,
      paddingHorizontal: 20,
    },
    options: {
      //   borderWidth: 1,
      height: 50,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      alignItems: 'center',
      width: '100%',
    },
    optionText: {
      color: theme.colors.inversePrimary,
      fontWeight: '500',
      fontSize: 18,
    },
    line: {
      borderWidth: 0.5,
      borderColor: theme.colors.outlineVariant,
      marginVertical: 5,
    },
  });

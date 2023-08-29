import {StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Styles, useAppTheme} from '../../../theme';
import DropDownPicker from 'react-native-dropdown-picker';
import {useDispatch} from 'react-redux';
import {useAppSelector} from '../../../store/redux';
import {setDefaultRegion} from '../../../store/redux/slices/dataBaseSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const regions = [
  {value: 1, label: 'Nordeste'},
  {value: 2, label: 'Sul'},
  {value: 3, label: 'Sudeste'},
  {value: 4, label: 'Norte'},
  {value: 5, label: 'Centro-Oeste'},
];

const RegionPicker = () => {
  const theme = useAppTheme();
  const styles = createStyles({theme});
  const [open, setOpen] = useState(false);

  const {defaultRegion} = useAppSelector(state => state.dataBase);
  const [region, setRegion] = useState(defaultRegion);
  const dispatch = useDispatch();

  const storedRegion = async () => {
    const storedRegion = await AsyncStorage.getItem('defaultRegion');
    if (storedRegion !== null) {
      setRegion(JSON.parse(storedRegion));
    }
  };

  //   useState(() => {
  //     if (defaultRegion !== null) {
  //       setRegion(defaultRegion);
  //     }
  //   }, [defaultRegion]);

  useEffect(() => {
    storedRegion();
  }, []);

  useEffect(() => {
    dispatch(setDefaultRegion(region));
    AsyncStorage.setItem('defaultRegion', JSON.stringify(region));
  }, [region]);

  return (
    <View style={styles.container}>
      <DropDownPicker
        open={open}
        value={region}
        items={regions}
        setValue={setRegion}
        style={styles.input}
        setOpen={setOpen}
        placeholder="Selecionar"
        placeholderStyle={{color: theme.colors.outline}}
        dropDownContainerStyle={styles.dropdownContainer}
        textStyle={{
          color: theme.colors.primary,
          fontWeight: '600',
        }}
        listMode="SCROLLVIEW"
      />
    </View>
  );
};

export default RegionPicker;

const createStyles = ({theme}: Styles) =>
  StyleSheet.create({
    container: {
      flex: 1,
      //   borderWidth: 1,
      alignItems: 'flex-end',
    },
    input: {
      height: 50,
      width: 160,
      backgroundColor: theme.colors.surfaceVariant,
      borderWidth: 0,
      borderColor: theme.colors.outline,
      borderRadius: 10,
      paddingHorizontal: 20,
      color: theme.colors.primary,
      fontSize: 16,
      fontWeight: '600',
      alignSelf: 'flex-end',
    },
    dropdownContainer: {
      backgroundColor: theme.colors.surfaceVariant,
      borderWidth: 0,
    },
  });

import {StyleSheet, Text, View} from 'react-native';
import React, {FC, useState, useEffect} from 'react';
import {Styles, useAppTheme} from '../../../theme';
import DropDownPicker from 'react-native-dropdown-picker';
import {database} from '../../../services/watermelon';
import {useAppSelector} from '../../../store/redux';

interface Props {
  title?: string;
  id: number;
  value: any;
  setValue: (value: any) => void;
}

const AddProducerDropdown: FC<Props> = ({title, id, value, setValue}) => {
  const theme = useAppTheme();
  const styles = createStyles({theme});
  const [open, setOpen] = useState(false);
  const {dairies} = useAppSelector(state => state.dataBase);

  const regions = [
    {value: 'nordeste', label: 'Nordeste'},
    {value: 'sul', label: 'Sul'},
    {value: 'sudeste', label: 'Sudeste'},
    {value: 'norte', label: 'Norte'},
    {value: 'centro-oeste', label: 'Centro-Oeste'},
  ];

  return (
    <>
      {title !== 'setting' && <Text style={styles.title}>{title}</Text>}
      <DropDownPicker
        open={open}
        value={value}
        items={title === 'Região' || title === 'setting' ? regions : dairies}
        setOpen={setOpen}
        setValue={setValue}
        style={{
          ...styles.input,
          zIndex: id * 1000 + 1,
          height: title === 'setting' ? '100%' : 55,
        }}
        placeholder="Selecionar"
        placeholderStyle={{
          color: theme.colors.outline,
        }}
        dropDownContainerStyle={{
          ...styles.dropdownContainer,
          zIndex: id * 1000 + 2,
        }}
        textStyle={{
          color: theme.colors.primary,
          fontWeight: '600',
        }}
        listMode="SCROLLVIEW"
      />
    </>
  );
};

export default AddProducerDropdown;

const createStyles = ({theme}: Styles) =>
  StyleSheet.create({
    container: {
      zIndex: 1000,
    },

    title: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.colors.primary,
    },
    input: {
      backgroundColor: theme.colors.surfaceVariant,
      height: 55,
      borderRadius: 5,
      borderWidth: 0,
      marginBottom: 10,
      //   zIndex: 10000,
    },
    dropdownContainer: {
      backgroundColor: theme.colors.surfaceVariant,
      borderWidth: 0,
    },
  });

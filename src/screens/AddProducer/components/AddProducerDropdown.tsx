import {StyleSheet, Text, View} from 'react-native';
import React, {FC, useState} from 'react';
import {Styles, useAppTheme} from '../../../theme';
import DropDownPicker from 'react-native-dropdown-picker';

interface Props {
  title: string;
  id: number;
}

const AddProducerDropdown: FC<Props> = ({title, id}) => {
  const theme = useAppTheme();
  const styles = createStyles({theme});
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Apple', value: 'apple'},
    {label: 'Banana', value: 'banana'},
  ]);

  const regions = [
    {value: 1, label: 'Nordeste'},
    {value: 2, label: 'Sul'},
    {value: 3, label: 'Sudeste'},
    {value: 4, label: 'Norte'},
    {value: 5, label: 'Centro-Oeste'},
  ];

  const dairies = [
    {
      value: 1,
      label: 'Leite Fresco',
    },
    {
      value: 2,
      label: 'Sabor Puro',
    },
    {
      value: 3,
      label: 'Vaca Feliz',
    },
    {
      value: 4,
      label: 'Gosto Natural',
    },
  ];

  return (
    <>
      <Text style={styles.title}>{title}</Text>
      <DropDownPicker
        open={open}
        value={value}
        items={title === 'Região' ? regions : dairies}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        style={{...styles.input, zIndex: id * 1000 + 1}}
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

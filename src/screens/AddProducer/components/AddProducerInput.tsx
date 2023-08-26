import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {TextInput} from 'react-native-paper';
import {Styles, useAppTheme} from '../../../theme';

interface Props {
  value: any;
  setValue: (value: any) => void;
  placeholder: string;
  title: string;
}

const AddProducerInput: FC<Props> = ({value, setValue, placeholder, title}) => {
  const theme = useAppTheme();
  const styles = createStyles({theme});
  return (
    <>
      <Text style={styles.title}>{title}</Text>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={theme.colors.outline}
        style={styles.input}
        value={value}
        onChangeText={text => setValue(text)}
        textColor={theme.colors.primary}
        keyboardType={title === 'Nome' ? 'default' : 'numeric'}
        underlineColor="transparent"
      />
    </>
  );
};

export default AddProducerInput;

const createStyles = ({theme}: Styles) =>
  StyleSheet.create({
    input: {
      backgroundColor: theme.colors.surfaceVariant,
      height: 55,
      borderRadius: 5,
      borderWidth: 0,
      marginBottom: 10,
    },
    title: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.colors.primary,
    },
  });

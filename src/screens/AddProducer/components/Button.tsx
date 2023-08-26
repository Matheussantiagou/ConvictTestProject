import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {FC} from 'react';
import {Styles, useAppTheme} from '../../../theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface ButtonProps {
  title: string;
}

const Button: FC<ButtonProps> = ({title}) => {
  const theme = useAppTheme();
  const styles = createStyles({theme});
  return (
    <TouchableOpacity style={styles.button}>
      <Icon name={'close'} size={30} color={theme.colors.primary} />
      <Text numberOfLines={1} style={styles.title}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;

const createStyles = ({theme}: Styles) =>
  StyleSheet.create({
    button: {
      width: 110,
      height: 110,
      backgroundColor: theme.colors.surfaceVariant,
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontSize: 14,
      fontWeight: '600',
      color: theme.colors.primary,
    },
  });

import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {FC} from 'react';
import {Styles, useAppTheme} from '../../../theme';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
interface Props {
  title: string;
  toScreen: string;
  iconName?: string;
}

const Button: FC<Props> = ({title, toScreen, iconName}) => {
  const theme = useAppTheme();
  const styles = createStyles({theme});
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate(`${toScreen}`);
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handlePress}>
      <Icon name={`${iconName}`} size={40} color={theme.colors.primary} />
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const createStyles = ({theme}: Styles) =>
  StyleSheet.create({
    container: {
      flex: 1,
      //   backgroundColor: theme.colors.secondary,
      width: '100%',
      paddingHorizontal: 20,
    },
    button: {
      backgroundColor: theme.colors.primaryContainer,
      width: 125,
      height: 160,
      borderRadius: 10,
      padding: 10,
      justifyContent: 'space-between',
    },
    buttonText: {
      color: theme.colors.primary,
      fontSize: 18,
      fontWeight: '800',
    },
  });

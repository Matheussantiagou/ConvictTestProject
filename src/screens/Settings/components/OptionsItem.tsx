import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';
import {Styles, useAppTheme} from '../../../theme';
import Icon from 'react-native-vector-icons/FontAwesome5';

interface Props {
  title: string;
  color?: string;
  iconName?: string;
  onPress?: () => void;
}

const OptionsItem: FC<Props> = ({title, color, iconName, onPress}) => {
  const theme = useAppTheme();
  const styles = createStyles({theme});
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text
        style={[
          styles.optionText,
          {
            color: color,
          },
        ]}>
        {title}
      </Text>
      <Icon name={`${iconName}`} size={20} color={color} />
    </TouchableOpacity>
  );
};

export default OptionsItem;

const createStyles = ({theme}: Styles) =>
  StyleSheet.create({
    button: {
      height: 50,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      alignItems: 'center',
    },
    optionText: {
      color: theme.colors.inversePrimary,
      fontWeight: '500',
      fontSize: 18,
    },
  });

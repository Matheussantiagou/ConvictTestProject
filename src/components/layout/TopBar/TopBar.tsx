import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {FC} from 'react';
import {Styles, useAppTheme} from '../../../theme';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

interface Props {
  title: string;
}

const TopBar: FC<Props> = ({title}) => {
  const theme = useAppTheme();
  const styles = createStyles({theme});
  const navigation = useNavigation();
  const handlePress = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePress}>
        <Icon name="chevron-back" size={40} color={theme.colors.onPrimary} />
      </TouchableOpacity>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};

export default TopBar;

const createStyles = ({theme}: Styles) =>
  StyleSheet.create({
    container: {
      width: '100%',
      height: 90,
      backgroundColor: theme.colors.primary,
      flexDirection: 'row',
      alignItems: 'center',
      borderTopEndRadius: 0,
      borderTopStartRadius: 0,
      borderRadius: 25,
      paddingHorizontal: 20,
    },
    text: {
      color: theme.colors.onPrimary,
      left: 10,
      fontSize: 25,
      fontWeight: '400',
    },
  });

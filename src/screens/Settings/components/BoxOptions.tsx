import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {Styles, useAppTheme} from '../../../theme';

interface Props {
  title: string;
  children?: React.ReactNode;
}
const BoxOptions: FC<Props> = ({title, children}) => {
  const theme = useAppTheme();
  const styles = createStyles({theme});
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {children}
    </View>
  );
};

export default BoxOptions;

const createStyles = ({theme}: Styles) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.surfaceVariant,
      minHeight: 100,
      width: '100%',
      borderRadius: 10,

      paddingVertical: 20,
      marginBottom: 20,
    },
    title: {
      color: theme.colors.primary,
      fontSize: 20,
      fontWeight: '500',
      marginBottom: 5,
      paddingLeft: 20,
    },
  });

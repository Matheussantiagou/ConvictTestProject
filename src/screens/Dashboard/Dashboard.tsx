import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import React from 'react';
import {Styles, useAppTheme} from '../../theme';

const Dashboard = () => {
  const theme = useAppTheme();
  const styles = createStyles({theme});
  return (
    <SafeAreaView style={styles.container}>
      <Text>ola</Text>
    </SafeAreaView>
  );
};

export default Dashboard;

const createStyles = ({theme}: Styles) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
  });

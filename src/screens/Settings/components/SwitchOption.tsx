import React, {FC} from 'react';
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import {MD3Theme, Switch, SwitchProps, useTheme} from 'react-native-paper';

interface SwitchOptionProps {
  switchProps?: Omit<SwitchProps, 'theme'>;
  label: string;
  onPress?: () => void;
}

const SwitchOption: FC<SwitchOptionProps> = ({switchProps, label, onPress}) => {
  const theme = useTheme();
  const styles = createStyle(theme);

  return (
    <TouchableOpacity
      disabled={!onPress}
      onPress={onPress}
      style={styles.container}>
      <View style={styles.content}>
        {switchProps && (
          <View style={styles.rightContainer}>
            <Text style={styles.stateTitle}>
              {theme.dark ? 'Ligado' : 'Desligado'}
            </Text>
            {switchProps && <Switch {...switchProps} />}
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default SwitchOption;

const createStyle = (theme: MD3Theme) =>
  StyleSheet.create({
    container: {
      height: 50,
    },
    content: {
      flex: 1,
      width: '100%',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
    },
    title: {
      color: theme.colors.onBackground,
    },
    stateTitle: {
      color: theme.colors.outline,
      marginRight: 10,
    },
    rightContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

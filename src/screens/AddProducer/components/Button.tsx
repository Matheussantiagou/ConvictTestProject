import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {FC} from 'react';
import {Styles, useAppTheme} from '../../../theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Check from '../../../../assets/images/icons/Check.svg';
import CloseHexagon from '../../../../assets/images/icons/CloseHexagon.svg';
import Handshake from '../../../../assets/images/icons/Handshake.svg';

interface ButtonProps {
  title: string;
  setNegociationStatus: (value: string) => void;
  value: string;
  negociationStatus: string;
}

const Button: FC<ButtonProps> = ({
  title,
  setNegociationStatus,
  value,
  negociationStatus,
}) => {
  const theme = useAppTheme();
  const styles = createStyles({theme});

  return (
    <TouchableOpacity
      onPress={() => {
        setNegociationStatus(value);
      }}
      style={[
        styles.button,
        {
          backgroundColor:
            negociationStatus === value
              ? theme.colors.primary
              : theme.colors.surfaceVariant,
        },
      ]}>
      {value === 'done' ? (
        <Check
          width={30}
          height={30}
          fill={
            negociationStatus === value
              ? theme.colors.onPrimary
              : theme.colors.primary
          }
        />
      ) : value === 'in progress' ? (
        <Handshake
          width={30}
          height={30}
          fill={
            negociationStatus === value
              ? theme.colors.onPrimary
              : theme.colors.primary
          }
        />
      ) : (
        <CloseHexagon
          width={30}
          height={30}
          fill={
            negociationStatus === value
              ? theme.colors.onPrimary
              : theme.colors.primary
          }
        />
      )}
      <Text
        numberOfLines={2}
        style={[
          styles.title,
          {
            color:
              negociationStatus === value
                ? theme.colors.onPrimary
                : theme.colors.primary,
          },
        ]}>
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
      marginTop: 5,
    },
    title: {
      marginTop: 5,
      fontSize: 11,
      fontWeight: '600',
      color: theme.colors.primary,
      textAlign: 'center',
      alignSelf: 'center',
    },
  });

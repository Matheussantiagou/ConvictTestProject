import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {FC} from 'react';
import {Styles, useAppTheme} from '../../../theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from 'react-native-modal';

interface Props {
  isVisible: boolean;
  onConfirm: () => void;
  setIsVisible: (isVisible: boolean) => void;
}

const ConfirmDeleteModal: FC<Props> = ({
  isVisible,
  onConfirm,
  setIsVisible,
}) => {
  const theme = useAppTheme();
  const styles = createStyles({theme});

  const handleCancel = () => {
    setIsVisible(false);
  };

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={handleCancel}
      animationIn={'bounceIn'}
      animationOut={'bounceOut'}
      animationInTiming={1000}
      animationOutTiming={500}>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={handleCancel}>
            <Icon name={'close'} size={30} color={theme.colors.primary} />
          </TouchableOpacity>
          <Text style={styles.title}>
            Você tem certeza que deseja excluir o produtor?
          </Text>
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[
              styles.button,
              {
                borderColor: theme.colors.error,
              },
            ]}
            onPress={onConfirm}>
            <Text style={[styles.buttonText, {color: theme.colors.error}]}>
              Sim
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleCancel}>
            <Text style={styles.buttonText}>Não</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmDeleteModal;

const createStyles = ({theme}: Styles) =>
  StyleSheet.create({
    container: {
      height: 170,
      width: '100%',
      borderRadius: 25,
      borderWidth: 2,
      backgroundColor: theme.colors.background,
      borderColor: theme.colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      flex: 1,
      //   borderWidth: 1,
      width: '100%',
    },
    textContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-end',
      width: '100%',
    },
    button: {
      height: 50,
      width: 120,
      backgroundColor: theme.colors.background,
      borderWidth: 1.5,
      borderColor: theme.colors.primary,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonText: {
      color: theme.colors.primary,
      fontSize: 18,
      fontWeight: '600',
    },
    title: {
      fontSize: 18,
      fontWeight: '600',
      color: theme.colors.onBackground,
      alignSelf: 'center',
      textAlign: 'center',
      paddingHorizontal: 20,
    },
    closeButton: {
      position: 'absolute',
      top: 10,
      right: 10,
    },
  });

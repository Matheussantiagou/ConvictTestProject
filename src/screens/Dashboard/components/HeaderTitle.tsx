import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {Styles, useAppTheme} from '../../../theme';

interface HeaderTitleProps {
  title: string;
}

const HeaderTitle: FC<HeaderTitleProps> = ({title}) => {
  const theme = useAppTheme();
  const styles = createStyles({theme});

  return <Text style={styles.regionsTitle}>{title}</Text>;
};

export default HeaderTitle;

const createStyles = ({theme}: Styles) =>
  StyleSheet.create({
    regionsTitle: {
      color: theme.colors.onPrimary,
      fontSize: 15,
    },
  });

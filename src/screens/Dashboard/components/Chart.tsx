import React, {Component, FC, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import PieChart from 'react-native-pie-chart';
import {Styles, useAppTheme} from '../../../theme';
import {ThemeContext} from '../../../contexts/ThemeContext';

interface Props {
  done: number;
  pending: number;
  rejected: number;
  color?: string;
}

export default class Chart extends Component<Props> {
  render() {
    const {done, pending, rejected, color} = this.props;
    const series = [done, pending, rejected];
    const sliceColor = [
      'rgb(1, 92, 75)',
      'rgb(93, 219, 188)',
      'rgb(171, 227, 196)',
    ];

    return (
      <PieChart
        widthAndHeight={150}
        series={series}
        sliceColor={sliceColor}
        coverRadius={0.65}
        coverFill={color}
      />
    );
  }
}

export const PieChartScreen: FC<Props> = ({done, pending, rejected}) => {
  const theme = useAppTheme();
  const styles = createStyles({theme});

  return (
    <View style={styles.container}>
      <View style={styles.legendContainer}>
        <Chart done={done} pending={pending} rejected={rejected} />
      </View>
      <View style={styles.legendContainer}>
        <View style={styles.legend}>
          <Text numberOfLines={1} style={styles.legendTitle}>
            Contratados
          </Text>
          <Text style={styles.number}>{done}</Text>
        </View>
        <View
          style={[
            styles.legend,
            {
              backgroundColor: theme.colors.inversePrimary,
            },
          ]}>
          <Text numberOfLines={1} style={styles.legendTitle2}>
            Negociações
          </Text>
          <Text style={styles.number2}>{pending}</Text>
        </View>
        <View
          style={[
            styles.legend,
            {
              backgroundColor: theme.colors.primaryContainer,
            },
          ]}>
          <Text numberOfLines={1} style={styles.legendTitle2}>
            Recusados
          </Text>
          <Text style={styles.number2}>{rejected}</Text>
        </View>
      </View>
    </View>
  );
};

// createStyles function remains the same

const createStyles = ({theme}: Styles) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      paddingTop: 10,
      marginBottom: 20,
    },
    title: {
      fontSize: 24,
      margin: 10,
    },
    legendContainer: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      //   borderWidth: 1,
      flex: 1,
      gap: 5,
    },
    legend: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: 35,
      width: '80%',
      borderRadius: 7,
      backgroundColor: theme.colors.primary,
      paddingHorizontal: 10,
    },
    legendTitle: {
      flex: 2,
      color: theme.colors.onPrimary,
      fontWeight: '500',
    },
    legendTitle2: {
      flex: 2,
      color: theme.colors.primary,
      fontWeight: '500',
    },
    number: {
      flex: 1,
      color: theme.colors.onPrimary,
      fontWeight: '500',
      textAlign: 'right',
    },
    number2: {
      flex: 1,
      color: theme.colors.primary,
      fontWeight: '500',
      textAlign: 'right',
    },
  });

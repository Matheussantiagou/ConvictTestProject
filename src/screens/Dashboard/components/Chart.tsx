import React, {Component, FC, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import PieChart from 'react-native-pie-chart';
import {Styles, useAppTheme} from '../../../theme';

interface Props {
  done: number;
  pending: number;
  rejected: number;
}

export default class Chart extends Component<Props> {
  render() {
    const {done, pending, rejected} = this.props;
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
        coverFill={'#FFF'}
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
          <Text style={styles.legendTitle}>Contratados</Text>
          <Text style={styles.legendTitle}>{done}</Text>
        </View>
        <View
          style={[
            styles.legend,
            {
              backgroundColor: theme.colors.inversePrimary,
            },
          ]}>
          <Text style={styles.legendTitle2}>Negociações</Text>
          <Text style={styles.legendTitle2}>{pending}</Text>
        </View>
        <View
          style={[
            styles.legend,
            {
              backgroundColor: theme.colors.primaryContainer,
            },
          ]}>
          <Text style={styles.legendTitle2}>Recusados</Text>
          <Text style={styles.legendTitle2}>{rejected}</Text>
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
      color: theme.colors.onPrimary,
      fontWeight: '500',
    },
    legendTitle2: {
      color: theme.colors.primary,
      fontWeight: '500',
    },
  });

import {StyleSheet, Text, View, SafeAreaView, SectionList} from 'react-native';
import React, {useState} from 'react';
import {Styles, useAppTheme} from '../../theme';
import {TopBar} from '../../components';
import RenderItem from './components/RenderItem';
import {database} from '../../services/watermelon';

interface MilkPriceData {
  year: number;
  value: number;
  month: number;
}

interface GroupedData {
  title: number;
  data: MilkPriceData[];
}

const MilkPriceHistory = () => {
  const theme = useAppTheme();
  const styles = createStyles({theme});
  const [milkPrice, setMilkPrice] = useState<GroupedData[]>([]);

  const milkPrices = async () => {
    const milkPriceDB: any[] = await database.get('milk_price').query().fetch();

    const groupedData: {[key: number]: GroupedData} = milkPriceDB.reduce(
      (acc, record: any) => {
        const year = record._raw.year;

        if (!acc[year]) {
          acc[year] = {title: year, data: []};
        }

        acc[year].data.push({
          value: record._raw.value,
          month: record._raw.month,
        });

        return acc;
      },
      {},
    );

    const simplifiedData = Object.values(groupedData);

    setMilkPrice(simplifiedData.reverse());
  };

  React.useEffect(() => {
    milkPrices();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <TopBar title="Histórico" />
      <View style={styles.body}>
        <SectionList
          sections={milkPrice}
          keyExtractor={(item: MilkPriceData, index: number) =>
            `${item.month}-${index}`
          }
          renderItem={({item}) => (
            <RenderItem item={item} key={item.month + item.year} />
          )}
          renderSectionHeader={({section: {title}}) => (
            <View style={styles.headerContainer}>
              <Text style={styles.header}>{title}</Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default MilkPriceHistory;

const createStyles = ({theme}: Styles) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    body: {
      flex: 1,
      paddingBottom: 10,
      //   paddingHorizontal: 20,
    },
    header: {
      color: theme.colors.primary,
      fontSize: 22,
      fontWeight: '500',
      paddingHorizontal: 20,
      alignSelf: 'flex-start',
    },
    headerContainer: {
      backgroundColor: theme.colors.surfaceVariant,
      width: '90%',
      alignSelf: 'center',
      height: 50,
      justifyContent: 'center',
      borderTopEndRadius: 10,
      borderTopStartRadius: 10,
      marginTop: 15,
    },
  });

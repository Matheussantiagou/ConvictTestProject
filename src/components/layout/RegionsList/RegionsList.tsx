import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';
import {Styles, useAppTheme} from '../../../theme';
import HeaderTitle from '../../../screens/Dashboard/components/HeaderTitle';

interface RegionProps {
  isAtHome?: boolean;
}

const regions = [
  {id: 1, nome: 'Nordeste'},
  {id: 2, nome: 'Sul'},
  {id: 3, nome: 'Sudeste'},
  {id: 4, nome: 'Norte'},
  {id: 5, nome: 'Centro-Oeste'},
];

const RegionsList: FC<RegionProps> = ({isAtHome}) => {
  const theme = useAppTheme();
  const styles = createStyles({theme});
  const [selectedRegion, setSelectedRegion] = React.useState(1);

  return (
    <View style={styles.container}>
      {isAtHome && <HeaderTitle title="Regiões" />}
      <FlatList
        data={regions}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{width: 10}} />}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => {
              // console.log('item', item);
              setSelectedRegion(item.id);
            }}
            style={[
              styles.button,
              {
                backgroundColor:
                  selectedRegion == item.id
                    ? isAtHome
                      ? theme.colors.secondary
                      : theme.colors.primary
                    : isAtHome
                    ? theme.colors.primary
                    : theme.colors.surfaceVariant,
              },
            ]}>
            <Text
              style={[
                styles.buttonText,
                {
                  color:
                    selectedRegion == item.id
                      ? theme.colors.onPrimary
                      : isAtHome
                      ? theme.colors.onPrimary
                      : theme.colors.inversePrimary,
                },
              ]}>
              {item.nome}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

export default RegionsList;

const createStyles = ({theme}: Styles) =>
  StyleSheet.create({
    container: {
      // borderWidth: 1,
      // height: 50,
      // flex: 1,
      gap: 8,
      width: '100%',
      paddingLeft: 20,
      paddingBottom: 5,
    },
    button: {
      paddingHorizontal: 10,
      backgroundColor: theme.colors.primaryContainer,
      height: 30,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 8,
    },
    buttonText: {
      color: theme.colors.onPrimary,
      fontSize: 14,
      fontWeight: '600',
    },
    regionsText: {
      color: theme.colors.onPrimary,
    },
    regionsTitle: {
      color: theme.colors.onPrimary,
      fontSize: 15,
    },
  });

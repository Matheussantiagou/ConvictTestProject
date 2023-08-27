import {View, FlatList} from 'react-native';
import React from 'react';

import {ProducerListItem} from './ProducerListItem';

export function ProducersList({producers}: any) {
  return (
    <FlatList
      keyExtractor={item => item.id.toString()}
      data={producers}
      ItemSeparatorComponent={() => <View style={{height: 10}} />}
      renderItem={({item}) => <ProducerListItem item={item} />}
    />
  );
}

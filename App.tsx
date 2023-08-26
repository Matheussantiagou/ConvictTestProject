import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Navigator from './src/routes/Routes';

export default function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Navigator />
    </NavigationContainer>
  );
}

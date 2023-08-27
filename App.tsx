import {StatusBar} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import Navigator from './src/routes/Routes';
import {NavigationContainer} from '@react-navigation/native';
import {PaperProvider} from 'react-native-paper';
import {ThemeContext} from './src/contexts/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AppDarkTheme, AppTheme} from './src/theme';

import {Provider} from 'react-redux';
import {store} from './src/store/redux';

export default function App(): JSX.Element {
  const [isThemeDark, setIsThemeDark] = useState(false);

  const toggleTheme = useCallback(async () => {
    setIsThemeDark((prevIsThemeDark: boolean) => {
      const newIsThemeDark = !prevIsThemeDark;
      AsyncStorage.setItem('isThemeDark', JSON.stringify(newIsThemeDark));
      return newIsThemeDark;
    });
  }, []);

  const handlerTheme = async () => {
    const isThemeDark = await AsyncStorage.getItem('isThemeDark');
    if (isThemeDark) {
      setIsThemeDark(JSON.parse(isThemeDark));
    }
  };

  useEffect(() => {
    handlerTheme();
  }, []);

  let theme = isThemeDark ? AppDarkTheme : AppTheme;

  return (
    <Provider store={store}>
      <ThemeContext.Provider value={{toggleTheme, isThemeDark}}>
        <StatusBar
          barStyle={theme ? 'light-content' : 'dark-content'}
          backgroundColor={theme.colors.primary}
        />
        <PaperProvider theme={theme}>
          <NavigationContainer>
            <Navigator />
          </NavigationContainer>
        </PaperProvider>
      </ThemeContext.Provider>
    </Provider>
  );
}

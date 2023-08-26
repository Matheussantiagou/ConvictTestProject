import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useEffect,
  useState,
} from 'react';

type ThemeContextType = {
  toggleTheme: () => void;
  isThemeDark: boolean;
};

export const ThemeContext = createContext<ThemeContextType>({
  toggleTheme: () => {},
  isThemeDark: false,
});

export const ThemeContextProvider = ({children}: PropsWithChildren) => {
  const [isThemeDark, setIsThemeDark] = useState(false);

  const toggleTheme = useCallback(async () => {
    setIsThemeDark(prevIsThemeDark => {
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

  return (
    <ThemeContext.Provider value={{toggleTheme, isThemeDark}}>
      {children}
    </ThemeContext.Provider>
  );
};

import {
  adaptNavigationTheme,
  MD3DarkTheme,
  MD3LightTheme,
  useTheme,
} from 'react-native-paper';

import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';

const {LightTheme, DarkTheme} = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

export const AppTheme = {
  ...MD3LightTheme,
  ...LightTheme,

  colors: {
    primary: 'rgb(0, 107, 88)',
    onPrimary: 'rgb(255, 255, 255)',
    primaryContainer: 'rgb(123, 248, 216)',
    onPrimaryContainer: 'rgb(0, 32, 25)',
    secondary: 'rgb(75, 99, 91)',
    onSecondary: 'rgb(255, 255, 255)',
    secondaryContainer: 'rgb(205, 233, 222)',
    onSecondaryContainer: 'rgb(7, 32, 26)',
    tertiary: 'rgb(66, 98, 119)',
    onTertiary: 'rgb(255, 255, 255)',
    tertiaryContainer: 'rgb(198, 231, 255)',
    onTertiaryContainer: 'rgb(0, 30, 45)',
    error: 'rgb(186, 26, 26)',
    onError: 'rgb(255, 255, 255)',
    errorContainer: 'rgb(255, 218, 214)',
    onErrorContainer: 'rgb(65, 0, 2)',
    background: 'rgb(251, 253, 250)',
    onBackground: 'rgb(25, 28, 27)',
    surface: 'rgb(251, 253, 250)',
    onSurface: 'rgb(25, 28, 27)',
    surfaceVariant: 'rgb(219, 229, 224)',
    onSurfaceVariant: 'rgb(63, 73, 69)',
    outline: 'rgb(111, 121, 117)',
    outlineVariant: 'rgb(191, 201, 196)',
    shadow: 'rgb(0, 0, 0)',
    scrim: 'rgb(0, 0, 0)',
    inverseSurface: 'rgb(46, 49, 48)',
    inverseOnSurface: 'rgb(239, 241, 238)',
    inversePrimary: 'rgb(93, 219, 188)',
    elevation: {
      level0: 'transparent',
      level1: 'rgb(238, 246, 242)',
      level2: 'rgb(231, 241, 237)',
      level3: 'rgb(223, 237, 232)',
      level4: 'rgb(221, 236, 231)',
      level5: 'rgb(216, 233, 227)',
    },
    surfaceDisabled: 'rgba(25, 28, 27, 0.12)',
    onSurfaceDisabled: 'rgba(25, 28, 27, 0.38)',
    backdrop: 'rgba(41, 50, 47, 0.4)',
  },
};

export const AppDarkTheme = {
  ...MD3DarkTheme,
  ...DarkTheme,

  colors: {
    primary: 'rgb(93, 219, 188)',
    onPrimary: 'rgb(0, 56, 45)',
    primaryContainer: 'rgb(0, 81, 66)',
    onPrimaryContainer: 'rgb(123, 248, 216)',
    secondary: 'rgb(178, 204, 195)',
    onSecondary: 'rgb(29, 53, 46)',
    secondaryContainer: 'rgb(51, 76, 68)',
    onSecondaryContainer: 'rgb(205, 233, 222)',
    tertiary: 'rgb(169, 203, 227)',
    onTertiary: 'rgb(15, 52, 71)',
    tertiaryContainer: 'rgb(41, 74, 94)',
    onTertiaryContainer: 'rgb(198, 231, 255)',
    error: 'rgb(255, 180, 171)',
    onError: 'rgb(105, 0, 5)',
    errorContainer: 'rgb(147, 0, 10)',
    onErrorContainer: 'rgb(255, 180, 171)',
    background: 'rgb(25, 28, 27)',
    onBackground: 'rgb(225, 227, 224)',
    surface: 'rgb(25, 28, 27)',
    onSurface: 'rgb(225, 227, 224)',
    surfaceVariant: 'rgb(63, 73, 69)',
    onSurfaceVariant: 'rgb(191, 201, 196)',
    outline: 'rgb(137, 147, 143)',
    outlineVariant: 'rgb(63, 73, 69)',
    shadow: 'rgb(0, 0, 0)',
    scrim: 'rgb(0, 0, 0)',
    inverseSurface: 'rgb(225, 227, 224)',
    inverseOnSurface: 'rgb(46, 49, 48)',
    inversePrimary: 'rgb(0, 107, 88)',
    elevation: {
      level0: 'transparent',
      level1: 'rgb(28, 38, 35)',
      level2: 'rgb(30, 43, 40)',
      level3: 'rgb(33, 49, 45)',
      level4: 'rgb(33, 51, 46)',
      level5: 'rgb(35, 55, 50)',
    },
    surfaceDisabled: 'rgba(225, 227, 224, 0.12)',
    onSurfaceDisabled: 'rgba(225, 227, 224, 0.38)',
    backdrop: 'rgba(41, 50, 47, 0.4)',
  },
};

export type AppTheme = typeof AppTheme;

export type AppColors = keyof AppTheme['colors'];

export const useAppTheme = () => useTheme<AppTheme>();

export * from './types';

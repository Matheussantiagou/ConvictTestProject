import React, {useEffect} from 'react';
import AppStackNavigator from './AppStack';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setDefaultRegion} from '../store/redux/slices/dataBaseSlice';

export default function Navigator() {
  const dispatch = useDispatch();

  const loadRegionFromStorage = async () => {
    const storedRegion = await AsyncStorage.getItem('defaultRegion');
    if (storedRegion !== null) {
      // setRegion(JSON.parse(storedRegion));
      dispatch(setDefaultRegion(JSON.parse(storedRegion)));
    }
  };

  useEffect(() => {
    loadRegionFromStorage();
  }, []);

  return <AppStackNavigator />;
}

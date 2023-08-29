import React, {useEffect, useState} from 'react';
import {database} from '../services/watermelon';
import {Q} from '@nozbe/watermelondb';
import {
  setDairies,
  setPercentage,
  setReduxMilkPrice,
} from '../store/redux/slices/dataBaseSlice';
import {useAppDispatch, useAppSelector} from '../store/redux';

const regions = [
  {id: 1, nome: 'Nordeste'},
  {id: 2, nome: 'Sul'},
  {id: 3, nome: 'Sudeste'},
  {id: 4, nome: 'Norte'},
  {id: 5, nome: 'Centro-Oeste'},
];

interface RawData {
  year: number;
  month: number;
  value: number;
}

interface Region {
  id: number;
  nome: string;
}

interface ProducerRaw {
  daily_production: number;
  negociation: string;
}

export default function useDatabase() {
  const dispatch = useAppDispatch();
  const {milkPrice, defaultRegion} = useAppSelector(state => state.dataBase);
  const [totalProduction, setTotalProduction] = useState<number>(0);
  const [negocitionDone, setNegocitionDone] = useState<number>(0);
  const [negocitionPending, setNegocitionPending] = useState<number>(0);
  const [negocitionRejected, setNegocitionRejected] = useState<number>(0);

  const getPercentageIncrease = async () => {
    const milkPriceDB: any[] = await database.get('milk_price').query().fetch();
    if (milkPriceDB.length < 2) return dispatch(setPercentage(0));

    const sortedData = milkPriceDB.sort((a, b) => {
      const dataA: RawData = a._raw;
      const dataB: RawData = b._raw;

      if (dataA.year === dataB.year) {
        return dataA.month - dataB.month;
      }
      return dataA.year - dataB.year;
    });

    const lastMonth = sortedData[sortedData.length - 1]._raw;
    const penultimateMonth = sortedData[sortedData.length - 2]._raw;

    const percentageIncrease: number =
      ((lastMonth.value - penultimateMonth.value) / penultimateMonth.value) *
      100;

    dispatch(setPercentage(percentageIncrease.toFixed(2)));
  };

  const getMilkPrice = async () => {
    const milkPriceDB: any[] = await database.get('milk_price').query().fetch();

    if (milkPriceDB.length === 0) {
      return dispatch(setReduxMilkPrice(0));
    }

    const mostRecentMonth = milkPriceDB.reduce((mostRecent, current) => {
      const mostRecentYear = mostRecent._raw.year;
      const mostRecentMonth = mostRecent._raw.month;

      const currentYear = current._raw.year;
      const currentMonth = current._raw.month;

      return currentYear > mostRecentYear ||
        (currentYear === mostRecentYear && currentMonth > mostRecentMonth)
        ? current
        : mostRecent;
    });

    const latestValue = mostRecentMonth._raw.value;
    dispatch(setReduxMilkPrice(latestValue));
  };

  const getAllProducers = async () => {
    let totalProduction = 0;
    let negocitionDone = 0;
    let negocitionPending = 0;
    let negocitionRejected = 0;

    const allProducers: any[] = await database
      .get('producers')
      .query(
        Q.where('region', `${regions[defaultRegion - 1]?.nome.toLowerCase()}`),
      )
      .fetch();

    allProducers.forEach((producer: any) => {
      const {daily_production, negociation} = producer._raw;

      totalProduction += daily_production;

      switch (negociation) {
        case 'done':
          negocitionDone++;
          break;
        case 'in progress':
          negocitionPending++;
          break;
        default:
          negocitionRejected++;
          break;
      }
    });

    if (milkPrice !== 0) {
      totalProduction *= milkPrice;
    }

    setTotalProduction(totalProduction);
    setNegocitionDone(negocitionDone);
    setNegocitionPending(negocitionPending);
    setNegocitionRejected(negocitionRejected);
  };

  const getDairies = async () => {
    const dairiesDB = await database.get('dairies').query().fetch();
    const simplifiedData = dairiesDB.map((record: any) => {
      return {
        value: record._raw.dairy_id,
        label: record._raw.name,
      };
    });

    if (simplifiedData.length === 0) {
      dispatch(setDairies([]));
    } else {
      dispatch(setDairies(simplifiedData));
    }
  };
  useEffect(() => {
    getAllProducers();
    getMilkPrice();
    console.log('useDatabase', defaultRegion);
  }, [defaultRegion]);

  useEffect(() => {
    console.log('Peguei os dairies');
    getDairies();
  }, []);

  return {
    getAllProducers,
    getMilkPrice,
    milkPrice,
    totalProduction,
    getDairies,
    negocitionDone,
    negocitionPending,
    negocitionRejected,
    getPercentageIncrease,
  };
}

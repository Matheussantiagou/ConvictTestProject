import React, {useEffect} from 'react';
import {database} from '../services/watermelon';
import {Q} from '@nozbe/watermelondb';
import {
  setDairies,
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

export default function useDatabase() {
  const {milkPrice, defaultRegion} = useAppSelector(state => state.dataBase);
  const [totalProduction, setTotalProduction] = React.useState(0);
  const dispatch = useAppDispatch();

  const getMilkPrice = async () => {
    const milkPriceDB = await database.get('milk_price').query().fetch();
    let mostRecentMonth: any = null;
    for (const record of milkPriceDB) {
      const recordYear = record._raw.year;
      const recordMonth = record._raw.month;

      if (!mostRecentMonth) {
        mostRecentMonth = record;
      } else {
        const mostRecentYear = mostRecentMonth._raw.year;
        const mostRecentMonthValue = mostRecentMonth._raw.month;

        if (
          recordYear > mostRecentYear ||
          (recordYear === mostRecentYear && recordMonth > mostRecentMonthValue)
        ) {
          mostRecentMonth = record;
        }
      }
    }

    if (mostRecentMonth) {
      const latestValue = mostRecentMonth._raw.value;
      dispatch(setReduxMilkPrice(latestValue));
    } else {
      dispatch(setReduxMilkPrice(0));
    }
  };

  const getAllProducers = async () => {
    let totalProduction = 0;
    const allProducers = await database
      .get('producers')
      .query(
        Q.where('region', `${regions[defaultRegion - 1]?.nome.toLowerCase()}`),
      )
      .fetch();
    const shortList = allProducers.map((producer: any) => {
      return {
        daily_production: producer._raw.daily_production,
      };
    });

    shortList.forEach((producer: any) => {
      totalProduction += producer.daily_production;
    });

    if (milkPrice === 0) {
      setTotalProduction(0);
    } else {
      setTotalProduction(totalProduction * milkPrice);
    }
  };

  const getDairies = async () => {
    const dairiesDB = await database.get('dairies').query().fetch();
    const simplifiedData = dairiesDB.map((record: any) => {
      return {
        value: record._raw.id,
        label: record._raw.name,
      };
    });

    if (simplifiedData.length === 0) {
      dispatch(setDairies([]));
    } else {
      dispatch(setDairies(simplifiedData));
    }
    console.log(simplifiedData);
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
  };
}

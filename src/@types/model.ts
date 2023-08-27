import {Model} from '@nozbe/watermelondb';

export interface IProducer extends Model {
  id: string;
  name: string;
  daily_production: number;
  region: string;
  dairies: string;
  negociation: string;
}

export interface IProducers {
  producers: IProducer[];
}

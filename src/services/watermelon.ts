import {Database} from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';

import schema from '../model/schema';
import migrations from '../model/migrations';

import Producers from '../model/producers';
import MilkPrice from '../model/milkPrice';
import Dairies from '../model/dairies';

const adapter = new SQLiteAdapter({
  schema,
  migrations,
  dbName: 'ConvictDB',
});

export const database = new Database({
  adapter,
  modelClasses: [Producers, MilkPrice, Dairies],
});

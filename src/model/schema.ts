import {appSchema, tableSchema} from '@nozbe/watermelondb';

export default appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: 'producers',
      columns: [
        {name: 'daily_production', type: 'number'},
        {name: 'dairy_id', type: 'string'},
        {name: 'name', type: 'string'},
        {name: 'negociation', type: 'string'},
        {name: 'region', type: 'string'},
      ],
    }),
    tableSchema({
      name: 'milk_price',
      columns: [
        {name: 'month', type: 'number'},
        {name: 'value', type: 'number'},
        {name: 'year', type: 'number'},
      ],
    }),
    tableSchema({
      name: 'dairies',
      columns: [
        {name: 'name', type: 'string'},
        {name: 'dairy_id', type: 'string'},
      ],
    }),
  ],
});

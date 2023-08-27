import {appSchema, tableSchema} from '@nozbe/watermelondb';

export default appSchema({
  version: 3,
  tables: [
    tableSchema({
      name: 'producers',
      columns: [
        {name: 'name', type: 'string'},
        {name: 'region', type: 'string'},
        {name: 'daily_production', type: 'string'},
        {name: 'negociation', type: 'string'},
        {name: 'dairies', type: 'number'},
      ],
    }),
    tableSchema({
      name: 'milk_prices',
      columns: [
        {name: 'month', type: 'number'},
        {name: 'value', type: 'number'},
        {name: 'year', type: 'number'},
      ],
    }),
    tableSchema({
      name: 'dairies',
      columns: [{name: 'name', type: 'number', isIndexed: true}],
    }),
  ],
});

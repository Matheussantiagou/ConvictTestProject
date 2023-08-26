import {appSchema, tableSchema} from '@nozbe/watermelondb';

export default appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: 'producers',
      columns: [
        {name: 'name', type: 'string'},
        {name: 'daily_production', type: 'string'},
        {name: 'negociation', type: 'string'},
        {name: 'region', type: 'string'},
      ],
    }),
  ],
});

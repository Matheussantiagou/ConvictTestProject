import {Model, Relation} from '@nozbe/watermelondb';
import {field, relation} from '@nozbe/watermelondb/decorators';

export default class Producer extends Model {
  static table = 'producers';

  @field('daily_production') daily_production!: number;
  @field('dairy_id') dairy_id!: string;
  @field('name') name!: string;
  @field('negociation') negociation!: string;
  @field('region') region!: string;

  @relation('dairies', 'dairy_id') dairy: Relation; // Relação com a tabela 'dairies'
}

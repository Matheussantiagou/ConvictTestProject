import {Model} from '@nozbe/watermelondb';
import {field} from '@nozbe/watermelondb/decorators';

export default class Category extends Model {
  static table = 'producers';

  @field('daily_production') daily_production!: number;
  @field('dairy_id') dairy_id!: string;
  @field('name') name!: string;
  @field('negociation') negociation!: string;
  @field('region') region!: string;
}

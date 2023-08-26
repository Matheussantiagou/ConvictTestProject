import {Model} from '@nozbe/watermelondb';
import {field} from '@nozbe/watermelondb/decorators';

export default class MilkPrice extends Model {
  static table = 'milk_prices';

  @field('month') month!: number;
  @field('value') value!: number;
  @field('year') year!: number;
}

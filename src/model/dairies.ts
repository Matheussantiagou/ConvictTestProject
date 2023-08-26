import {Model} from '@nozbe/watermelondb';
import {field} from '@nozbe/watermelondb/decorators';

export default class Dairy extends Model {
  static table = 'dairies';

  @field('name') name!: string;
}

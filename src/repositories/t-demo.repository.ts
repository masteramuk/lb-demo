import {DefaultCrudRepository} from '@loopback/repository';
import {TDemo, TDemoRelations} from '../models';
import {DemoDbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class TDemoRepository extends DefaultCrudRepository<
  TDemo,
  typeof TDemo.prototype.demoid,
  TDemoRelations
> {
  constructor(
    @inject('datasources.demo_db') dataSource: DemoDbDataSource,
  ) {
    super(TDemo, dataSource);
  }
}

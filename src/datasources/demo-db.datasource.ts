import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'demo_db',
  connector: 'mysql',
  host: 'localhost',
  port: 3306,
  user: 'demo_dbadmin',
  password: 'zaq12wsx!@',
  database: 'demo_db',
};

//url: 'mysql://demo_dbadmin:zaq12wsx!@@127.0.0.1/demo_db',

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class DemoDbDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'demo_db';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.demo_db', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}

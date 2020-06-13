import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    strict: true,
    mysql: {
      table: 't_demo', // lowercase
    },
  },
})
export class TDemo extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  demoid?: number;

  @property({
    type: 'string',
    required: true,
  })
  demotitle: string;

  @property({
    type: 'string',
  })
  demodesc?: string;

  @property({
    type: 'date',
  })
  createddate?: string;

  @property({
    type: 'date',
  })
  modifieddate?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<TDemo>) {
    super(data);
  }
}

export interface TDemoRelations {
  // describe navigational properties here
}

export type TDemoWithRelations = TDemo & TDemoRelations;

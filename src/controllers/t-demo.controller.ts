import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {TDemo} from '../models';
import {TDemoRepository} from '../repositories';

export class TDemoController {
  constructor(
    @repository(TDemoRepository)
    public tDemoRepository : TDemoRepository,
  ) {}

  @post('/tdemos', {
    responses: {
      '200': {
        description: 'TDemo model instance',
        content: {'application/json': {schema: getModelSchemaRef(TDemo)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TDemo, {
            title: 'NewTDemo',
            exclude: ['demoid'],
          }),
        },
      },
    })
    tDemo: Omit<TDemo, 'demoid'>,
  ): Promise<TDemo> {
    return this.tDemoRepository.create(tDemo);
  }

  @get('/tdemos/count', {
    responses: {
      '200': {
        description: 'TDemo model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(TDemo) where?: Where<TDemo>,
  ): Promise<Count> {
    return this.tDemoRepository.count(where);
  }

  @get('/tdemos', {
    responses: {
      '200': {
        description: 'Array of TDemo model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(TDemo, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(TDemo) filter?: Filter<TDemo>,
  ): Promise<TDemo[]> {
    return this.tDemoRepository.find(filter);
  }

  @patch('/tdemos', {
    responses: {
      '200': {
        description: 'TDemo PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TDemo, {partial: true}),
        },
      },
    })
    tDemo: TDemo,
    @param.where(TDemo) where?: Where<TDemo>,
  ): Promise<Count> {
    return this.tDemoRepository.updateAll(tDemo, where);
  }

  @get('/tdemos/{id}', {
    responses: {
      '200': {
        description: 'TDemo model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(TDemo, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(TDemo, {exclude: 'where'}) filter?: FilterExcludingWhere<TDemo>
  ): Promise<TDemo> {
    return this.tDemoRepository.findById(id, filter);
  }

  @patch('/tdemos/{id}', {
    responses: {
      '204': {
        description: 'TDemo PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TDemo, {partial: true}),
        },
      },
    })
    tDemo: TDemo,
  ): Promise<void> {
    await this.tDemoRepository.updateById(id, tDemo);
  }

  @put('/tdemos/{id}', {
    responses: {
      '204': {
        description: 'TDemo PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() tDemo: TDemo,
  ): Promise<void> {
    await this.tDemoRepository.replaceById(id, tDemo);
  }

  @del('/tdemos/{id}', {
    responses: {
      '204': {
        description: 'TDemo DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.tDemoRepository.deleteById(id);
  }
}

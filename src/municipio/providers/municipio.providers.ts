import { DataSource } from 'typeorm';
import { Municipio } from '../entities/municipio.entity';

export const municipioProviders = [
  {
    provide: 'MUNICIPIO_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Municipio),
    inject: ['DATA_SOURCE'],
  },
];

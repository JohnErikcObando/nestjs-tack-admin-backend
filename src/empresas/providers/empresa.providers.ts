import { DataSource } from 'typeorm';
import { Empresa } from '../entities/empresa.entity';

export const empresaProviders = [
  {
    provide: 'EMPRESA_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Empresa),
    inject: ['DATA_SOURCE'],
  },
];

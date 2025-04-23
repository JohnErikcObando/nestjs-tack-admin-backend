import { DataSource } from 'typeorm';
import { Empresas } from '../entities/empresas.entity';


export const empresaProviders = [
  {
    provide: 'EMPRESA_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Empresas),
    inject: ['DATA_SOURCE'],
  },
];

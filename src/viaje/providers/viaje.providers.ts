import { DataSource } from 'typeorm';
import { Viajes } from '../entities/viajes.entity';

export const viajeProviders = [
  {
    provide: 'VIAJE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Viajes),
    inject: ['DATA_SOURCE'],
  },
];

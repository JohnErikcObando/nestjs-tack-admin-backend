import { DataSource } from 'typeorm';
import { Viaje } from '../entities/viaje.entity';

export const viajeProviders = [
  {
    provide: 'VIAJE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Viaje),
    inject: ['DATA_SOURCE'],
  },
];

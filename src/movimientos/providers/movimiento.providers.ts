import { DataSource } from 'typeorm';
import { Movimiento } from '../entities/movimiento.entity';

export const movimientoProviders = [
  {
    provide: 'MOVIMIENTO_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(Movimiento),
    inject: ['DATA_SOURCE'],
  },
];

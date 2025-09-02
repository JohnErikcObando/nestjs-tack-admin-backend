import { Vehiculo } from '@src/vehiculo/entities/vehiculo.entity';
import { DataSource } from 'typeorm';

export const vehiculoProviders = [
  {
    provide: 'VECHICULO_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Vehiculo),
    inject: ['DATA_SOURCE'],
  },
];

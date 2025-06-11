import { DataSource } from 'typeorm';
import { TipoDocumento } from '../entities/tipo_documento.entity';

export const tipoDocumenotoProviders = [
  {
    provide: 'TIPO_DOCUMENTO_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(TipoDocumento),
    inject: ['DATA_SOURCE'],
  },
];

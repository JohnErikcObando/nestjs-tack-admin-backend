import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: process.env.POSTGRES_HOST,
        port: parseInt(process.env.POSTGRES_PORT || '5432'),
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        entities: [
          process.env.NODE_ENV === 'production'
            ? __dirname + '/dist/**/*.entity.js'
            : __dirname + '/../**/*.entity{.ts,.js}',
        ],
        synchronize: false,
        extra: {
          application_name: 'track_admin_backend',
          options: '-c timezone=America/Bogota', // Esta es la forma correcta
        },
      });

      return dataSource.initialize();
    },
  },
];

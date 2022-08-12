import { MikroOrmModuleSyncOptions } from '@mikro-orm/nestjs';

export default {
  entities: ['dist/**/*.entity{.ts,.js}'],
  entitiesTs: ['src/**/*.entity{.ts,.js}'],
  host: 'localhost',
  port: 5432,
  type: 'postgresql',
  dbName: 'boilerplate_dev',
  user: 'postgres',
  password: 'postgres',
  migrations: {
    path: './dist/migrations',
    pathTs: './src/migrations',
  },
} as MikroOrmModuleSyncOptions;

import { MikroOrmModuleSyncOptions } from '@mikro-orm/nestjs';

let ormConfig: MikroOrmModuleSyncOptions = {
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
};

const environments = {
  test: {
    entities: ['dist/**/*.entity{.ts,.js}'],
    entitiesTs: ['src/**/*.entity{.ts,.js}'],
    host: 'localhost',
    port: 5432,
    type: 'postgresql',
    dbName: 'boilerplate_test',
    user: 'postgres',
    password: 'postgres',
    migrations: {
      path: './dist/migrations',
      pathTs: './src/migrations',
    },
  },
  production: {
    entities: ['dist/**/*.entity{.ts,.js}'],
    entitiesTs: ['src/**/*.entity{.ts,.js}'],
    host: 'localhost',
    port: 5432,
    type: 'postgresql',
    dbName: 'boilerplate_test',
    user: 'postgres',
    password: 'postgres',
    migrations: {
      path: './dist/migrations',
      pathTs: './src/migrations',
    },
  },
};

if (process.env.NODE_ENV) {
  ormConfig = environments[process.env.NODE_ENV];
}

export default ormConfig;

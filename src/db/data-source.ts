import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';

config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  schema: process.env.DB_SCHEMA,
  synchronize: false,
  logging: true,
  entities: ['dist/modules/**/*.entity.js'],
  migrations: ['dist/migrations/*.js'],
  extra: {
    timezone: 'UTC',
  },
};

export const AppDataSource = new DataSource(dataSourceOptions);

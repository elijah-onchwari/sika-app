import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { getConfigFromEnv } from '../dtos';

/**
 * Get orm configuration details
 * @returns TypeOrmModuleOptions
 */
export const getOrmConfiguration = (): TypeOrmModuleOptions => {
  const configuration = getConfigFromEnv();

  return {
    type: 'postgres',
    host: configuration.postgresHost,
    port: configuration.postgresPort,
    username: configuration.postgresUsername,
    password: configuration.postgresPassword,
    database: configuration.postgresDatabaseName,
    entities: [],
    autoLoadEntities: true,
    logging: true,
    synchronize: true,
  };
};

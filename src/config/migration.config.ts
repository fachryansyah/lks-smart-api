import { registerAs } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { configService } from './config.service';

export default registerAs('typeorm', () => configService.getMigrationConfig());
export const connectionSource = new DataSource(
  configService.getMigrationConfig() as DataSourceOptions,
);

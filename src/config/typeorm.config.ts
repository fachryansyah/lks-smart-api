import { registerAs } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { configService } from './config.service';

export default registerAs('typeorm', () => configService.getTypeOrmConfig());
export const connectionSource = new DataSource(
  configService.getTypeOrmConfig() as DataSourceOptions,
);

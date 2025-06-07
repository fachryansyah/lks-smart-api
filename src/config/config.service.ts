import { JwtModuleOptions } from '@nestjs/jwt';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from 'dotenv';
config();

class ConfigService {
  constructor(
    private env: {
      [k: string]: string | undefined;
    },
  ) {}

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`Error! config error missing env.${key}`);
    }

    return value || '';
  }

  public ensureValues(keys: string[]) {
    keys.forEach((k) => this.getValue(k, true));
    return this;
  }

  public getPort() {
    return this.getValue('PORT', true);
  }

  public getServerSecret() {
    return this.getValue('SERVER_SECRET', true);
  }

  public isProduction() {
    const mode = this.getValue('MODE', false);
    return mode.toUpperCase() != 'DEV';
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.getValue('DATABASE_HOST'),
      port: parseInt(this.getValue('DATABASE_PORT')),
      username: this.getValue('DATABASE_USERNAME'),
      password: this.getValue('DATABASE_PASSWORD'),
      database: this.getValue('DATABASE_NAME'),
      entities: ['dist/**/entities/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      // migrationsTableName: 'migration',
      // migrations: ['src/migration/*.ts'],
      // ssl: this.isProduction(),
    };
  }

  public getMigrationConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.getValue('DATABASE_HOST'),
      port: parseInt(this.getValue('DATABASE_PORT')),
      username: this.getValue('DATABASE_USERNAME'),
      password: this.getValue('DATABASE_PASSWORD'),
      database: this.getValue('DATABASE_NAME'),
      entities: ['dist/**/entities/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      // migrationsTableName: 'migration',
      migrations: ['db/migrations/*{.ts,.js}'],
      ssl: false,
      schema: 'public',
      synchronize: false,
    };
  }

  public getJwtConfig(): JwtModuleOptions {
    return {
      global: true,
      secret: this.getValue('JWT_SECRET'),
      signOptions: {
        expiresIn: '24h',
      },
    };
  }
}

const configService = new ConfigService(process.env).ensureValues([
  'DATABASE_NAME',
  'DATABASE_HOST',
  'DATABASE_PORT',
  'DATABASE_USERNAME',
  'JWT_SECRET',
]);

export { configService };

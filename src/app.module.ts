import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UtilModule } from './util/util.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from './config/config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config/config.service';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    AuthModule,
    UtilModule,
    UserModule,
    ConfigModule,
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

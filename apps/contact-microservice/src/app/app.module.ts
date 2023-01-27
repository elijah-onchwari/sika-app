import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConfigFromEnv, getOrmConfiguration } from '@sika-app/shared';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContactModule } from './contact/contact.module';

@Module({
  imports: [
    ContactModule,
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: false, // get settings from OS(if true)
      load: [getConfigFromEnv],
      //   validationSchema,
    }),
    TypeOrmModule.forRoot(getOrmConfiguration()),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

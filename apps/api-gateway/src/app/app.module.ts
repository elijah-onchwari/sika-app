import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { getConfigFromEnv } from '@sika-app/shared';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: false, // get settings from OS(if true)
      load: [getConfigFromEnv],
      //   validationSchema,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

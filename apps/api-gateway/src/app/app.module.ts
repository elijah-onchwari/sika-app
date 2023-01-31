import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { getConfigFromEnv } from '@sika-app/shared';
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
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        ttl: config.get('throttleTtl'),
        limit: config.get('throttleLimit'),
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

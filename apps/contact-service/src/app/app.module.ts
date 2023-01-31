import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConfigFromEnv, getOrmConfiguration } from '@sika-app/shared';
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
  controllers: [],
  providers: [],
})
export class AppModule {}

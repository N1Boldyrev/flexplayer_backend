import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from './config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TitleModule } from './title/title.module';
import { StreamModule } from './stream/stream.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [config] }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: `mongodb://${configService.get<string>('DB_USERNAME')}:${configService.get<string>(
          'DB_PASSWORD'
        )}@${configService.get<string>('DB_HOST')}:${configService.get(<string>'DB_PORT')}/${configService.get(
          <string>'DB_NAME'
        )}`,
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UserModule,
    TitleModule,
    StreamModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

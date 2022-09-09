import { Module } from '@nestjs/common';
import { I18nModule } from 'nestjs-i18n';
import path from 'path';
import { ConfigModule } from '@nestjs/config';

import { ApiConfigService } from './shared/services/api.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    I18nModule.forRootAsync({
      useFactory: (configService: ApiConfigService) => ({
        fallbackLanguage: configService.fallbackLanguage,
        loaderOptions: {
          path: path.join(__dirname, '/i18n/'),
          watch: configService.isDevelopment,
        },
      }),
      inject: [ApiConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

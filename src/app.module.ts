import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { HistoriasModule } from './histories/histories.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (cs: ConfigService) => ({
        uri: cs.get<string>('MONGODB_URI'),
      }),
    }),
    HistoriasModule,
  ],
})
export class AppModule {}

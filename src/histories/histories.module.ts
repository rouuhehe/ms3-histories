import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HistoriesService } from './histories.service';
import { HistoriesController } from './histories.controller';
import { History, HistorySchema } from './schemas/history.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: History.name, schema: HistorySchema }]),
  ],
  controllers: [HistoriesController],
  providers: [HistoriesService],
})
export class HistoriesModule {}

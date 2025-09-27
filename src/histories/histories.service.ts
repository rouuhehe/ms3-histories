import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { History } from './schemas/history.schema';
import { Model } from 'mongoose';
import { CreateHistoryDto } from './dto/create-history.dto';

@Injectable()
export class HistoriesService {
  constructor(@InjectModel(History.name) private model: Model<History>) {}

  async timeline(petId: string, page = 1, limit = 20) {
    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      this.model
        .find({ pet_id: petId })
        .sort({ 'history.date': -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      this.model.countDocuments({ pet_id: petId }),
    ]);

    return { items, page, limit, total };
  }

  async addEvent(petId: string, payload: CreateHistoryDto) {
    return this.model.findOneAndUpdate(
      { pet_id: petId },
      {
        $push: {
          history: { date: new Date(payload.date), event: payload.event },
        },
        $setOnInsert: {
          images: payload.images ?? [],
          details: payload.details,
          user_id: payload.user_id,
          meta: payload.meta,
        },
      },
      { upsert: true, new: true },
    );
  }
}

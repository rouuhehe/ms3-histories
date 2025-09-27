import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ _id: true, timestamps: true })
export class History extends Document {
  @Prop({ required: true, index: true })
  pet_id: string;

  @Prop({
    type: [
      {
        date: { type: Date, required: true },
        event: { type: String, required: true },
      },
    ],
    default: [],
  })
  history: { date: Date; event: string }[];

  @Prop({ type: [String], default: [] })
  images: string[];

  @Prop() details?: string;

  @Prop() user_id?: string;

  @Prop({
    type: {
      weight: { type: Number },
      comments: { type: String },
    },
    default: {},
  })
  meta?: { weight?: number; comments?: string };
}
export const HistorySchema = SchemaFactory.createForClass(History);

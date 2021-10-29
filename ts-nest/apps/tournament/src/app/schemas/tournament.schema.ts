import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Participant, TournamentPhase } from '../api-model';
import * as mongoose from 'mongoose';

export type TournamentDocument = Tournament & Document;

@Schema()
export class Tournament {
  @Prop()
  id: mongoose.Types.ObjectId;

  @Prop()
  name: string;

  @Prop()
  phases: TournamentPhase[];

  @Prop()
  participants: Participant[];
}

export const TournamentSchema = SchemaFactory.createForClass(Tournament);
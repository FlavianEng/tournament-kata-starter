import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';
import { Participant, TournamentPhase } from '../api-model';

export type TournamentDocument = Tournament & Document;

@Schema()
export class Tournament {
  @Prop()
  id: ObjectId;

  @Prop()
  name: string;

  @Prop()
  phases: TournamentPhase[];

  @Prop()
  participants: Participant[];
}

export const TournamentSchema = SchemaFactory.createForClass(Tournament);

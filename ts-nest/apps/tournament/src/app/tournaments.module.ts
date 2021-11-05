import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ParticipantController } from './infra/api/participant.controller';
import { TournamentController } from './infra/api/tournament.controller';
import { TournamentStorage } from './infra/storage/tournament.storage';
import {
  Tournament,
  TournamentSchema,
} from './infra/storage/dao/tournament.dao';
import { TournamentService } from './domain/service/tournament.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Tournament.name, schema: TournamentSchema },
    ]),
  ],
  controllers: [TournamentController, ParticipantController],
  providers: [TournamentStorage, TournamentService],
})
export class TournamentsModule {}

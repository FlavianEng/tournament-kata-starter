import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ParticipantController } from './infra/api/participant.controller';
import { TournamentController } from './infra/api/tournament.controller';
import { TournamentRepositoryService } from './infra/storage/tournament.storage';
import {
  Tournament,
  TournamentSchema,
} from './infra/storage/dao/tournament.dao';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Tournament.name, schema: TournamentSchema },
    ]),
  ],
  controllers: [TournamentController, ParticipantController],
  providers: [TournamentRepositoryService],
})
export class TournamentsModule {}

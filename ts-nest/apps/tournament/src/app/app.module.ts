import { Module } from '@nestjs/common';
import { PingController } from './controllers/ping/ping.controller';
import { TournamentController } from './controllers/tournament/tournament.controller';
import { ParticipantController } from './controllers/tournament/participant.controller';
import { TournamentRepositoryService } from './repositories/tournament-repository.service';

@Module({
  imports: [],
  controllers: [PingController, TournamentController, ParticipantController],
  providers: [TournamentRepositoryService],
})
export class AppModule {}

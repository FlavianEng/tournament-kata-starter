import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TournamentController } from '../controllers/tournament/tournament.controller';
import { TournamentRepositoryService } from '../repositories/tournament-repository.service';
import { Tournament, TournamentSchema } from '../schemas/tournament.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Tournament.name, schema: TournamentSchema },
    ]),
  ],
  controllers: [TournamentController],
  providers: [TournamentRepositoryService],
})
export class TournamentsModule {}

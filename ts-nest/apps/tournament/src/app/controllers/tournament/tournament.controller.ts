import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Param,
  Get,
} from '@nestjs/common';
import { TournamentToAdd } from '../../api-model';
import { TournamentRepositoryService } from '../../repositories/tournament-repository.service';
import { Tournament } from '../../schemas/tournament.schema';
import * as mongoose from 'mongoose';

@Controller('tournaments')
export class TournamentController {
  constructor(private tournamentRepository: TournamentRepositoryService) {}

  @Post()
  public async createTournament(
    @Body() tournamentToAdd: TournamentToAdd
  ): Promise<{ id: mongoose.Types.ObjectId }> {
    if (tournamentToAdd.name.length < 1) {
      throw new HttpException('Name is missing', HttpStatus.BAD_REQUEST);
    }

    const tournament = {
      name: tournamentToAdd.name,
      phases: [],
      participants: [],
    };

    // FIXME Don't return _id
    const res = await this.tournamentRepository.createTournament(tournament);
    // console.log('🚀   res', res, res._id); // FIXME Connait pas puisque abs du schéma

    return { id: res.id };
  }

  @Get(':id')
  public getTournament(
    @Param('id') id: mongoose.Types.ObjectId
  ): Promise<Tournament> {
    const tournamentId = this.tournamentRepository.findOne(id);

    if (tournamentId) {
      return tournamentId;
    }

    throw new HttpException(
      "This tournament doesn't exist",
      HttpStatus.NOT_FOUND
    );
  }
}

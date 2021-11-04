import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Param,
  Get,
  Delete,
} from '@nestjs/common';
import { TournamentToAdd } from '../../domain/model/api-model';
import { TournamentStorage } from '../storage/tournament.storage';
import { Tournament } from '../storage/dao/tournament.dao';
import * as mongoose from 'mongoose';

@Controller('tournaments')
export class TournamentController {
  constructor(private tournamentStorage: TournamentStorage) {}

  @Post()
  public async createTournament(
    @Body() tournamentToAdd: TournamentToAdd
  ): Promise<{ id: string }> {
    if (tournamentToAdd.name.length < 1) {
      throw new HttpException('Name is missing', HttpStatus.BAD_REQUEST);
    }

    const tournament = {
      name: tournamentToAdd.name,
      phases: [],
      participants: [],
    };

    const res = await this.tournamentStorage.createTournament(tournament);

    return { id: res.id };
  }

  @Get(':id')
  public async getTournament(@Param('id') id: string): Promise<Tournament> {
    const tournamentId = await this.tournamentStorage.findOne(
      new mongoose.Types.ObjectId(id)
    );

    if (tournamentId) {
      return tournamentId;
    }

    throw new HttpException(
      "This tournament doesn't exist",
      HttpStatus.NOT_FOUND
    );
  }

  @Delete()
  public async removeAllTournaments(): Promise<void> {
    const { deletedCount } = await this.tournamentStorage.deleteAll();
    console.info(deletedCount, 'élément.s supprimé.s');
  }
}

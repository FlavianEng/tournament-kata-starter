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
import { TournamentService } from '../../domain/service/tournament.service';
import * as mongoose from 'mongoose';

@Controller('tournaments')
export class TournamentController {
  constructor(
    private tournamentStorage: TournamentStorage,
    private tournamentService: TournamentService
  ) {}

  @Post()
  public async createTournament(
    @Body() tournamentToAdd: TournamentToAdd
  ): Promise<{ id: string }> {
    if (tournamentToAdd.name.length < 1) {
      throw new HttpException('Name is missing', HttpStatus.BAD_REQUEST);
    }

    const { id } = await this.tournamentService.createTournament(
      tournamentToAdd
    );

    return { id };
  }

  @Get(':id')
  public async getTournament(@Param('id') id: string): Promise<Tournament> {
    const tournamentId = await this.tournamentStorage.findById(
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

  @Get(':name')
  public async getTournamentByName(
    @Param('name') name: string
  ): Promise<Tournament> {
    const tournament = await this.tournamentStorage.findByName(name);

    if (tournament) {
      return tournament;
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

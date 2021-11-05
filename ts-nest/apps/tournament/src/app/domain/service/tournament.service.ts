import { HttpException, HttpStatus } from '@nestjs/common';
import { TournamentStorage } from '../../infra/storage/tournament.storage';
import { TournamentToAdd } from '../model/api-model';

export class TournamentService {
  constructor(private tournamentStorage: TournamentStorage) {}

  async createTournament(
    tournamentToAdd: TournamentToAdd
  ): Promise<{ id: string }> {
    await this.checkNoTournamentWithSameNameExist(tournamentToAdd.name);

    const tournament = await this.tournamentStorage.createTournament({
      name: tournamentToAdd.name,
      phases: [],
      participants: [],
    });
    return { id: tournament.id };
  }

  isTournamentNameUnique(
    newName: string,
    existingTournamentName: string
  ): void {
    if (newName === existingTournamentName) {
      throw new HttpException(
        'This tournament name already exist !',
        HttpStatus.BAD_REQUEST
      );
    }
  }

  hasTournamentName(name: string): void {
    if (name.length < 1) {
      throw new HttpException('Name is missing', HttpStatus.BAD_REQUEST);
    }
  }

  async checkNoTournamentWithSameNameExist(name: string) {
    const tournament = await this.tournamentStorage.findByName(name);
    console.log('🚀   tournament', tournament);

    if (tournament) {
      throw new HttpException(
        'Tournament already exists',
        HttpStatus.BAD_REQUEST
      );
    }
  }
}

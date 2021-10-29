import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Tournament, TournamentDocument } from '../schemas/tournament.schema';
import { CreateTournamentDto } from '../api-model';
import { ObjectId } from 'mongoose';

// import { Tournament, Participant } from '../api-model';

@Injectable()
export class TournamentRepositoryService {
  constructor(
    @InjectModel(Tournament.name)
    private tournamentModel: Model<TournamentDocument>
  ) {}

  async createTournament(
    createTournamentDto: CreateTournamentDto
  ): Promise<Tournament> {
    const createdTournament = new this.tournamentModel(createTournamentDto);
    console.log('🚀   createdTournament', createdTournament);
    return createdTournament.save();
  }

  async findAll(): Promise<Tournament[]> {
    return this.tournamentModel.find().exec();
  }

  async findOne(tournamentId: ObjectId): Promise<Tournament> {
    return this.tournamentModel.findById(tournamentId).exec();
  }

  // public saveTournament(tournament: Tournament): void {
  //   this.tournaments.set(tournament.id, tournament);
  // }

  // public getTournament(tournamentId: string): Tournament {
  //   return this.tournaments.get(tournamentId);
  // }
}

// @Injectable()
// export class ParticipantRepositoryService {
//   private participants = new Map<string, Participant>();

//   public saveParticipant(participant: Participant): void {
//     this.participants.set(participant.id, participant);
//   }

//   public getParticipant(participantId: string): Participant {
//     return this.participants.get(participantId);
//   }
// }

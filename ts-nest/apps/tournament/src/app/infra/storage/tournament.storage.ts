import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Tournament, TournamentDocument } from '../storage/dao/tournament.dao';
import { CreateTournamentDto } from '../../domain/model/api-model';
import * as mongoose from 'mongoose';
import { DeleteResult } from 'mongodb';

@Injectable()
export class TournamentStorage {
  constructor(
    @InjectModel(Tournament.name)
    private tournamentModel: Model<TournamentDocument>
  ) {}

  async createTournament(
    createTournamentDto: CreateTournamentDto
  ): Promise<Tournament> {
    const createdTournament = new this.tournamentModel(createTournamentDto);
    createdTournament.id = createdTournament._id;

    return createdTournament.save();
  }

  async findAll(): Promise<Tournament[]> {
    return this.tournamentModel.find().exec();
  }

  async findById(tournamentId: mongoose.Types.ObjectId): Promise<Tournament> {
    return this.tournamentModel.findById(tournamentId).exec();
  }

  async findByName(tournamentName: string): Promise<Tournament> {
    return this.tournamentModel.findOne({ name: tournamentName }).exec();
  }

  async deleteAll(): Promise<DeleteResult> {
    return this.tournamentModel.deleteMany({});
  }
}

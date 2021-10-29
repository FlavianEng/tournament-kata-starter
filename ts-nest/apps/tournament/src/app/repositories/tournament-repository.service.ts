import { Injectable } from '@nestjs/common';
import { Tournament, Participant } from '../api-model';

@Injectable()
export class TournamentRepositoryService {
  private tournaments = new Map<string, Tournament>();

  public saveTournament(tournament: Tournament): void {
    this.tournaments.set(tournament.id, tournament);
  }

  public getTournament(tournamentId: string): Tournament {
    return this.tournaments.get(tournamentId);
  }
}

@Injectable()
export class ParticipantRepositoryService {
  private participants = new Map<string, Participant>();

  public saveParticipant(participant: Participant): void {
    this.participants.set(participant.id, participant);
  }

  public getParticipant(participantId: string): Participant {
    return this.participants.get(participantId);
  }
}

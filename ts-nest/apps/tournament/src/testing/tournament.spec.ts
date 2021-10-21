import { TournamentToAdd } from '../app/api-model';
import { INestApplication } from '@nestjs/common';
import { startApp } from './test.utils';
import * as request from 'supertest';
import { v4 as uuidv4 } from 'uuid';

const exampleTournament = {
  name: 'Unreal',
} as TournamentToAdd;

let unrealTournamentId = null;

describe('/tournament endpoint', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await startApp();
  });

  describe('[POST] when creating a tournament', () => {
    it('should return the correct id', async () => {
      const { body } = await request(app.getHttpServer())
        .post('/api/tournaments')
        .send(exampleTournament)
        .expect(201);

      expect(body.id).not.toBeUndefined();
    });

    it('should have stored the tournament', async () => {
      const { body } = await request(app.getHttpServer())
        .post('/api/tournaments')
        .send(exampleTournament)
        .expect(201);

      const get = await request(app.getHttpServer())
        .get(`/api/tournaments/${body.id}`)
        .expect(200);

      expect(get.body.name).toEqual(exampleTournament.name);

      unrealTournamentId = get.body.id;
    });

    it('should fail because tournament name is missing', async () => {
      const emptyTournament = {
        name: '',
      } as TournamentToAdd;

      const { body } = await request(app.getHttpServer())
        .post('/api/tournaments')
        .send(emptyTournament)
        .expect(400);

      expect(body.message).toEqual('Name is missing');
    });
  });

  describe('[GET] when getting a tournament', () => {
    it('should fail because tournament id is missing', async () => {
      const randomId = uuidv4();

      const { body } = await request(app.getHttpServer())
        .get(`/api/tournaments/${randomId}`)
        .expect(404);

      expect(body.message).toEqual("This tournament doesn't exist");
    });

    it('should get a tournament', async () => {
      const { body } = await request(app.getHttpServer())
        .get(`/api/tournaments/${unrealTournamentId}`)
        .expect(200);

      expect(body.name).toEqual('Unreal');
    });
  });
});

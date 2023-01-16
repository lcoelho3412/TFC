import Team from '../database/models/Team';

export default class TeamsService {
  static async getAll() {
    return Team.findAll();
  }
}

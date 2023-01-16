import Team from '../database/models/Team';

export default class TeamsService {
  static async getAll() {
    return Team.findAll();
  }

  static async getTeamById(id: number) {
    return Team.findOne({ where: { id } });
  }
}

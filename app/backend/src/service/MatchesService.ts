import Matches from '../database/models/Matches';
import Team from '../database/models/Team';

export default class MatchesService {
  static async getAllMatches() {
    return Matches.findAll({ include: [
      { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
      { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
    ] });
  }

  static async getMatchesInProgress(param: string) {
    const inProgress = JSON.parse(param);
    return Matches.findAll({ where: { inProgress },
      include: [
        { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
      ] });
  }
}

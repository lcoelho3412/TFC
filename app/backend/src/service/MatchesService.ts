import Matches from '../database/models/Matches';
import Team from '../database/models/Team';

export default class MatchesService {
  static async getAllMatches() {
    return Matches.findAll({ include: [
      { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
      { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
    ] });
  }
}

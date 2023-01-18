import IMatch from '../interfaces/IMatch';
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

  static async findTeamByPk(homeTeam: string, awayTeam: string) {
    const homeTeamFinder = await Team.findByPk(homeTeam);
    const awayTeamFinder = await Team.findByPk(awayTeam);
    if (!homeTeamFinder || !awayTeamFinder) {
      return ({ status: 404, message: 'There is no team with such id!' });
    } return ({ status: null, message: null });
  }

  static async matchCreator(match: IMatch) {
    const newMatch = await Matches.create({ ...match, inProgress: true });
    return newMatch;
  }

  static async editMatch(id: number) {
    await Matches.update({ inProgress: false }, { where: { id } });
    return { message: 'Finished' };
  }

  static async updateMatch(id: number, homeTeamGoals: number, awayTeamGoals: number) {
    await Matches.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
    return { message: 'Updated' };
  }
}

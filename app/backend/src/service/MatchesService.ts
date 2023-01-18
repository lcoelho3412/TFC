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
    console.log('file: MatchesService.ts:15 ~ MatchesService ~ getMatchesInProgress', inProgress);
    return Matches.findAll({ where: { inProgress },
      include: [
        { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
      ] });
  }

  static async matchCreator(match: IMatch) {
    const newMatch = await Matches.create({ ...match, inProgress: true });
    return newMatch;
  }

  static async editMatch(id: number) {
    await Matches.update({ inProgress: false }, { where: { id } });
    return { message: 'Finished' };
  }
}

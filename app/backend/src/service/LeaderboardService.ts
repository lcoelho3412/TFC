import LeaderboardTeam from '../utils/LeaderboardTeam';
import Team from '../database/models/Team';
import ILeaderboard from '../interfaces/ILeaderboard';

export default class LeaderboardService {
  static orderLeaderboard(teams: ILeaderboard[]) {
    return teams.sort((a: ILeaderboard, b: ILeaderboard) => this.compareTeams(a, b));
  }

  static compareTeams(a: ILeaderboard, b: ILeaderboard) {
    if (a.totalPoints !== b.totalPoints) {
      return a.totalPoints > b.totalPoints ? -1 : 1;
    }
    if (a.totalVictories !== b.totalVictories) {
      return a.totalVictories > b.totalVictories ? -1 : 1;
    }
    if (a.goalsBalance !== b.goalsBalance) {
      return a.goalsBalance > b.goalsBalance ? -1 : 1;
    }
    if (a.goalsFavor !== b.goalsFavor) {
      return a.goalsFavor > b.goalsFavor ? -1 : 1;
    }
    if (a.goalsOwn !== b.goalsOwn) {
      return a.goalsOwn > b.goalsOwn ? -1 : 1;
    }
    return 0;
  }

  static async getTeamIds() {
    return Team.findAll({ attributes: { exclude: ['teamName'] } });
  }

  static async getLeaderboardTeam(id: number, homeOrAway: string) {
    const leaderboardTeam = new LeaderboardTeam(id);
    return leaderboardTeam.getLeaderboardTeam(homeOrAway);
  }

  static async getLeaderboard(homeOrAway: string) {
    const teamsIds = await this.getTeamIds();
    const allTeams: ILeaderboard[] = await Promise
      .all(teamsIds
        .map(({ id }) => this.getLeaderboardTeam(id, homeOrAway)));
    const leaderboard = this.orderLeaderboard(allTeams);
    return leaderboard;
  }
}

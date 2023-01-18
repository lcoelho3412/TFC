import { Request, Response } from 'express';
import MatchesService from '../service/MatchesService';

export default class MatchesController {
  static async getAllMatches(req: Request, res: Response) {
    const { inProgress } = req.query;

    let matches;
    if (inProgress) {
      matches = await MatchesService.getMatchesInProgress(String(inProgress));
    } else {
      matches = await MatchesService.getAllMatches();
    }
    res.status(200).json(matches);
  }

  static async createMatch(req: Request, res: Response) {
    const { homeTeam, awayTeam } = req.body;
    const teamExists = await MatchesService.findTeamByPk(homeTeam, awayTeam);
    if (teamExists.status === 404) {
      return res.status(404).json({ message: teamExists.message });
    }
    const match = await MatchesService.matchCreator(req.body);
    res.status(201).json(match);
  }

  static async editMatch(req: Request, res: Response) {
    const { id } = req.params;
    const message = await MatchesService.editMatch(Number(id));
    res.status(200).json(message);
  }

  static async updateMatch(req: Request, res: Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const { message } = await MatchesService.updateMatch(Number(id), homeTeamGoals, awayTeamGoals);
    res.status(200).json({ message });
  }
}

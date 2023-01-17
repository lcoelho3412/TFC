import { Request, Response } from 'express';
import MatchesService from '../service/MatchesService';

export default class MatchesController {
  static async getAllMatches(req: Request, res: Response) {
    const { inProgress } = req.query;

    let matches;
    if (inProgress) {
      matches = await MatchesService.getAllMatches();
    } else {
      matches = await MatchesService.getMatchesInProgress(String(inProgress));
    }
    res.status(200).json(matches);
  }
}

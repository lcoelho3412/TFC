import { Request, Response } from 'express';
import MatchesService from '../service/MatchesService';

export default class MatchesController {
  static async getAllMatches(_req: Request, res: Response) {
    const matches = await MatchesService.getAllMatches();
    res.status(200).json(matches);
  }
}

import { Request, Response } from 'express';

export const getUser = async (req: Request, res: Response) => {
  res.json({ message: 'User Root - Welcome!' });
};

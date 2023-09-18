import UserModel from '../models/UserModel';
import * as express from 'express';
import { NextFunction } from 'connect';

class MembershipController {

  public addUserMembership = (req: express.Request, res: express.Response, next: NextFunction) => {
    const { email, membership } = req.body;
    UserModel.findOneAndUpdate({ email: email }, { membership: membership })
      .then(user => {
        res.status(200).json({ code: 200, membership: membership, message: 'Su membresía ha sido actualizada con éxito.' })
      })
      .catch((error: Error) => next(error));
  }
}

export default new MembershipController();
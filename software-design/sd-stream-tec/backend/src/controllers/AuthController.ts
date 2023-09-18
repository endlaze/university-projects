import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import UserModel, { IUserModel } from '../models/UserModel';

class AuthController {
  public login(req: express.Request, res: express.Response, next: express.NextFunction): void {
    const { email, password } = req.body;
    UserModel.findOne({ email: email })
      .then((user: IUserModel) => {

        if (user) {
          if (user.comparePassword(password)) {

            let retUser = {
              name: user.name,
              email: user.email,
              phone: user.phone,
              birthdate: user.birthdate,
              membership: user.membership,
              videos: user.videos,
              albums: user.albums,
              videoPlaylists: user.videoPlaylists,
              musicPlaylists: user.musicPlaylists
            }
            res.status(200).json({ code: 200, message: "Usuario autenticado", token: jwt.sign(JSON.stringify(user), 'streamTEC'), user: retUser });

          } else {

            res.status(401).json({
              reason: 'Incorrect password'
            });
          }
        } else {
          res.status(404).json({
            reason: 'User not found'
          });
        }
      })
      .catch((error: Error) => next(error));
  }

  public authRequired(req: express.Request, res: express.Response, next: express.NextFunction): void {
    if (req['user']) {
      next();
    } else {
      let error: Error = new Error('unauthorized!');
      error['code'] = 401;
      next(error);
    }
  }
}

export default new AuthController();
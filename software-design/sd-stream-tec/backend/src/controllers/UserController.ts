import UserModel, { IUserModel } from '../models/UserModel'
import * as express from 'express'
import { NextFunction } from 'connect';

class UserController {

  public createUser = (req: express.Request, res: express.Response, next: NextFunction) => {
    const { name, email, membership, phone, birthdate, password } = req.body;
    UserModel
      .create({
        name: name,
        email: email,
        phone: phone,
        membership: membership,
        birthdate: birthdate,
        password: password,
      })
      .then((user: IUserModel) => res.status(200).json({ code: 200, message: 'El usuario ha sido creado con exito' }))
      .catch((error: Error) => next(error));
  }

  public getUsers = (req: express.Request, res: express.Response, next: NextFunction) => {
    UserModel
      .find({}, `_id name email phone password`)
      .then(users => res.status(200).json(users))
      .catch((error: Error) => next(error))
  }

  public getUserById = (req: express.Request, res: express.Response, next: NextFunction) => {
    const idToFind: string = req.params.id;

    UserModel
      .findById(idToFind)
      .then(user => res.status(200).json(user))
      .catch((error: Error) => next(error))
  }

  public updateUser = (req: express.Request, res: express.Response, next: NextFunction) => {
    const { _id, username, name, isAdmin, email, password } = req.body;

    UserModel
      .findById(_id, (err, user) => {
        if (err) {
          return false;
        }
        user.username = username;
        user.name = name;
        user.isAdmin = isAdmin;
        user.email = email;
        user.password = ((password != '') && password);
        user.save();
      })
      .then((user: IUserModel) => {
        res.status(200).json(user);
      })
      .catch((error: Error) => next(error))
  }

  public deleteUser = (req: express.Request, res: express.Response, next: NextFunction) => {
    const { _id } = req.body;
    UserModel
      .findByIdAndRemove(_id)
      .then((user: IUserModel) => res.status(200).json(user))
      .catch((error: Error) => next(error))
  }
}

export default new UserController();
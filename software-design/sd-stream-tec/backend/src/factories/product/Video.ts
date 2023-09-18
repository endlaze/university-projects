import UserModel, { IUserModel } from '../../models/UserModel';
import { IProduct } from '../../interfaces/IProduct'

export default class Video implements IProduct {


  public fetchAllPlaylists = (email) => new Promise<any>((resolve, reject) => {

    UserModel.findOne({ email: email })
      .then((user) => {
        resolve(user.videoPlaylists);
      })
      .catch((error: Error) => console.log(error));
  });

  public createProduct = (email, video) => new Promise<any>((resolve, reject) => {

    UserModel.findOneAndUpdate({ email: email }, { $push: { videos: video } })
      .then((user) => {
        resolve({ idVideo: video.idVideo });
      })
      .catch((error: Error) => console.log(error));
  });


  public createPlaylist = (email, playlist) => new Promise<any>((resolve, reject) => {
    UserModel.findOneAndUpdate({ email: email }, { $push: { videoPlaylists: { name: playlist.name, videos: playlist.videos } } }, { new: true })
      .then((user) => {
        let insertedPlaylist = user.videoPlaylists[user.videoPlaylists.length - 1]
        resolve(insertedPlaylist);
      })
      .catch((error: Error) => console.log(error));
  });

  public addProductToPlaylist = (email, playlist) => new Promise<any>((resolve, reject) => {
    UserModel.findOneAndUpdate(
      { "email": email, "videoPlaylists._id": playlist.playlistId },
      { $push: { "videoPlaylists.$.videos": { idVideo: playlist.product.id } } }
    )
      .then((user) => {
        resolve(user);
      })
      .catch((error: Error) => console.log(error));
  });


}

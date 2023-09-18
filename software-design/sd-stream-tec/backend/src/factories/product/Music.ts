import UserModel, { IUserModel } from '../../models/UserModel';
import { IProduct } from '../../interfaces/IProduct'

export default class Music implements IProduct {

  public createProduct = (email, product) => new Promise<any>((resolve, reject) => {

    UserModel.findOne({ email: email })
      .then((user) => {
        user.albums = addTrackToAlbum(product.idAlbum, product.track, user.albums);
        user.save();
        resolve({ track: product.track, updatedAlbums: user.albums });
      })
      .catch((error: Error) => console.log(error));
  });

  public fetchAllPlaylists = (email) => new Promise<any>((resolve, reject) => {

    UserModel.findOne({ email: email })
      .then((user) => {
        resolve(user.musicPlaylists);
      })
      .catch((error: Error) => console.log(error));
  });

  public createPlaylist = (email, playlist) => new Promise<any>((resolve, reject) => {
    UserModel.findOneAndUpdate({ email: email }, { $push: { musicPlaylists: { name: playlist.name, tracks: playlist.tracks } } }, { new: true })
      .then((user) => {
        let insertedPlaylist = user.musicPlaylists[user.musicPlaylists.length - 1]
        resolve(insertedPlaylist);
      })
      .catch((error: Error) => console.log(error));
  });

  public addProductToPlaylist = (email, playlist) => new Promise<any>((resolve, reject) => {
    console.log(playlist)
    UserModel.findOneAndUpdate(
      { "email": email, "musicPlaylists._id": playlist.playlistId },
      { $push: { "musicPlaylists.$.tracks": { idAlbum: playlist.product.idAlbum, number: playlist.product.number } } }
    )
      .then((user) => {
        resolve(user);
      })
      .catch((error: Error) => console.log(error));
  });









}

const addTrackToAlbum = (idAlbum, track, albums) => {

  if (!albumExists(idAlbum, albums)) {
    albums.push({ idAlbum: idAlbum, tracks: [track] })
    return albums
  }

  for (let index = 0; index < albums.length; index++) {
    if (albums[index].idAlbum === idAlbum) {
      albums[index].tracks.push(track)
      return albums
    }
  }

}

const albumExists = (idAlbum, ownedAlbums) => {
  let ownedAlbum = ownedAlbums.find((album) => {
    return (album.idAlbum === idAlbum)
  })

  return (ownedAlbum !== undefined);
}


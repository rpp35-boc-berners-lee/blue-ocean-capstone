const models = require('../models/index.ts');

type UserData = {
  userName: string;
  email: string;
  hashedPassword: string;
  followingList: number[];
  watchedVideos: number[];
  recommendedVideos: number[];
  ownedServices: string[];
};

//!==============================================//
//!================ USER TABLE ==================//
//!==============================================//

const addUser = (userData: UserData) => {
  const newUser = new models.UserTable({
    userName: userData.userName,
    email: userData.email,
    hashedPassword: userData.hashedPassword,
    followingList:  userData.followingList || [],
    watchedVideos: userData.watchedVideos || [],
    recommendedVideos: userData.recommendedVideos || [],
    ownedServices: userData.ownedServices || [],
  })
  return newUser.save()
    .then(() => {
      console.log('success posting new user');
    })
    .catch((error: any) => {
      console.log('Error posting new user', error);
    });
};

const findUser = (userName: any) => {
  return models.UserTable.find({'userName': userName})
    .then((results: any) => {
      return results;
    })
    .catch((error: any) => {
      console.log('Error finding user', error);
    });
};

//TODO: add userID to following list
//TODO: remove userID from following list

//TODO: add videoID to watched list
//TODO: remove videoID from watched list

//TODO: add videoID to recommended list
//TODO: remove videoID from recommended list

//TODO: add service to owned list
//TODO: remove service from owned list
// update user document w/ options
const updateUser = () => {};

//? delete existing user

//!==============================================//
//!================ VIDEO TABLE =================//
//!==============================================//
//TODO: add new video
const addVideo = () => {};

//? remove existing video??

//!==============================================//
//!=============== RATINGS TABLE ================//
//!==============================================//
//TODO: create rating
const addRating = () => {};

//? delete rating
//? update rating
//? update comment

export default {
  addUser,
  findUser,
  updateUser,
  addVideo,
  addRating
}
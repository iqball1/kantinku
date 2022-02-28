import FIREBASE from '../config/FIREBASE';
import {
  storeData,
  dispatchError,
  dispatchLoading,
  dispatchSuccess,
} from '../utils';

export const UPDATE_PROFILE = 'UPDATE_PROFILE';
export const CHANGE_PASSWORD = 'CHANGE_PASSWORD';

export const updateProfile = data => {
  return dispatch => {
    // LOADING
    dispatchLoading(dispatch, UPDATE_PROFILE);

    const dataBaru = {
      uid: data.uid,
      nama: data.nama,
      email: data.email,
      nohp: data.nohp,
      kelas: data.kelas,
      alamat: data.alamat,
      user: 'user',
      avatar: data.updateAvatar ? data.avatarForDB : data.avatarLama,
    };
    FIREBASE.database()
      .ref('users/' + dataBaru.uid)
      .update(dataBaru)
      .then(response => {
        // SUKSESS
        dispatchSuccess(dispatch, UPDATE_PROFILE, response ? response : []);

        // localStorage (async storage)
        storeData('user', dataBaru);
      })
      .catch(error => {
        // ERROR
        dispatchError(dispatch, UPDATE_PROFILE, error.message);

        alert(error.message);
      });
  };
};
export const changePassword = data => {
  return dispatch => {
    dispatchLoading(dispatch, CHANGE_PASSWORD);

    FIREBASE.auth()
      .signInWithEmailAndPassword(data.email, data.password)
      .then(response => {

        //jika sukses maka update password
        var user = FIREBASE.auth().currentUser;

        user
          .updatePassword(data.newPassword)
          .then(function () {
              
            // UPDATE SUKSES.
            dispatchSuccess(dispatch, CHANGE_PASSWORD, 'Sukses Ganti Password');
          })
          .catch(function (error) {

            // ERROR
            dispatchError(dispatch, CHANGE_PASSWORD, error);

            alert(error.message);
          });
      })
      .catch(error => {
          
        // ERROR
        dispatchError(dispatch, CHANGE_PASSWORD, error.message);

        alert(error.message);
      });
  };
};

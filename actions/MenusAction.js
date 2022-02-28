import FIREBASE from '../config/FIREBASE';
import kategori from '../reducers/kategori';
import {dispatchError, dispatchLoading, dispatchSuccess} from '../utils';

export const GET_MENUS = 'GET_MENUS';
export const GET_MENUS_BY_KATEGORI = 'GET_MENUS_BY_KATEGORI';
export const DELETE_PARAMETER_MENUS = 'DELETE_PARAMETER_MENUS';
export const SAVE_KEYWORD_MENU = 'SAVE_KEYWORD_MENU';
export const CHECK_MENUS = 'CHECK_MENUS';

export const getMenus = (idKategori, keyword) => {
  return dispatch => {
    if (idKategori) {
      FIREBASE.database()
        .ref('menus')
        .orderByChild('kategori')
        .equalTo(idKategori)
        .once('value', querySnapshot => {
          // HASIL
          let data = querySnapshot.val();

          dispatchSuccess(dispatch, GET_MENUS, data);
        })
        .catch(error => {
          dispatchError(dispatch, GET_MENUS, error);
          alert(error);
        });
    } else if (keyword) {
      FIREBASE.database()
        .ref('menus')
        .orderByChild('jenis')
        .equalTo(keyword.toUpperCase())
        .once('value', querySnapshot => {
          //Hasil
          let data = querySnapshot.val();

          dispatchSuccess(dispatch, GET_MENUS, data);
        })
        .catch(error => {
          dispatchError(dispatch, GET_MENUS, error);
          alert(error);
        });
    }
    FIREBASE.database()
      .ref('menus')
      .once('value', querySnapshot => {
        // HASIL
        let data = querySnapshot.val();

        dispatchSuccess(dispatch, GET_MENUS, data);
      })
      .catch(error => {
        dispatchError(dispatch, GET_MENUS, error);
        alert(error);
      });
  };
};
export const limitMenus = () => {
  return dispatch => {
    dispatchLoading(dispatch, GET_MENUS);
    FIREBASE.database()
      .ref('menus')
      .limitToFirst(6)
      .once('value', querySnapshot => {
        //Hasil
        let data = querySnapshot.val();

        dispatchSuccess(dispatch, GET_MENUS, data);
      })
      .catch(error => {
        dispatchError(dispatch, GET_MENUS, error);
        alert(error);
      });
  };
};
export const getMenusByKategori = (id, namaKategori) => ({
  type: GET_MENUS_BY_KATEGORI,
  payload: {
    idKategori: id,
    namaKategori: namaKategori,
  },
});
export const deleteParameterMenus = () => ({
  type: DELETE_PARAMETER_MENUS,
});

export const saveKeywordMenu = search => ({
  type: SAVE_KEYWORD_MENU,
  payload: {
    data: search,
  },
});



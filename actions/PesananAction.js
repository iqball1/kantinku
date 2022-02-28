import {
  storeData,
  dispatchError,
  dispatchLoading,
  dispatchSuccess,
} from '../utils';
import FIREBASE from '../config/FIREBASE';

export const UPDATE_PESANAN = 'UPDATE_PESANAN';

export const updatePesanan = data => {
  return dispatch => {
    dispatchLoading(dispatch, UPDATE_PESANAN, data);

    const uid = data.order_id;

    FIREBASE.database()                 
      .ref('keranjangs/' + uid)
      .once('value', querySnapshot => {
        if (querySnapshot.val()) {
          const data = querySnapshot.val();

          const dataBaru = {...data};
          dataBaru.order_id = data.order_id;
          dataBaru.statusPesanan = 'Menunggu konfirmasi';
          
          //hapus data keranjang
          FIREBASE.database()
            .ref('keranjangs/' + uid)
            .remove()
            .then(() => {
              FIREBASE.database()
                .ref('pemesanan')
                .child(data.order_id)
                .set(dataBaru)
                .then(response => {
                  dispatchSuccess(
                    dispatch,
                    UPDATE_PESANAN,
                    response ? response : [],
                  );
                })
                .catch(error => {
                  dispatchError(dispatch, GET_MENUS, error);
                  alert(error);
                });
            })
            .catch(error => {
              dispatchError(dispatch, GET_MENUS, error);
              alert(error);
            });
        }
      })
      .catch(error => {
        dispatchError(dispatch, GET_MENUS, error);
        alert(error);
      });
  };
};

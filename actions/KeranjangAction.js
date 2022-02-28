import FIREBASE from '../config/FIREBASE';
import {dispatchError, dispatchLoading, dispatchSuccess} from '../utils';

export const MASUK_KERANJANG = 'MASUK_KERANJANG';
export const GET_LIST_KERANJANG = 'GET_LIST_KERANJANG';
export const DELETE_KERANJANG = 'DELETE_KERANJANG';

export const masukKeranjang = data => {
  return dispatch => {
    dispatchLoading(dispatch, MASUK_KERANJANG);

    // Konfirmasi data user
    FIREBASE.database()
      .ref('keranjangs/' + data.uid)
      .once('value', querySnapShot => {
        if (querySnapShot.val()) {
          //update Keranjang utama
          const keranjangUtama = querySnapShot.val();
          const hargaBaru = parseInt(data.jumlah) * parseInt(data.Menu.harga);

          FIREBASE.database()
            .ref('keranjangs')
            .child(data.uid)
            .update({
              totalHarga: keranjangUtama.totalHarga + hargaBaru,
            })
            .then(response => {
              //Simpan ke keranjang detail
              dispatch(masukKeranjangDetail(data));
            })
            .catch(error => {
              dispatchError(dispatch, MASUK_KERANJANG, error);
              alert(error);
            });
        } else {
          //simpan keranjang utama
          const keranjangUtama = {
            user: data.uid,
            tanggal: new Date().toDateString(),
            totalHarga: parseInt(data.jumlah) * parseInt(data.Menu.harga),
          };

          FIREBASE.database()
            .ref('keranjangs')
            .child(data.uid)
            .set(keranjangUtama)
            .then(response => {
              console.log('Simpan Keranjang :', response);
              //Simpan ke keranjang detail
              dispatch(masukKeranjangDetail(data));
            })
            .catch(error => {
              dispatchError(dispatch, MASUK_KERANJANG, error);
              alert(error);
            });
        }
      })
      .catch(error => {
        dispatchError(dispatch, MASUK_KERANJANG, error);
        alert(error);
      });
  };
};
export const masukKeranjangDetail = data => {
  return dispatch => {
    const pesanans = {
      product: data.Menu,
      jumlahPesan: data.jumlah,
      totalHarga: parseInt(data.jumlah) * parseInt(data.Menu.harga),
      catatan: data.catatan,
    };
    FIREBASE.database()
      .ref('keranjangs/' + data.uid)
      .child('pesanans')
      .push(pesanans)
      .then(response => {
        dispatchSuccess(dispatch, MASUK_KERANJANG, response ? response : []);
      })
      .catch(error => {
        dispatchError(dispatch, MASUK_KERANJANG, error);
        alert(error);
      });
  };
};
export const getListKeranjang = id => {
  return dispatch => {
    // LOADING
    dispatchLoading(dispatch, GET_LIST_KERANJANG);

    FIREBASE.database()
      .ref('keranjangs/' + id)
      .once('value', querySnapshot => {
        // HASIL
        let data = querySnapshot.val();

        dispatchSuccess(dispatch, GET_LIST_KERANJANG, data);
      })
      .catch(error => {
        dispatchError(dispatch, GET_LIST_KERANJANG, error);
        alert(error);
      });
  };
};

export const deleteKeranjang = (id, keranjangUtama, keranjang) => {
  return dispatch => {
    dispatchLoading(dispatch, DELETE_KERANJANG);

    const totalHargaBaru = keranjangUtama.totalHarga - keranjang.totalHarga;

    if (totalHargaBaru === 0) {
      // Hapus Keranjang Utama & detail
      FIREBASE.database()
        .ref('keranjangs')
        .child(keranjangUtama.user)
        .remove()
        .then(response => {
          dispatchSuccess(
            dispatch,
            DELETE_KERANJANG,
            'Keranjang Telah Dihapus',
          );
        })
        .catch(error => {
          dispatchError(dispatch, DELETE_KERANJANG, error);
          alert(error);
        });
    } else {
      // Update total harga keranjang utama
      FIREBASE.database()
        .ref('keranjangs')
        .child(keranjangUtama.user)
        .update({
          totalHarga: totalHargaBaru,
        })
        .then(response => {
          // Hapus pesanan/keranjang detail
          dispatch(deleteKeranjangDetail(id, keranjangUtama));
        })
        .catch(error => {
          dispatchError(dispatch, DELETE_KERANJANG, error);
          alert(error);
        });
    }
  };
};

export const deleteKeranjangDetail = (id, keranjangUtama) => {
  return dispatch => {
    FIREBASE.database()
      .ref('keranjangs/' + keranjangUtama.user)
      .child('pesanans')
      .child(id)
      .remove()
      .then(response => {
        dispatchSuccess(dispatch, DELETE_KERANJANG, 'Keranjang Telah Dihapus');
      })
      .catch(error => {
        dispatchError(dispatch, DELETE_KERANJANG, error);
        alert(error);
      });
  };
};

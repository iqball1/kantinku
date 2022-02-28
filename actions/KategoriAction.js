import FIREBASE from '../config/FIREBASE';
import { dispatchError, dispatchLoading, dispatchSuccess } from "../utils"

export const GET_KATEGORI = 'GET_KATEGORI';

export const getKategori = () => {
    return (dispatch) => {

        // LOADING
        dispatchLoading(dispatch, GET_KATEGORI);

        FIREBASE.database()
            .ref('kategori')
            .once('value', (querySnapshot) => {

                // HASIL
                let data = querySnapshot.val(); 
                
                dispatchSuccess(dispatch, GET_KATEGORI, data)
            })
            .catch((error) => {
                dispatchError(dispatch, GET_KATEGORI, error)
                alert(error)
            })
    }
}
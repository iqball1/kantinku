import { GET_KATEGORI } from '../../actions/KategoriAction'

const initialState = {
    getKategoriLoading: false,
    getKategoriResult: false,
    getKategoriError: false,

};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_KATEGORI:
            return {
                ...state,
                getKategoriLoading: action.payload.loading,
                getKategoriResult: action.payload.data,
                getKategoriError: action.payload.errorMessage,
            };
        default:
            return state;
    }
}

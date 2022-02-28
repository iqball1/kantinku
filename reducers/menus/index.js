import { GET_MENUS, GET_MENUS_BY_KATEGORI, DELETE_PARAMETER_MENUS, SAVE_KEYWORD_MENU } from '../../actions/MenusAction'

const initialState = {
    getMenusLoading: false,
    getMenusResult: false,
    getMenusError: false,

    idKategori: false,
    namaKategori: false,

    keyword: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_MENUS:
            return {
                ...state,
                getMenusLoading: action.payload.loading,
                getMenusResult: action.payload.data,
                getMenusError: action.payload.errorMessage,
            };
        case GET_MENUS_BY_KATEGORI:
            return {
                ...state,
                idKategori: action.payload.idKategori,
                namaKategori: action.payload.namaKategori,
            };
        case DELETE_PARAMETER_MENUS:
            return {
                ...state,
                idKategori: false,
                namaKategori: false,
                keyword: false
            };
        case SAVE_KEYWORD_MENU:
            return {
                ...state,
                keyword: action.payload.data,
            }
        default:
            return state;
    }
}

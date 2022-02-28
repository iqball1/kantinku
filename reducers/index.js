import { combineReducers } from "redux"
import UserReducer from './user'
import AuthReducer from './auth'
import ProfileReducer from './profile'
import KategoriReducer from './kategori'
import MenusReducer from "./menus";
import KeranjangReducer from './keranjang'
import PesananReducer from './Pesanan'

const rootReducer = combineReducers({
    UserReducer,
    AuthReducer,
    ProfileReducer,
    KategoriReducer,
    MenusReducer,
    KeranjangReducer,
    PesananReducer
});

export default rootReducer
import { GET_USER } from "../../actions/UserAction";

const initialState = {
    dataUSer: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_USER:
            return {
                ...state,
                dataUSer: action.payload
            }
        default:
            return state
    }
}
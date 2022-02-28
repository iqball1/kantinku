export const GET_USER = "GET_USER";

export const getUser = () => {
    return (dispatch) => {
        dispatch({
            type: GET_USER,
            payload: {
                nama: 'Restoe',
                email: 'pamungkas25@gmail.com'
            }
        })
    }
}

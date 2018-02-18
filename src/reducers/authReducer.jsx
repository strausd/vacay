export const authReducer = (state = {}, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                jwt: action.jwt,
                user: action.user
            };
        case 'LOGOUT':
            return {
                ...state,
                jwt: null,
                user: null
            }
        default:
            return state;
    }
};

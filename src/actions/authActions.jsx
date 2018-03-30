import axios from 'axios';


export const login = ({ jwt, user }) => {
    localStorage.setItem('jwt', jwt);
    localStorage.setItem('user', JSON.stringify(user));
    return {
        type: 'LOGIN',
        jwt,
        user
    };
};

export const logout = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('user');
    return {
        type: 'LOGOUT'
    };
};

export const loadLocalJWT = () => {
    const jwt = localStorage.getItem('jwt');
    const user = JSON.parse(localStorage.getItem('user'));
    if (jwt) {
        return login({ jwt, user });
    } else {
        return logout();
    }
};

export const verifyLocalJWT = () => {
    const jwt = localStorage.getItem('jwt');
    if (jwt !== null) {
        return dispatch => {
            axios({
                method: 'get',
                url: process.env.URL + 'api/auth/verify',
                headers: { Authorization: jwt }
            }).then(response => {
                if (response.data.hasOwnProperty('error')) {
                    dispatch(logout());
                    console.log(response.data.error);
                } else {
                    dispatch(login({
                        jwt,
                        user: response.data.user
                    }));
                }
            }).catch((e, res) => {
                dispatch(logout());
                console.log(e.response.status);
                console.log(e.response.data.error.message);
            });
        };
    } else {
        return logout();
    }
};
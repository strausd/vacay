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

export const logout = ({ jwt, user }) => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('user');
    return {
        type: 'LOGOUT'
    };
};
import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';

import { login } from '../../actions/authActions'


export class LoginPage extends React.Component {

    handleLoginSubmit = (e) => {
        e.preventDefault();
        const userData = {
            email: this.refs.email.value,
            password: this.refs.password.value
        };
        axios({
            method: 'post',
            url: process.env.URL + 'api/auth/login',
            data: userData
        }).then(response => {
            if (response.data.hasOwnProperty('error')) {
                console.log(response.data.error);
            } else {
                this.props.login({
                    jwt: response.data.token,
                    user: response.data.user
                });
            }
        }).catch((e, res) => {
            console.log(e.response.status);
            console.log(e.response.data.error.message);
        });
    }

    render() {
        return (
            <div className="container page-content">
                <h1><i className="icon ion-home"></i>Login</h1>
                <form onSubmit={this.handleLoginSubmit}>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" ref="email" placeholder="email" required />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" ref="password" placeholder="password" minLength="6" required />
                    </div>
                    <div>
                        <input type="submit" value="Login" />
                    </div>
                </form>
                <Link to="/forgotpassword">
                    Forgot Password?
                </Link>
            </div>
        );
    }
};

const mapDispatchToProps = dispatch => {
    return {
        login: data => dispatch(login(data))
    };
};

export default connect(null, mapDispatchToProps)(LoginPage);
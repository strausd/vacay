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
                <div className="center-form">
                    <h1><i className="icon ion-home"></i>Login</h1>
                    <form onSubmit={this.handleLoginSubmit}>
                        <div className="input-group">
                            <input type="email" id="email" name="email" ref="email" placeholder="Email" required />
                        </div>
                        <div className="input-group">
                            <input type="password" id="password" name="password" ref="password" placeholder="Password" minLength="6" required />
                        </div>
                        <div>
                            <input className="btn block" type="submit" value="Login" />
                        </div>
                    </form>
                    <Link to="/forgotpassword">
                        Forgot Password?
                    </Link>
                </div>
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
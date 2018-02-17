import React from 'react';
import axios from 'axios';


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
                console.log(response.data);
            }
        }).catch((e, res) => {
            console.log(e.response.status);
            console.log(e.response.data.error.message);
        });
    }

    render() {
        return (
            <div>
                <h1>Login</h1>
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
            </div>
        );
    }
};

export default LoginPage;
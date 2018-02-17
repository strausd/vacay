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
            url: process.env.URL + 'login',
            data: userData
        }).then(response => {
            if (response.data.hasOwnProperty('error')) {
                console.log(response.data.error);
            } else {
                console.log(response.data);
            }
        }).catch(e => {
            this.displayErrorMessage(this.refs.error_container, 'The server encountered an error. Please refresh the page and try again.');
        });
    }

    handleLogout = () => {
        axios({
            method: 'post',
            url: process.env.URL + 'logout',
        }).then(response => {
            if (response.data.hasOwnProperty('error')) {
                console.log(response.data.error);
            } else {
                console.log(response.data);
            }
        }).catch(e => {
            this.displayErrorMessage(this.refs.error_container, 'The server encountered an error. Please refresh the page and try again.');
        });;
    };

    handleCheckId = () => {
        axios.get(process.env.URL + 'checkid');
    };

    render() {
        return (
            <div>
                <h1>Login</h1>
                <form onSubmit={this.handleLoginSubmit}>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" ref="email" placeholder="email" />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" ref="password" placeholder="password" minLength="6" />
                    </div>
                    <div>
                        <input type="submit" value="Login" />
                    </div>
                </form>
                <button onClick={this.handleLogout}>Logout</button>
                <button onClick={this.handleCheckId}>Check ID</button>
            </div>
        );
    }
};

export default LoginPage;
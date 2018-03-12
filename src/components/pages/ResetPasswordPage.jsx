import React from 'react';
import axios from 'axios';


export class ResetPasswordPage extends React.Component {

    constructor(props) {
        super(props);
        console.log('IN RESET');
    }

    handleForgotSubmit = (e) => {
        e.preventDefault();
        // If passwords dont match, return an error
        if (this.refs.password.value !== this.refs.password_confirm.value) {
            return console.log('Passwords do not match.');
        }
        const data = {
            email: this.refs.email.value,
            password: this.refs.password.value,
            token: this.props.match.params.uuid
        };
        axios({
            method: 'post',
            url: process.env.URL + 'api/auth/resetpassword',
            data
        }).then(response => {
            if (response.data.hasOwnProperty('error')) {
                console.log(response.data.error);
            } else {
                console.log(response);
            }
        }).catch((e, res) => {
            console.log(e.response.status);
            console.log(e.response.data.error.message);
        });
    };

    render() {
        return (
            <div className="container page-content">
                <h1>Forgot Password</h1>
                <form onSubmit={this.handleForgotSubmit}>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" ref="email" placeholder="email" required />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" ref="password" placeholder="password" minLength="6" required />
                    </div>
                    <div>
                        <label htmlFor="password_confirm">Confirm Password</label>
                        <input type="password" id="password_confirm" name="password_confirm" ref="password_confirm" placeholder="confirm password" minLength="6" required />
                    </div>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}

export default ResetPasswordPage;
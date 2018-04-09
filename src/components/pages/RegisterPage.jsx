import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';


export class RegisterPage extends React.Component {

    handleSignupSubmit = (e) => {
        e.preventDefault();
        // If passwords dont match, return an error
        if (this.refs.password.value !== this.refs.password_confirm.value) {
            return console.log('Passwords do not match.');
        }
        const userData = {
            first_name: this.refs.first_name.value,
            last_name: this.refs.last_name.value,
            email: this.refs.email.value,
            password: this.refs.password.value
        };
        axios({
            method: 'post',
            url: process.env.URL + 'api/auth/register',
            data: userData
        }).then(response => {
            if (response.data.hasOwnProperty('error')) {
                console.log(response.data.error);
            } else {
                console.log(response.data);
            }
        }).catch((e, res) => {
            console.log(e.response.status);
            const errors = e.response.data.errors;
            for (let field in errors) {
                if (errors.hasOwnProperty(field)) {
                    console.log(errors[field].path, errors[field].message);
                }
            }
        });
    }

    render = () => {
        return (
            <div className="container page-content">
                <div className="center-form">
                    <h1>Register</h1>
                    <form onSubmit={this.handleSignupSubmit}>
                        <p className="hidden" ref="error_container"></p>
                        <div className="input-group">
                            <input type="text" id="first_name" name="first_name" ref="first_name" placeholder="First Name" required />
                        </div>
                        <div className="input-group">
                            <input type="text" id="last_name" name="last_name" ref="last_name" placeholder="Last Name" required />
                        </div>

                        <div className="input-group">
                            <input type="email" id="email" name="email" ref="email" placeholder="Email" required />
                        </div>
                        <div className="input-group">
                            <input type="password" id="password" name="password" ref="password" placeholder="Password" minLength="6" required />
                        </div>
                        <div className="input-group">
                            <input type="password" id="password_confirm" name="password_confirm" ref="password_confirm" placeholder="Confirm Password" minLength="6" required />
                        </div>
                        <div>
                            <input className="btn block" type="submit" value="Signup" />
                        </div>
                    </form>
                </div>
            </div>
        );
    }
};

export default RegisterPage;
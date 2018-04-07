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
                <h1>Signup</h1>
                <form onSubmit={this.handleSignupSubmit}>
                    <p className="hidden" ref="error_container"></p>
                    <div>
                        <label htmlFor="first_name">First Name</label>
                        <input type="text" id="first_name" name="first_name" ref="first_name" placeholder="John" required />
                    </div>
                    <div>
                        <label htmlFor="last_name">Last Name</label>
                        <input type="text" id="last_name" name="last_name" ref="last_name" placeholder="Doe" required />
                    </div>

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
                    <div>
                        <input type="submit" value="Signup" />
                    </div>
                </form>
            </div>
        );
    }
};

export default RegisterPage;
import React from 'react';
import axios from 'axios';


export class ForgotPasswordPage extends React.Component {

    handleForgotSubmit = (e) => {
        e.preventDefault();
        const data = {
            email: this.refs.email.value,
        };
        axios({
            method: 'post',
            url: process.env.URL + 'api/auth/forgotpassword',
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
    }

    render() {
        return (
            <div>
                <h1>Forgot Password</h1>
                <form onSubmit={this.handleForgotSubmit}>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" ref="email" placeholder="email" required />
                    </div>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}

export default ForgotPasswordPage;
import React from 'react';
import axios from 'axios';


export class LoginPage extends React.Component {

    handleLoginSubmit = (e) => {
        e.preventDefault();
        const loginData = {
            email: this.refs.email.value,
            password: this.refs.password.value
        };
        axios.post(`${process.env.URL}getusers`, {}).then((response) => {
            console.log(response.data);
        }).catch(e => console.log(e));
    }

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
            </div>
        );
    }
};

export default LoginPage;
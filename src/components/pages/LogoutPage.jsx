import React from 'react';
import axios from 'axios';


export class LoginPage extends React.Component {

    handleLogout = () => {
        console.log('Logout');
    };

    render() {
        return (
            <div>
                <h1>Logout</h1>
                <button onClick={this.handleLogout}>Logout</button>
            </div>
        );
    }
};

export default LoginPage;
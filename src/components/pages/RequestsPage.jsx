import React from 'react';
import { connect } from 'react-redux';


class RequestsPage extends React.Component {
    render() {
        return (
            <div className="container page-content">
                <h1>Requests</h1>
                <p>Here you will see your requests and have the ability to submit a new one</p>
            </div>
        );
    }
}

export default RequestsPage;
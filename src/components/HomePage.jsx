import React from 'react';
import { connect } from 'react-redux'


export class HomePage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1>Vacay</h1>
            </div>
        );
    }
};

export default HomePage;
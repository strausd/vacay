import React from 'react';
import { connect } from 'react-redux'

import CounterController from './CounterController';


export class HomePage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1>Home Page</h1>
                <p>counter: {this.props.counter}</p>
                <CounterController />
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        counter: state
    };
};

export default connect(mapStateToProps)(HomePage);
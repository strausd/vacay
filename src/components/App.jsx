import React from 'react';

import AppRouter from '../routers/AppRouter';


class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <AppRouter />
            </div>
        );
    }
}

export default App;
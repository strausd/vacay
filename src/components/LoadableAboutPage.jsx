import React from 'react';
import Loadable from 'react-loadable';


const LoadableAboutPageWrapper = Loadable({
    loader: () => import('./AboutPage'),
    loading(){
        return <p>Loading...</p>
    }
});

export default class LoadableAboutPage extends React.Component {
    render() {
        return <LoadableAboutPageWrapper />;
    }
}
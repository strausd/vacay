import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { counter } from '../reducers/baseReducer';

export default () => {
    const store = createStore(
        counter,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
        applyMiddleware(thunk)
    );
    return store;   
}
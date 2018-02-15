import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import 'foundation-sites';
import './libs/stupidTables/stupidtable.min';
import configureStore from './store/configureStore.jsx';
import { loginUserInitial } from './actions/actionCreators.jsx';
import getRoutes from './routes/index.jsx';


$(document).foundation();
$(window).resize(() => {
    try {
        $('#offCanvasLeft').foundation('close');
    } catch (e) {
        console.log('error closing canvasLeft');
    }
    try {
        $('#offCanvasRight').foundation('close');
    } catch (e) {
        console.log('error closing canvasRight');
    }
});

const store = configureStore();

const token = localStorage.getItem('token');
if (token !== null) {
    store.dispatch(loginUserInitial(token));
}

ReactDOM.render(
    <Provider
        store = { store }
        key = "provider" >
        <Router
            history = { browserHistory } >
            { getRoutes(store) }
        </Router>
    </Provider>,
    document.getElementById('app')
);
